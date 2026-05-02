import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Role, userStatus } from "../../generated/prisma/client";
import { prisma } from "./prisma";
import ms from "ms";
import envConfig from "../../config/env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.PATIENT,
      },
      status: {
        type: "string",
        required: true,
        defaultValue: userStatus.ACTIVE,
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null,
      },
    },
  },
  session: {
    expiresIn: Number(ms(Number(envConfig.BATTER_AUTH_SESSION_EXPIRE_IN))),
    updateAge: Number(
      ms(Number(envConfig.BATTER_AUTH_SESSION_TOKEN_UPDATA_AGE)),
    ),
    cookieCache: {
      enabled: true,
      maxAge: Number(
        ms(Number(envConfig.BATTER_AUTH_SESSION_TOKEN_UPDATA_AGE)),
      ),
    },
  },
  // trustedOrigins: [process.env.TRUSTED_ORIGINS || "http://localhost:5000"],
  // advanced: {
  //   disableCSRFCheck: true,
  // },
});
