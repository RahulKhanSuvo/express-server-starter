import createHttpError from "http-errors";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import status from "http-status";
import AppError from "../../errorsHelpers/AppError";
import { TokenUtils } from "../../utils/token";
import { JwtUtils } from "../../utils/jwt";
import envConfig from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";
import ms, { StringValue } from "ms";
import { IChangePassword, ILogin } from "./auth.interface";

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

const loginUser = async (payload: ILogin) => {
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
  const isSessionValid = await prisma.session.findUnique({
    where: {
      token: sessionToken,
      expiresAt: {
        gt: new Date(),
      },
    },
    include: { user: true },
  });
  if (!isSessionValid)
    throw new AppError(status.UNAUTHORIZED, "Invalid Session");
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
  const newRefreshToken = TokenUtils.getRefreshToken({
    id: data.id,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
  });
  const { token } = await prisma.session.update({
    where: {
      token: sessionToken,
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(
        Date.now() + ms(envConfig.BATTER_AUTH_SESSION_EXPIRE_IN as StringValue),
      ),
      updatedAt: new Date(),
    },
  });
  const result = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token,
  };
  return result;
};
const changePassword = async (
  payload: IChangePassword,
  sessionToken: string,
) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });
  if (!session) {
    throw new AppError(status.UNAUTHORIZED, "Invalid Session");
  }

  const result = await auth.api.changePassword({
    body: {
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
      revokeOtherSessions: true,
    },
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });

  const accessToken = TokenUtils.getAccessToken({
    id: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
  });

  const refreshToken = TokenUtils.getRefreshToken({
    id: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
  });
  if (!result) {
    throw new AppError(status.BAD_REQUEST, "Failed to change password");
  }

  return {
    accessToken,
    refreshToken,
    sessionToken: result.token,
  };
};
const logoutUser = async (sessionToken: string) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`,
    }),
  });
  if (!result) {
    throw new AppError(status.BAD_REQUEST, "Failed to logout user");
  }
  return result;
};
const verifyEmail = async (payload: { email: string; otp: string }) => {
  const { email, otp } = payload;
  const result = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp,
    },
  });
  if (!result) {
    throw new AppError(status.BAD_REQUEST, "Failed to verify email");
  }
  if (result.status && !result.user?.emailVerified) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: true,
      },
    });
  }
  return result;
};
export const AuthService = {
  registerPatient,
  loginUser,
  getMe,
  newToken,
  changePassword,
  logoutUser,
  verifyEmail,
};
