import { Application } from "express";

export const systemLogs = (app: Application) =>
  app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`,
      );
    });

    next();
  });
