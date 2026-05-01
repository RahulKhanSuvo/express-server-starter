import express, { Application, Request, Response } from "express";
import { AppRoutes } from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import morgan from "morgan";
import { notFoundHandler } from "./app/middleware/notFound";
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});
app.use("/api/v1", AppRoutes);
app.use(globalErrorHandler);
app.use(notFoundHandler);
export default app;
