import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import { sendResponse } from "../../../shared/sendResponse";

const registerPatient = catchAsync(async (req, res) => {
  const result = await AuthService.registerPatient(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthController = {
  registerPatient,
  loginUser,
};
