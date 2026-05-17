import { z } from "zod";

const createMyDoctorScheduleSchema = z.object({
  scheduleIds: z.array(z.string()),
});
const updateDoctorScheduleSchema = z.object({
  scheduleIds: z.array(
    z.object({
      shouldDelete: z.boolean(),
      id: z.string(),
    }),
  ),
});
export type TUpdateMyDoctorSchedule = z.infer<
  typeof updateDoctorScheduleSchema
>;
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
export const DoctorScheduleInterface = {
  createMyDoctorScheduleSchema,
  updateDoctorScheduleSchema,
  deleteMyDoctorScheduleSchema,
};
