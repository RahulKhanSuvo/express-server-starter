import { prisma } from "../../lib/prisma";

const getAllDoctors = async () => {
  const doctor = await prisma.doctor.findMany({
    include: {
      user: true,
      specialties: true,
    },
  });
  return doctor;
};
export const doctorService = {
  getAllDoctors,
};
