import { Router } from "express";
import { ScheduleController } from "./schedule.controller";
import { AuthGard } from "../../middleware/authGard";
import { Role } from "../../../generated/prisma/enums";

const routes = Router();
routes.post(
  "/",
  AuthGard(Role.ADMIN, Role.DOCTOR, Role.PATIENT),
  ScheduleController.getAllSchedule,
);
export const ScheduleRoutes = routes;
