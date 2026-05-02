import z from "zod";
import { Gender } from "../../../generated/prisma/enums";
export const CreateDoctorSchema = z.object({
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
  doctor: z.object({
    name: z.string({ message: "Name is required" }),
    email: z.email("Invalid email"),
    contactNumber: z.string({ message: "Contact number is required" }),
    address: z.string({ message: "Address is required" }).optional(),
    registrationNumber: z.string({
      message: "Registration number is required",
    }),
    experience: z
      .int("Experience must be a number")
      .nonnegative("Experience must be a non negative number")
      .optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
    appointmentFee: z.number({ message: "Appointment fee must be a number" }),
    qualification: z.string({ message: "Qualification is required" }),
    currentWorkingPlace: z.string({
      message: "Current working place is required",
    }),
    designation: z.string({ message: "Designation is required" }),
    averageRating: z.number().optional(),
  }),
  specialties: z
    .array(z.uuid("Invalid UUID"))
    .min(1, "minimum 1 Specialty is required"),
});

export type CreateDoctorType = z.infer<typeof CreateDoctorSchema>;
