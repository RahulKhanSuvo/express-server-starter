import { Router } from "express";
import { doctorController } from "./doctor.controller";

const routes = Router();
routes.get("/", doctorController.getAllDoctors);
routes.get("/:id", doctorController.getDoctorById);
export const DoctorRoutes = routes;
