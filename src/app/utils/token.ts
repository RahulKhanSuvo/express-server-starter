import { JwtPayload, SignOptions } from "jsonwebtoken";
import { JwtUtils } from "./jwt";
import envConfig from "../../config/env";

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

export const TokenUtils = {
  getAccessToken,
  getRefreshToken,
};
