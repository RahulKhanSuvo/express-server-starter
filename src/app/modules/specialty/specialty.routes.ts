import express from "express";
import { SpecialtyController } from "./specialty.controller";

const router = express.Router();

router.post("/", SpecialtyController.createSpecialty);
router.get("/", SpecialtyController);
router.get("/", SpecialtyController);

export const SpecialtyRoutes = router;
