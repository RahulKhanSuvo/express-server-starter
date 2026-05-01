import express, { Application, Request, Response } from "express";
import { AppRoutes } from "./app/routes";
import { systemLogs } from "./app/middleware/syslemLogs";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(systemLogs);
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});
app.use("/api/v1", AppRoutes);
app.use(globalErrorHandler);
export default app;
