import express, { Application, Request, Response } from "express";
import { AppRoutes } from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import morgan from "morgan";
import { notFoundHandler } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
import envConfig from "./config/env";
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
if (envConfig.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
    ...(envConfig.NODE_ENV !== "production" && {
      environment: envConfig.NODE_ENV,
    }),
  });
});
app.use("/api/v1", AppRoutes);
app.use(globalErrorHandler);
app.use(notFoundHandler);
export default app;
