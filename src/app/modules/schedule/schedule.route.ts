import { Router } from "express";
import { ScheduleController } from "./schedule.controller";
import { AuthGard } from "../../middleware/authGard";
import { Role } from "../../../generated/prisma/enums";
import { ScheduleInterface } from "./schedule.interface";
import { validateRequest } from "../../middleware/validateRequest";

const routes = Router();
routes.post(
  "/",
  AuthGard(Role.ADMIN, Role.DOCTOR, Role.PATIENT),
  validateRequest(ScheduleInterface.createScheduleSchema),
  ScheduleController.getAllSchedule,
);
export const ScheduleRoutes = routes;
