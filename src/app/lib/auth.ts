import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Role, userStatus } from "../../generated/prisma/client";
import { prisma } from "./prisma";
import ms, { StringValue } from "ms";
import envConfig from "../../config/env";
import { bearer, emailOTP } from "better-auth/plugins";
import { EmailUtils } from "../utils/email";

export const auth = betterAuth({
  baseURL: envConfig.BETTER_AUTH_URL,
  secret: envConfig.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: envConfig.GOOGLE_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
      mapProfileToUser: () => {
        return {
          role: Role.PATIENT,
          status: userStatus.ACTIVE,
          needPasswordChange: true,
          emailVerified: true,
          isDeleted: false,
          deletedAt: null,
        };
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
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
  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!user) {
            throw new Error("User not found");
          }
          await EmailUtils.sendEmail({
            to: email,
            subject: "Email Verification",
            templateName: "otp",
            templateData: {
              name: user.name,
              otp,
            },
          });
        } else if (type === "forget-password") {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!user) {
            throw new Error("User not found");
          }
          await EmailUtils.sendEmail({
            to: email,
            subject: "Forget Password",
            templateName: "forgetPassword",
            templateData: {
              name: user.name,
              otp,
            },
          });
        }
      },
      expiresIn: ms("10m"),
    }),
  ],
  session: {
    expiresIn:
      Number(ms(envConfig.BATTER_AUTH_SESSION_EXPIRE_IN as StringValue)) / 1000,
    updateAge:
      Number(
        ms(envConfig.BATTER_AUTH_SESSION_TOKEN_UPDATA_AGE as StringValue),
      ) / 1000,
    cookieCache: {
      enabled: true,
      maxAge:
        Number(
          ms(envConfig.BATTER_AUTH_SESSION_TOKEN_UPDATA_AGE as StringValue),
        ) / 1000,
    },
  },
  // redirectURLS: {
  //   callbackURL: envConfig.FRONTEND_URL,
  //   authURL: envConfig.FRONTEND_URL,
  //   signOutURL: envConfig.FRONTEND_URL,
  //   signInURL: envConfig.FRONTEND_URL,
  // },
  trustedOrigins: [envConfig.FRONTEND_URL, envConfig.BETTER_AUTH_URL],
  advanced: {
    // disableCSRFCheck: true,
    useSecureCookies: false,
    cookies: {
      state: {
        attributes: {
          sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
          secure: envConfig.NODE_ENV === "production",
          httpOnly: true,
          path: "/",
        },
      },
      sessionToken: {
        attributes: {
          sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
          secure: envConfig.NODE_ENV === "production",
          httpOnly: true,
          path: "/",
        },
      },
    },
  },
});
