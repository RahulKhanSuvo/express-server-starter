import { Prisma } from "../../../generated/prisma/client";

export const doctorSearchableFields = ["name", "email", "specialty"];
export const doctorFilterableFields = ["name", "email", "specialty"];
export const doctorIncludeConfig: Partial<
  Record<
    keyof Prisma.DoctorInclude,
    Prisma.DoctorInclude[keyof Prisma.DoctorInclude]
  >
> = {
  user: true,
  specialties: true,
  appointments: true,
  doctorSchedules: {
    include: {
      schedule: true,
    },
  },
};
