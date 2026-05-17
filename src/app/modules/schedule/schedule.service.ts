import status from "http-status";
import AppError from "../../errorsHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { ICreateScheduleType } from "./schedule.interface";
import { addHours, addMinutes, format } from "date-fns";
import { covertDataTime } from "./schedule.utils";

const createSchedule = async (payload: ICreateScheduleType) => {
  const { startDate, endDate, startTime, endTime } = payload;
  const interval = 30;
  const currentData = new Date(startDate);
  const lastDate = new Date(endDate);
  const schedules = [];
  while (currentData <= lastDate) {
    const startDateTime = addMinutes(
      addHours(
        `${format(currentData, "yyyy-MM-dd")}`,
        Number(startTime.split(":")[0]),
      ),
      Number(startTime.split(":")[1]),
    );
    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentData, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]),
        ),
        Number(endTime.split(":")[1]),
      ),
    );
    while (startDateTime < endDateTime) {
      const s = await covertDataTime(startDateTime);
      const e = await covertDataTime(addMinutes(startDateTime, interval));
      const scheduleData = {
        startDateTime: s,
        endDateTime: e,
      };
      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });
      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }
      startDateTime.setMinutes(startDateTime.getMinutes() + interval);
    }
    startDateTime.setDate(currentData.getDate() + 1);
  }
  return schedules;
};
const getScheduleById = async (id: string) => {
  const result = await prisma.schedule.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new AppError(status.NOT_FOUND, `Schedule not found`);
  }
  return result;
};
export const scheduleService = {
  createSchedule,
  getScheduleById,
};
