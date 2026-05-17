import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { scheduleService } from "./schedule.service";
import status from "http-status";

const createSchedule = catchAsync(async (req, res) => {
  const result = await scheduleService.createSchedule(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule created successfully",
    data: result,
  });
});
const getAllSchedules = catchAsync(async (req, res) => {
  const result = await scheduleService.getAllSchedules(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedules fetched successfully",
    data: result,
  });
});
const getScheduleById = catchAsync(async (req, res) => {
  const result = await scheduleService.getScheduleById(req.params.id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule fetched successfully",
    data: result,
  });
});
const updateSchedule = catchAsync(async (req, res) => {
  const result = await scheduleService.updateSchedule(
    req.params.id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule updated successfully",
    data: result,
  });
});
const deleteSchedule = catchAsync(async (req, res) => {
  const result = await scheduleService.deleteSchedule(req.params.id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});
export const ScheduleController = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
