import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { SpecialtyRoutes } from "../modules/specialty/specialty.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/specialty", SpecialtyRoutes);

export const AppRoutes = router;
