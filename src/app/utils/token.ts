import { Response } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { JwtUtils } from "./jwt";
import envConfig from "../../config/env";
import { CookieUtils } from "./cookies";
import ms from "ms";

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
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
};
const setRefreshTokenOnCookie = (res: Response, token: string) => {
  CookieUtils.setACookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: ms("1d"),
  });
};
export const TokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenOnCookie,
  setRefreshTokenOnCookie,
};
