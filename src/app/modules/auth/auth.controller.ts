import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import httpStatus, { status } from "http-status";
import { sendResponse } from "../../../shared/sendResponse";
import { TokenUtils } from "../../utils/token";
import AppError from "../../errorsHelpers/AppError";
import { CookieUtils } from "../../utils/cookies";
import envConfig from "../../../config/env";
import { auth } from "../../lib/auth";

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
    data: data,
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
    data: data,
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
  const sessionToken = req.cookies["better-auth.session_token"];
  if (!sessionToken)
    throw new AppError(status.BAD_REQUEST, "Session token is required");
  const result = await AuthService.changePassword(req.body, sessionToken);
  const { accessToken, refreshToken, sessionToken: token } = result;
  TokenUtils.setAccessTokenOnCookie(res, accessToken);
  TokenUtils.setRefreshTokenOnCookie(res, refreshToken);
  TokenUtils.setBatterAuthSessionOnCookie(res, token!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});
const logoutUser = catchAsync(async (req, res) => {
  const sessionToken = req.cookies["better-auth.session_token"];
  if (!sessionToken)
    throw new AppError(status.BAD_REQUEST, "Session token is required");
  const result = await AuthService.logoutUser(sessionToken);
  CookieUtils.deleteACookie(res, "accessToken");
  CookieUtils.deleteACookie(res, "refreshToken");
  CookieUtils.deleteACookie(res, "better-auth.session_token");
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged out successfully",
    data: result,
  });
});
const verifyEmail = catchAsync(async (req, res) => {
  const result = await AuthService.verifyEmail(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Email verified successfully",
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthService.forgetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const result = await AuthService.resetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

const googleLogin = catchAsync(async (req, res) => {
  const redirectPath = (req.query.redirect as string) || "/";
  const encodedRedirectPath = encodeURIComponent(redirectPath);
  const callbackURL = `${envConfig.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;
  res.render("googleRedirect", {
    betterAuthUrl: envConfig.BETTER_AUTH_URL,
    callbackURL,
  });
});
const googleLoginSuccess = catchAsync(async (req, res) => {
  const redirectPath = (req.query.redirect as string) || "/";
  const sessionToken = req.cookies["better-auth.session_token"];
  if (!sessionToken) {
    return res.redirect(
      `${envConfig.FRONTEND_URL}/login?error=${encodeURIComponent("Failed to login")}`,
    );
  }
  const session = await auth.api.getSession({
    headers: {
      Cookie: `better-auth.session_token=${sessionToken}`,
    },
  });
  if (!session || !session.user) {
    return res.redirect(
      `${envConfig.FRONTEND_URL}/login?error=${encodeURIComponent("Failed to login")}`,
    );
  }
  const result = await AuthService.googleLoginSuccess(session);
  const { accessToken, refreshToken } = result;
  TokenUtils.setAccessTokenOnCookie(res, accessToken);
  TokenUtils.setRefreshTokenOnCookie(res, refreshToken);
  TokenUtils.setBatterAuthSessionOnCookie(res, sessionToken);
  const isValidRedirectPath =
    redirectPath.startsWith("/") && !redirectPath.startsWith("//");
  const finalRedirectPath = isValidRedirectPath ? redirectPath : `/`;
  res.redirect(`${envConfig.FRONTEND_URL}${finalRedirectPath}`);
});
const googleLoginError = catchAsync(async (req, res) => {
  const error = req.query.error || "oauth_failed";
  const redirectPath = (req.query.redirect as string) || "/";
  const finalUrl = `${envConfig.FRONTEND_URL}/login?error=${encodeURIComponent(error as string)}&redirect=${encodeURIComponent(redirectPath)}`;
  res.redirect(finalUrl);
});
export const AuthController = {
  registerPatient,
  loginUser,
  getMe,
  newToken,
  changePassword,
  logoutUser,
  verifyEmail,
  forgetPassword,
  resetPassword,
  googleLogin,
  googleLoginSuccess,
  googleLoginError,
};
