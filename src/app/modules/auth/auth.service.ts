import createHttpError from "http-errors";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import status from "http-status";
import AppError from "../../errorsHelpers/AppError";
import { TokenUtils } from "../../utils/token";
import { JwtUtils } from "../../utils/jwt";
import envConfig from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";

const registerPatient = async (payload: {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });
  if (!data.user)
    throw new AppError(status.INTERNAL_SERVER_ERROR, "fail to crate user");
  try {
    const patient = await prisma.$transaction(async (tx) => {
      const createdPatient = await tx.patient.create({
        data: {
          userId: data.user.id,
          name,
          email,
        },
      });
      return createdPatient;
    });
    const accessToken = TokenUtils.getAccessToken({
      id: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
    });

    const refreshToken = TokenUtils.getRefreshToken({
      id: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
    });

    const result = {
      ...data.user,
      ...patient,
      accessToken,
      refreshToken,
      token: data.token,
    };
    return result;
  } catch (error) {
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
    throw createHttpError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to create patient account",
      { cause: error },
    );
  }
};

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
  if (!data.user)
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to login user");
  if (data.user.isDeleted)
    throw new AppError(status.INTERNAL_SERVER_ERROR, "User is deleted");
  if (data.user.status === "BLOCKED")
    throw new AppError(status.INTERNAL_SERVER_ERROR, "User is Blocked");

  const accessToken = TokenUtils.getAccessToken({
    id: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
  });

  const refreshToken = TokenUtils.getRefreshToken({
    id: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
  });

  const result = {
    ...data,
    accessToken,
    refreshToken,
  };
  return result;
};
const getMe = async (payload: { userId: string }) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
    include: {
      patient: true,
      doctors: true,
    },
  });
  if (!isUserExist) throw new AppError(status.UNAUTHORIZED, "User not found");
  const result = {
    ...isUserExist,
  };
  return result;
};
const newToken = async (refreshToken: string, sessionToken: string) => {
  const verifyToken = JwtUtils.verifyToken(
    refreshToken,
    envConfig.REFRESH_TOKEN_SECRET,
  );
  if (!verifyToken.success && verifyToken.error)
    throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
  const data = verifyToken.data as JwtPayload;
  const newAccessToken = TokenUtils.getAccessToken({
    id: data.id,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
  });
  const isSessionExist = await prisma.session.findUnique({
    where: {
      id: sessionToken,
      userId: data.id,
    },
  });
  if (!isSessionExist)
    throw new AppError(status.UNAUTHORIZED, "Session not found");
  const newRefreshToken = TokenUtils.getRefreshToken({
    id: data.id,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
  });
  const result = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken,
  };
  return result;
};
export const AuthService = {
  registerPatient,
  loginUser,
  getMe,
  newToken,
};
