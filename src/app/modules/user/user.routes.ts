import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { CreateDoctorSchema } from "./userInterface";

const router = Router();

router.post(
  "/create-doctor",
  validateRequest(CreateDoctorSchema),
  UserController.createDoctor,
);

export const UserRoutes = router;
