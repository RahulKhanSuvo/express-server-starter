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
import cors from "cors";
import qs from "qs";
import { PaymentController } from "./app/modules/payment/payment.controller";
const app: Application = express();
app.set("query parser", (str: string) => qs.parse(str));
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "src/app/templates"));
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhookEvent,
);
// cors
app.use(
  cors({
    origin: [envConfig.FRONTEND_URL, envConfig.BETTER_AUTH_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/api/auth", toNodeHandler(auth));
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// ---------------------------------
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
// ---------------------------------
app.use("/api/v1", AppRoutes);
app.use(globalErrorHandler);
app.use(notFoundHandler);
export default app;
