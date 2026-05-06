import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthGard } from "../../middleware/authGard";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { authSchema } from "./auth.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(authSchema.authSignUpSchema),
  AuthController.registerPatient,
);
router.post(
  "/login",
  validateRequest(authSchema.loginSchema),
  AuthController.loginUser,
);
router.get(
  "/me",
  AuthGard(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR, Role.PATIENT),
  AuthController.getMe,
);
router.post("/refresh-token", AuthController.newToken);
router.post(
  "/change-password",
  AuthGard(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR, Role.PATIENT),
  validateRequest(authSchema.changePasswordSchema),
  AuthController.changePassword,
);
router.post(
  "/logout",
  AuthGard(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR, Role.PATIENT),
  AuthController.logoutUser,
);
router.post(
  "/verify-email",
  validateRequest(authSchema.verifyEmailSchema),
  AuthController.verifyEmail,
);
router.post(
  "/forget-password",
  validateRequest(authSchema.forgetPasswordSchema),
  AuthController.forgetPassword,
);
router.post(
  "/reset-password",
  validateRequest(authSchema.resetPasswordSchema),
  AuthController.resetPassword,
);
export const authRoutes = router;
