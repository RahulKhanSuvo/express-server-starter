import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { AuthGard } from "../../middleware/authGard";
import { Role } from "../../../generated/prisma/enums";

const routes = Router();
routes.get("/", doctorController.getAllDoctors);
routes.get(
  "/:id",
  AuthGard(Role.ADMIN, Role.DOCTOR, Role.PATIENT),
  doctorController.getDoctorById,
);
export const DoctorRoutes = routes;
