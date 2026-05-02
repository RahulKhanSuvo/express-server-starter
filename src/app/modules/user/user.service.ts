import createHttpError from "http-errors";
import { Role, Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

import { auth } from "../../lib/auth";
import { CreateDoctorType } from "./userInterface";

const createDoctor = async (payload: CreateDoctorType) => {
  const specialties: Specialty[] = [];
  for (const specialtyId of payload.specialties) {
    const specialty = await prisma.specialty.findUnique({
      where: {
        id: specialtyId,
      },
    });
    if (!specialty) {
      throw createHttpError(404, `specialty not found ${specialtyId}`);
    }
    specialties.push(specialty);
  }
  const userExists = await prisma.user.findUnique({
    where: {
      email: payload.doctor.email,
    },
  });
  if (userExists) {
    throw createHttpError(
      409,
      `user with email ${payload.doctor.email} already exists`,
    );
  }
  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.doctor.email,
      password: payload.password,
      name: payload.doctor.name,
      role: Role.DOCTOR,
      needPasswordChange: true,
    },
  });

  if (!userData.user) {
    throw createHttpError(500, "User not created");
  }
  try {
    const result = await prisma.$transaction(async (tx) => {
      const doctor = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor,
        },
      });
      const doctorSpecialtiesData = specialties.map((specialty: Specialty) => {
        return {
          doctorId: doctor.id,
          specialtyId: specialty.id,
        };
      });
      await tx.doctorSpecialty.createMany({
        data: doctorSpecialtiesData,
      });
      const doctorData = await tx.doctor.findUnique({
        where: {
          id: doctor.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          gender: true,
          address: true,
          contactNumber: true,
          registrationNumber: true,
          experience: true,
          appointmentFee: true,
          qualification: true,
          currentWorkingPlace: true,
          designation: true,
          averageRating: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              emailVerified: true,
              image: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          specialties: {
            select: {
              specialty: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      });
      return doctorData;
    });
    return result;
  } catch (error) {
    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });
    throw createHttpError(500, "Failed to create doctor", { cause: error });
  }
};

export const UserService = {
  createDoctor,
};
