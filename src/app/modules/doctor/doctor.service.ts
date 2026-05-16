import { prisma } from "../../lib/prisma";
import AppError from "../../errorsHelpers/AppError";
import status from "http-status";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IQueryPrams } from "../../interfaces/query.interface";
import {
  doctorFilterableFields,
  doctorSearchableFields,
} from "./doctor.constant";
import { Doctor, Prisma } from "../../../generated/prisma/client";

const getAllDoctors = async (query: IQueryPrams) => {
  const queryBuilder = new QueryBuilder<
    Doctor,
    Prisma.DoctorWhereInput,
    Prisma.DoctorInclude
  >(prisma.doctor, query, {
    searchableFields: doctorSearchableFields,
    filterAbleFields: doctorFilterableFields,
  });
  const result = await queryBuilder
    .search()
    .filter()
    .sort()
    .paginate()
    .where({
      isDeleted: false,
    })
    .include({
      user: true,
      specialties: true,
    })
    .execute();
  return result;
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
