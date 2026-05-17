import z from "zod";

const BookAppointmentSchema = z.object({
  doctorId: z.string(),
  scheduleId: z.string(),
});
const updataAppointmentStatusSchema = z.object({
  doctorId: z.string().optional(),
  scheduleId: z.string(),
});
const bookAppointmentWithPayLaterSchema = z.object({
  doctorId: z.string(),
  scheduleId: z.string(),
});

export type TBookAppointment = z.infer<typeof BookAppointmentSchema>;
export type TUpdateAppointmentStatus = z.infer<
  typeof updataAppointmentStatusSchema
>;
export type TBookAppointmentWithPayLater = z.infer<
  typeof bookAppointmentWithPayLaterSchema
>;
export const AppointmentValidation = {
  BookAppointmentSchema,
  updataAppointmentStatusSchema,
  bookAppointmentWithPayLaterSchema,
};
