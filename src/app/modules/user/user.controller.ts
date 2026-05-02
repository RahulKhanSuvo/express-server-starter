import { Request, Response } from "express";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service";
import { catchAsync } from "../../../shared/catchAsync";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createDoctor(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});
export const UserController = {
  createDoctor,
};
