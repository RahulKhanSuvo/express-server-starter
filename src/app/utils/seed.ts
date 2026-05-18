import envConfig from "../../config/env";
import { Role } from "../../generated/prisma/enums";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });
    if (isSuperAdminExist) {
      console.log("Super admin already exists, Skipping seeding super admin");
      return;
    }
    const superAdmin = await auth.api.signUpEmail({
      body: {
        name: "Super Admin",
        email: envConfig.SUPER_ADMIN_EMAIL,
        password: envConfig.SUPER_ADMIN_PASSWORD,
        role: Role.SUPER_ADMIN,
        needPasswordChange: false,
        rememberMe: false,
      },
    });
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: superAdmin.user.id,
        },
        data: {
          emailVerified: true,
        },
      });
      await tx.admin.create({
        data: {
          userId: superAdmin.user.id,
          name: "Super Admin",
          email: envConfig.SUPER_ADMIN_EMAIL,
        },
      });
    });

    console.log("Super admin created successfully", superAdmin);
  } catch (error) {
    console.error("Error seeding super admin", error);
    await prisma.user.delete({
      where: {
        email: envConfig.SUPER_ADMIN_EMAIL,
      },
    });
  }
};
export default seedSuperAdmin;
