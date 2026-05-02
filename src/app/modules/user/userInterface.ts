import z from "zod";
import { Gender } from "../../../generated/prisma/enums";
export const CreateDoctorSchema = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    contactNumber: z.string(),
    address: z.string(),
    registrationNumber: z.string(),
    experience: z.number(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
    appointmentFee: z.number(),
    qualification: z.string(),
    currentWorkingPlace: z.string(),
    designation: z.string(),
    averageRating: z.number().optional(),
  }),
  specialties: z.array(z.string()),
});

export type CreateDoctorType = z.infer<typeof CreateDoctorSchema>;
