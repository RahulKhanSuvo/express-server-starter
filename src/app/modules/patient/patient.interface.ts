import { z } from "zod";
import { PatientValidation } from "./patient.validation";

export type IUpdatePatientInfoPayload = z.infer<
  typeof PatientValidation.updatePatient
>;
