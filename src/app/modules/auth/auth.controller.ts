import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import httpStatus, { status } from "http-status";
import { sendResponse } from "../../../shared/sendResponse";
import { TokenUtils } from "../../utils/token";
import AppError from "../../errorsHelpers/AppError";

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
const getMe = catchAsync(async (req, res) => {
  const result = await AuthService.getMe(req.user!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

const newToken = catchAsync(async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  const oldSessionToken = req.cookies.batter_auth_session_token;
  if (!oldRefreshToken || !oldSessionToken)
    throw new AppError(
      status.BAD_REQUEST,
      "Session token and refresh token are required",
    );
  const result = await AuthService.newToken(oldRefreshToken, oldSessionToken);

  const { accessToken, refreshToken, sessionToken } = result;
  TokenUtils.setAccessTokenOnCookie(res, accessToken);
  TokenUtils.setRefreshTokenOnCookie(res, refreshToken);
  TokenUtils.setBatterAuthSessionOnCookie(res, sessionToken);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "New token generated successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const sessionToken = req.cookies.batter_auth_session_token;
  if (!sessionToken)
    throw new AppError(status.BAD_REQUEST, "Session token is required");
  const result = await AuthService.changePassword(req.body, sessionToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

export const AuthController = {
  registerPatient,
  loginUser,
  getMe,
  newToken,
  changePassword,
};
