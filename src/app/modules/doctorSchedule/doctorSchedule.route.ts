import { DoctorScheduleInterface } from "./doctorSchedule.validation";
import { Router } from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { AuthGard } from "../../middleware/authGard";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.post(
  "/create-my-doctor-schedule",
  AuthGard(Role.DOCTOR),
  validateRequest(DoctorScheduleInterface.createMyDoctorScheduleSchema),
  DoctorScheduleController.createMyDoctorSchedule,
);

router.patch(
  "/update-my-doctor-schedule",
  AuthGard(Role.DOCTOR),
  validateRequest(DoctorScheduleInterface.updateDoctorScheduleSchema),
  DoctorScheduleController.updateMyDoctorSchedule,
);

router.delete(
  "/delete-my-doctor-schedule/:id",
  AuthGard(Role.DOCTOR),
  validateRequest(DoctorScheduleInterface.deleteMyDoctorScheduleSchema),
  DoctorScheduleController.deleteMyDoctorSchedule,
);

router.get(
  "/get-my-doctor-schedules",
  AuthGard(Role.DOCTOR),
  // validateRequest(DoctorScheduleInterface.getMyDoctorSchedulesSchema),
  DoctorScheduleController.getMyDoctorSchedules,
);

export const DoctorScheduleRoutes = router;
