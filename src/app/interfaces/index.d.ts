import { Role } from "../../generated/prisma/enums";

declare global {
  namespace Express {
    interface Request {
      user?: {
        role: Role;
        userId: string;
        email: string;
        name: string | null;
      };
    }
  }
}
