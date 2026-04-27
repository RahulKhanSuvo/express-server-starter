import { Request, Response } from "express";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
  const result = await SpecialtyService.createSpecialty(req.body);
  res.status(200).json({
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
};

export const SpecialtyController = {
  createSpecialty,
};
