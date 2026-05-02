/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import status from "http-status";
import z from "zod";
import envConfig from "../../config/env";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envConfig.NODE_ENV === "development") {
    console.error(err);
  }
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = err.message || "Internal Server Error";
  const errorSources: TErrorSources[] = [];
  if (err instanceof z.ZodError) {
    statusCode = status.BAD_REQUEST;
    message = "Validation Error";
    err.issues.forEach((issue) => {
      errorSources.push({
        path: issue.path.join(".") || "Unknown Path",
        message: issue.message,
      });
    });
  }
  const errorResponse: TErrorResponse = {
    success: false,
    message,
    errorSources,
    error: envConfig.NODE_ENV === "development" ? err.message : null,
  };
  res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
