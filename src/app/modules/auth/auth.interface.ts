import z from "zod";

const loginSchema = z.object({
  email: z.email("invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["ADMIN", "SUPER_ADMIN", "DOCTOR", "PATIENT"]).optional(),
});

const authSignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["ADMIN", "SUPER_ADMIN", "DOCTOR", "PATIENT"]).optional(),
});
const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});
const verifyEmailSchema = z.object({
  email: z.email("Invalid Email"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});
const forgetPasswordSchema = z.object({
  email: z.email("Invalid Email"),
});
const resetPasswordSchema = z.object({
  email: z.email("Invalid Email"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});
export const authSchema = {
  loginSchema,
  authSignUpSchema,
  changePasswordSchema,
  verifyEmailSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
};
export type ILogin = z.infer<typeof loginSchema>;
export type IAuthSignUp = z.infer<typeof authSignUpSchema>;
export type IChangePassword = z.infer<typeof changePasswordSchema>;
