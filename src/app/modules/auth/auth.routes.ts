import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/sign-in");
router.post("/register", AuthController.registerPatient);
router.post("/refresh-token");

export const authRoutes = router;
