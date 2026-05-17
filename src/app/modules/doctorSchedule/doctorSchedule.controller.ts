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
const updateMyDoctorSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DoctorScheduleService.updateMyDoctorSchedule(
      req.user as IRequestUser,
      req.body,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Doctor schedule updated successfully",
      data: result,
    });
  },
);
const getAllDoctorSchedules = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DoctorScheduleService.getAllDoctorSchedules(
      req.user as IRequestUser,
      req.body,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Doctor schedules fetched successfully",
      data: result,
    });
  },
);
const getDoctorScheduleById = catchAsync(
  async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId;
    const scheduleId = req.params.scheduleId;
    const result = await DoctorScheduleService.getDoctorScheduleById(
      doctorId as string,
      scheduleId as string,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Doctor schedule fetched successfully",
      data: result,
    });
  },
);
const deleteMyDoctorSchedule = catchAsync(
  async (req: Request, res: Response) => {
    await DoctorScheduleService.deleteMyDoctorSchedule(
      req.params.id as string,
      req.user as IRequestUser,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Doctor schedule deleted successfully",
    });
  },
);
const getMyDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorScheduleService.getMyDoctorSchedules(
    req.user as IRequestUser,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor schedules fetched successfully",
    data: result,
  });
});
export const DoctorScheduleController = {
  createMyDoctorSchedule,
  getAllDoctorSchedules,
  getDoctorScheduleById,
  updateMyDoctorSchedule,
  deleteMyDoctorSchedule,
  getMyDoctorSchedules,
};
