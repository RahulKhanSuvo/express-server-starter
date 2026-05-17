import { catchAsync } from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { IRequestUser } from "../../interfaces/error.interface";

const createMyDoctorSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DoctorScheduleService.createMyDoctorSchedule(
      req.user as IRequestUser,
      req.body,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Doctor schedule created successfully",
      data: result,
    });
  },
);
const updateMyDoctorSchedule = () => {};
const getAllDoctorSchedules = () => {};
const getDoctorScheduleById = () => {};
const deleteMyDoctorSchedule = () => {};
const getMyDoctorSchedules = () => {};
export const DoctorScheduleController = {
  createMyDoctorSchedule,
  getAllDoctorSchedules,
  getDoctorScheduleById,
  updateMyDoctorSchedule,
  deleteMyDoctorSchedule,
  getMyDoctorSchedules,
};
