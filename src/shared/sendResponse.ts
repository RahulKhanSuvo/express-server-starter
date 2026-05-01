import { Response } from "express";

interface IResponseData<T> {
  httpStatusCode: number;
  success: boolean;
  message: string;
  data?: T;
}
export const sendResponse = <T>(
  res: Response,
  responseData: IResponseData<T>,
) => {
  const { success, httpStatusCode, message, data } = responseData;
  res.status(httpStatusCode).json({
    success,
    message,
    data,
  });
};
