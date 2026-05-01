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

export const AuthService = {
  registerPatient,
};
