import { catchAsync } from "../../../shared/catchAsync";
import { doctorService } from "./doctor.service";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllDoctors = catchAsync(async (req, res) => {
  const result = await doctorService.getAllDoctors(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctors fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});
const getDoctorById = catchAsync(async (req, res) => {
  const result = await doctorService.getDoctorById(req.params.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Doctor fetched successfully",
    data: result,
  });
});
export const doctorController = {
  getAllDoctors,
  getDoctorById,
};
