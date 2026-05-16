import express from "express";
import { SpecialtyController } from "./specialty.controller";
import { AuthGard } from "../../middleware/authGard";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../../config/multer.config";
import { SpecialtySchema } from "./specialty.schema";
import { validateRequest } from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/",
  multerUpload.single("file"),
  validateRequest(SpecialtySchema.createSpecialtySchema),
  SpecialtyController.createSpecialty,
);
router.get(
  "/",
  AuthGard(Role.ADMIN, Role.PATIENT),
  SpecialtyController.getAllSpecialty,
);

export const SpecialtyRoutes = router;
