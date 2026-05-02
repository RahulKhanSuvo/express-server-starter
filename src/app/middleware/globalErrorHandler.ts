/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import status from "http-status";
import z from "zod";
import envConfig from "../../config/env";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import { handleZodError } from "../errorsHelpers/handelZodError";
import AppError from "../errorsHelpers/AppError";

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
  let errorSources: TErrorSources[] = [];
  let stack: string | undefined;

  if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode!;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
    stack = err.stack;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
  } else if (err instanceof Error) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
  }
  const errorResponse: TErrorResponse = {
    success: false,
    message,
    errorSources,
    stack: envConfig.NODE_ENV === "development" ? err.stack : null,
  };
  res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;
