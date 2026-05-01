import createHttpError from "http-errors";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import status from "http-status";

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
    throw createHttpError(status.INTERNAL_SERVER_ERROR, "fail to crate user");
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
    const result = {
      ...data.user,
      patient,
    };
    return result;
  } catch (error) {
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
    throw new Error("Failed to create patient account", { cause: error });
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
  if (!data.user) throw new Error("Failed to login user");
  if (data.user.isDeleted) throw new Error("User is deleted");
  if (data.user.status === "BLOCKED") throw new Error("User is Blocked");

  return data;
};

export const AuthService = {
  registerPatient,
  loginUser,
};
