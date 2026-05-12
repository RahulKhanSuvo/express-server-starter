import express from "express";
import { SpecialtyController } from "./specialty.controller";
import { AuthGard } from "../../middleware/authGard";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../../config/multer.config";

const router = express.Router();

router.post(
  "/",
  AuthGard(Role.ADMIN),
  multerUpload.single("file"),
  SpecialtyController.createSpecialty,
);
router.get("/", AuthGard(Role.ADMIN), SpecialtyController.getAllSpecialty);

export const SpecialtyRoutes = router;
