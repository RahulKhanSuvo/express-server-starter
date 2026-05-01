import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";

const createSpecialty = async (req: Request, res: Response) => {
  const result = await SpecialtyService.createSpecialty(req.body);
  res.status(200).json({
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
};

const getAllSpecialty = catchAsync(async (req, res) => {
  const result = await SpecialtyService.getAllSpecialty();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Get all special",
    data: result,
  });
});
export const SpecialtyController = {
  createSpecialty,
  getAllSpecialty,
};
