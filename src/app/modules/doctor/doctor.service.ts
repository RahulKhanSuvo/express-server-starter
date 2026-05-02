import { prisma } from "../../lib/prisma";
import AppError from "../../errorsHelpers/AppError";
import status from "http-status";

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
    throw new AppError(status.NOT_FOUND, `Doctor not found`);
  }
  return doctor;
};
export const doctorService = {
  getAllDoctors,
  getDoctorById,
};
