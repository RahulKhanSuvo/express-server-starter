import { z } from "zod";
import { BloodGroup, Gender } from "../../../generated/prisma/enums";

const updatePatient = z.object({
  name: z.string().optional(),
  profile: z.string().optional(),
  email: z.email().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
});
const updatePatientData = z.object({
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]).optional(),
  dateOfBirth: z.date(),
  bloodGroup: z.enum([
    BloodGroup.AB_NEGATIVE,
    BloodGroup.AB_POSITIVE,
    BloodGroup.B_NEGATIVE,
    BloodGroup.B_POSITIVE,
    BloodGroup.O_NEGATIVE,
    BloodGroup.O_POSITIVE,
    BloodGroup.A_NEGATIVE,
    BloodGroup.A_POSITIVE,
  ]),
  hasAllergies: z.boolean().default(false),
  hasDiabetes: z.boolean().default(false),
  height: z.string(),
  weight: z.string(),
  smokingStatus: z.boolean().default(false),
  dietaryPreferences: z.string().optional(),
  pregnancyStatus: z.boolean().default(false),
  mentalHealthHistory: z.string().optional(),
  immunizationStatus: z.string().optional(),
  hasPastSurgeries: z.boolean().default(false),
  recentAnxiety: z.boolean().default(false),
  recentDepression: z.boolean().default(false),
  maritalStatus: z.string().optional(),
});
const patientMedicalReport = z.object({
  reportName: z.string(),
  reportLink: z.string(),
  shouldDelete: z.boolean(),
});

export const PatientValidation = {
  updatePatient,
  updatePatientData,
  patientMedicalReport,
};
