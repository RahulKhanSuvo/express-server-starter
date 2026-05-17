import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { SpecialtyRoutes } from "../modules/specialty/specialty.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { DoctorRoutes } from "../modules/doctor/doctor.routes";
import { ScheduleRoutes } from "../modules/schedule/schedule.route";
import { DoctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/specialty", SpecialtyRoutes);
router.use("/user", UserRoutes);
router.use("/doctors", DoctorRoutes);
router.use("/schedule", ScheduleRoutes);
router.use("/doctor-schedule", DoctorScheduleRoutes);

export const AppRoutes = router;
