import { z } from "zod";

const updatePatient = z.object({
  name: z.string().optional(),
  profile: z.string().optional(),
  email: z.email().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
});

export const PatientValidation = {
  updatePatient,
};
