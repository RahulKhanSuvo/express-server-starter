import { z } from "zod";

const createMyDoctorScheduleSchema = z.object({
  scheduleIds: z.array(z.string()),
});
const upDataMyDoctorScheduleSchema = z.object({
  scheduleIds: z.array(z.string()).optional(),
});
const deleteMyDoctorScheduleSchema = z.object({
  scheduleIds: z.array(
    z.object({
      id: z.string(),
      isBooked: z.boolean(),
    }),
  ),
});
export type TCreateMyDoctorSchedule = z.infer<
  typeof createMyDoctorScheduleSchema
>;
export type TUpDataMyDoctorSchedule = z.infer<
  typeof upDataMyDoctorScheduleSchema
>;
export const DoctorScheduleInterface = {
  createMyDoctorScheduleSchema,
  upDataMyDoctorScheduleSchema,
  deleteMyDoctorScheduleSchema,
};
