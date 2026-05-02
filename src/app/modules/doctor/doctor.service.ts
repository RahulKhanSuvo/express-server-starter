import createHttpError from "http-errors";
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
const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });
  if (!doctor) {
    throw createHttpError(404, `Doctor not found`);
  }
  return doctor;
};
export const doctorService = {
  getAllDoctors,
  getDoctorById,
};
