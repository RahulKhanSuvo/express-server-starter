import express from "express";
import { SpecialtyController } from "./specialty.controller";
import { AuthGard } from "../../middleware/authGard";
import { Role } from "../../../generated/prisma/enums";

const router = express.Router();

router.post("/", AuthGard(Role.ADMIN), SpecialtyController.createSpecialty);
router.get("/", AuthGard(Role.ADMIN), SpecialtyController.getAllSpecialty);

export const SpecialtyRoutes = router;
