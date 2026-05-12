import express, { Application, Request, Response } from "express";
import { AppRoutes } from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import morgan from "morgan";
import { notFoundHandler } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
import envConfig from "./config/env";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "node:path";
const app: Application = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "src/app/templates"));
app.use("/api/auth", toNodeHandler(auth));
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
