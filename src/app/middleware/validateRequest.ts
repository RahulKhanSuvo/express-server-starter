import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";

export const validateRequest = (schema: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        formattedErrors[key] = issue.message;
      });
      return res.status(status.BAD_REQUEST).json({
        success: false,
        message: "Validation failed",
        error: formattedErrors,
      });
    }
    req.body = result.data;
    next();
  };
};
