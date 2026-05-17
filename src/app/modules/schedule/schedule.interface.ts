import z from "zod";

const createScheduleSchema = z.object({
  startDate: z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }, "Invalid date"),
  endDate: z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }, "Invalid date"),
  startTime: z.string().refine((value) => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  }, "Invalid time"),
  endTime: z.string().refine((value) => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  }, "Invalid time"),
});

export type ICreateScheduleType = z.infer<typeof createScheduleSchema>;
export const ScheduleInterface = { createScheduleSchema };
