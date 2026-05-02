import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { SpecialtyRoutes } from "../modules/specialty/specialty.routes";
import { UserRoutes } from "../modules/user/user.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/specialty", SpecialtyRoutes);
router.use("/users", UserRoutes);

export const AppRoutes = router;
