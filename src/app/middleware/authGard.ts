import { Role, userStatus } from "../../generated/prisma/enums";
import { NextFunction, Request, Response } from "express";
import { CookieUtils } from "../utils/cookies";
import AppError from "../errorsHelpers/AppError";
import status from "http-status";
import { prisma } from "../lib/prisma";

export const AuthGard =
  (...authRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionToken = CookieUtils.getACookie(
        req,
        "batter_auth_session_token",
      );
      if (!sessionToken) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized access no session token provided",
        );
      }
      if (sessionToken) {
        const sessionExist = await prisma.session.findUnique({
          where: {
            token: sessionToken,
            expiresAt: {
              gt: new Date(),
            },
          },
          include: { user: true },
        });
        if (sessionExist && sessionExist.user) {
          const user = sessionExist.user;
          const newData = new Date();
          const expiresAt = new Date(sessionExist.expiresAt);
          const createAt = new Date(sessionExist.createdAt);
          const sessionLifetime = expiresAt.getTime() - createAt.getTime();
          const timeRemaining = expiresAt.getTime() - newData.getTime();
          const percentRemaining = timeRemaining / sessionLifetime;

          if (percentRemaining < 20) {
            res.setHeader("X-Session-Refresh", "true");
            res.setHeader("X-Session-Expire-At", expiresAt.toString());
            res.setHeader("X-Time-Remaining", timeRemaining.toString());
          }

          if (
            user.status === userStatus.BLOCKED ||
            user.status === userStatus.DELETED
          ) {
            throw new AppError(
              status.UNAUTHORIZED,
              "Unauthorized access Your account is blocked or deleted",
            );
          }
          if (authRoles.length > 0) {
            const isAuthRole = authRoles.includes(user.role);
            if (!isAuthRole) {
              throw new AppError(
                status.FORBIDDEN,
                "You do not have permission to access this resource",
              );
            }
          }
        }
      }
    } catch (error) {
      next(error);
    }
  };
