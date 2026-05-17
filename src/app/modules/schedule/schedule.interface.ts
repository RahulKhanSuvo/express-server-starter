import z from "zod";

const createScheduleSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export type ICreateScheduleType = z.infer<typeof createScheduleSchema>;
export const ScheduleInterface = { createScheduleSchema };
