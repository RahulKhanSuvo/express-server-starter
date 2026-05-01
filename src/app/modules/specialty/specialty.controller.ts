import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { catchAsync } from "../../../shared/catchAsync";

const createSpecialty = async (req: Request, res: Response) => {
  const result = await SpecialtyService.createSpecialty(req.body);
  res.status(200).json({
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
};

const getAllSpecialty = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "get all successful",
  });
});
export const SpecialtyController = {
  createSpecialty,
  getAllSpecialty,
};
