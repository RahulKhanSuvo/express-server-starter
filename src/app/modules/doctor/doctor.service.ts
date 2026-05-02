import { prisma } from "../../lib/prisma";

const getAllDoctors = async () => {
  return await prisma.doctor.findMany();
};
export const doctorService = {
  getAllDoctors,
};
