import { z } from "zod";
import { PatientValidation } from "./patient.validation";
export type IUpdatePatientInfoPayload = z.infer<
  typeof PatientValidation.updatePatient
>;
export type IUpdatePatientDataPayload = z.infer<
  typeof PatientValidation.updatePatientData
>;
export type IPatientMedicalReportPayload = z.infer<
  typeof PatientValidation.patientMedicalReport
>;
