import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const result = await prisma.specialty.create({
    data: payload,
  });
  return result;
};
const getAllSpecialty = async () => {
  const result = await prisma.specialty.findMany();
  return result;
};
export const SpecialtyService = {
  createSpecialty,
  getAllSpecialty,
};
