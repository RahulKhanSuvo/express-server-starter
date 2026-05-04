import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import { sendResponse } from "../../../shared/sendResponse";
import { TokenUtils } from "../../utils/token";

const registerPatient = catchAsync(async (req, res) => {
  const result = await AuthService.registerPatient(req.body);
  const { accessToken, refreshToken, token, ...data } = result;
  TokenUtils.setAccessTokenOnCookie(res, accessToken);
  TokenUtils.setRefreshTokenOnCookie(res, refreshToken);
  TokenUtils.setBatterAuthSessionOnCookie(res, token!);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient registered successfully",
    data: {
      accessToken,
      refreshToken,
      data,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { accessToken, refreshToken, token, ...data } = result;
  TokenUtils.setAccessTokenOnCookie(res, accessToken);
  TokenUtils.setRefreshTokenOnCookie(res, refreshToken);
  TokenUtils.setBatterAuthSessionOnCookie(res, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken,
      data,
    },
  });
});

export const AuthController = {
  registerPatient,
  loginUser,
};
