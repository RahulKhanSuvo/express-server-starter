import { Response } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { JwtUtils } from "./jwt";
import envConfig from "../../config/env";
import { CookieUtils } from "./cookies";
import ms, { StringValue } from "ms";

const getAccessToken = (payload: JwtPayload) => {
  const accessToken = JwtUtils.createToken(
    payload,
    envConfig.ACCESS_TOKEN_SECRET,
    {
      expiresIn: envConfig.ACCESS_TOKEN_EXPIRE_IN,
    } as SignOptions,
  );
  return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = JwtUtils.createToken(
    payload,
    envConfig.REFRESH_TOKEN_SECRET,
    {
      expiresIn: envConfig.REFRESH_TOKEN_EXPIRE_IN,
    } as SignOptions,
  );
  return refreshToken;
};
const setAccessTokenOnCookie = (res: Response, token: string) => {
  CookieUtils.setACookie(res, "accessToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    path: "/",
    maxAge: ms(envConfig.ACCESS_TOKEN_EXPIRE_IN as StringValue),
  });
};
const setRefreshTokenOnCookie = (res: Response, token: string) => {
  CookieUtils.setACookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    path: "/",
    maxAge: ms(envConfig.REFRESH_TOKEN_EXPIRE_IN as StringValue),
  });
};
const setBatterAuthSessionOnCookie = (res: Response, token: string) => {
  CookieUtils.setACookie(res, "batter_auth_session_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    path: "/",
    maxAge: ms(envConfig.BATTER_AUTH_SESSION_EXPIRE_IN as StringValue),
  });
};
export const TokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenOnCookie,
  setRefreshTokenOnCookie,
  setBatterAuthSessionOnCookie,
};
