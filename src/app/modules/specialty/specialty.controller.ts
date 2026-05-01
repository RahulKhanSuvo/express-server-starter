import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
const createSpecialty = async (req: Request, res: Response) => {
  const result = await SpecialtyService.createSpecialty(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
};

const getAllSpecialty = catchAsync(async (req, res) => {
  const result = await SpecialtyService.getAllSpecialty();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all specialties successfully",
    data: result,
  });
});
export const SpecialtyController = {
  createSpecialty,
  getAllSpecialty,
};
