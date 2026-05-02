/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import status from "http-status";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }
  const statusCode = status.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  const errorSources = [];
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
