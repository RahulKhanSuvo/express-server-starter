import express from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.routes";

const router = express.Router();

router.use("/specialty", SpecialtyRoutes);

export const AppRoutes = router;
