import { CookieOptions, Request, Response } from "express";

const setACookie = (
  res: Response,
  key: string,
  value: string,
  options: CookieOptions,
) => {
  res.cookie(key, value, options);
};
const getACookie = (req: Request, key: string) => {
  return req.cookies[key];
};
const deleteACookie = (res: Response, key: string) => {
  res.clearCookie(key);
};
export const CookieUtils = {
  setACookie,
  deleteACookie,
  getACookie,
};
