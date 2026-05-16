import { Response } from "express";

interface IResponseData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?:
    | T
    | {
        data: T;
        meta?: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      };
}
export const sendResponse = <T>(
  res: Response,
  responseData: IResponseData<T>,
) => {
  const { success, statusCode, message, data } = responseData;
  if (
    data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    "meta" in data
  ) {
    return res.status(statusCode).json({
      success,
      message,
      data: data.data,
      ...(data.meta && { meta: data.meta }),
    });
  }
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
