import express, { Application, Request, Response } from "express";
import { AppRoutes } from "./app/routes";

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});
app.use("/api/v1", AppRoutes);
export default app;
