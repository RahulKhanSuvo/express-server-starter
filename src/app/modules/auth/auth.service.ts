import { auth } from "../../lib/auth";

const registerPatient = async (payload: {
  name: string;
  email: string;
  password: string;
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

  return data;
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
