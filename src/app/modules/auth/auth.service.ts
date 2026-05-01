import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

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
  if (!data.user) throw new Error("Failed to create patient account");
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
