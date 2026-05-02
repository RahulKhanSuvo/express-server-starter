import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";

export const validateRequest = (schema: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        message: "Validation failed",
        error: result.error.issues,
      });
    }
    req.body = result.data;
    next();
  };
};
