import { Request, Response } from "express";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const result = await UserService.createDoctor(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
};
export const UserController = {
  createUser,
};
