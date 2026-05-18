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
  reportId: z.string().optional(),
});
const updatePatientProfileSchema = z.object({
  patientInfo: updatePatient,
  patientHealthData: updatePatientData,
  medicalReports: z
    .array(
      z.object({
        reportName: z.string(),
        reportLink: z.string(),
        shouldDelete: z.boolean(),
        reportId: z.string().optional(),
      }),
    )
    .optional()
    .refine((reports) => {
      if (!reports || reports.length === 0) return true;
      for (const report of reports) {
        if (report.shouldDelete === true && !report.reportId) {
          return false; // If shouldDelete is true, reportId must be provided
        }

        // case-2
        if (report.reportId && !report.shouldDelete) {
          return false; // If reportId is provided, shouldDelete must be true
        }

        //case-3
        if (report.reportName && !report.reportLink) {
          return false; // If reportName is provided, reportLink must also be provided
        }

        //case-4
        if (report.reportLink && !report.reportName) {
          return false; // If reportLink is provided, reportName must also be provided
        }

        return true; // If none of the above conditions are violated, it's valid
      }
    }),
});

export const PatientValidation = {
  updatePatient,
  updatePatientData,
  patientMedicalReport,
  updatePatientProfileSchema,
};
