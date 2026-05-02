import { z } from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import status from "http-status";
import envConfig from "../../config/env";

export const handleZodError = (err: z.ZodError): TErrorResponse => {
  const statusCode = status.BAD_REQUEST;
  const message = "Validation Error";
  const errorSources: TErrorSources[] = [];
  err.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join(".") || "Unknown Path",
      message: issue.message,
    });
  });
  return {
    success: false,
    message,
    errorSources,
    statusCode,
    error: envConfig.NODE_ENV === "development" ? err.message : null,
  };
};
