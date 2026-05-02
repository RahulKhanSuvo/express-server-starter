class AppError extends Error {
  public statusCode: number;
  public cause?: unknown;
  constructor(
    statusCode: number,
    message: string | undefined,
    cause?: unknown,
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
