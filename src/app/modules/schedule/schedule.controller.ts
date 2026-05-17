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
export const ScheduleController = {
  createSchedule,
};
