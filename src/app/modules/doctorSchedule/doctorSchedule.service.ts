import { IRequestUser } from "../../interfaces/error.interface";
import { prisma } from "../../lib/prisma";
import {
  TCreateMyDoctorSchedule,
  TUpdateMyDoctorSchedule,
} from "./doctorSchedule.validation";

const createMyDoctorSchedule = async (
  user: IRequestUser,
  payload: TCreateMyDoctorSchedule,
) => {
  const doctorData = await prisma.doctor.findFirstOrThrow({
    where: {
      userId: user.userId,
    },
  });
  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId: scheduleId,
  }));
  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
  return result;
};
const updateMyDoctorSchedule = async (
  user: IRequestUser,
  payload: TUpdateMyDoctorSchedule,
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const deleteIds = payload.scheduleIds
    .filter((schedule) => schedule.shouldDelete)
    .map((schedule) => schedule.id);

  const createIds = payload.scheduleIds
    .filter((schedule) => !schedule.shouldDelete)
    .map((schedule) => schedule.id);

  const result = await prisma.$transaction(async (tx) => {
    await tx.doctorSchedules.deleteMany({
      where: {
        isBooked: false,
        doctorId: doctorData.id,
        scheduleId: {
          in: deleteIds,
        },
      },
    });

    const doctorScheduleData = createIds.map((scheduleId) => ({
      doctorId: doctorData.id,
      scheduleId,
    }));

    const result = await tx.doctorSchedules.createMany({
      data: doctorScheduleData,
    });

    return result;
  });

  return result;
};
const getAllDoctorSchedules = async (
  user: IRequestUser,
  payload: TCreateMyDoctorSchedule,
) => {
  const doctorData = await prisma.doctor.findFirstOrThrow({
    where: {
      userId: user.userId,
    },
  });
  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId: scheduleId,
  }));
  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
  return result;
};
const getDoctorScheduleById = async (
  user: IRequestUser,
  payload: TCreateMyDoctorSchedule,
) => {
  const doctorData = await prisma.doctor.findFirstOrThrow({
    where: {
      userId: user.userId,
    },
  });
  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId: scheduleId,
  }));
  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
  return result;
};
const deleteMyDoctorSchedule = async (
  user: IRequestUser,
  payload: TCreateMyDoctorSchedule,
) => {
  const doctorData = await prisma.doctor.findFirstOrThrow({
    where: {
      userId: user.userId,
    },
  });
  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId: scheduleId,
  }));
  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
  return result;
};
const getMyDoctorSchedules = async (
  user: IRequestUser,
  payload: TCreateMyDoctorSchedule,
) => {
  const doctorData = await prisma.doctor.findFirstOrThrow({
    where: {
      userId: user.userId,
    },
  });
  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId: scheduleId,
  }));
  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
  return result;
};
export const DoctorScheduleService = {
  createMyDoctorSchedule,
  getAllDoctorSchedules,
  getDoctorScheduleById,
  updateMyDoctorSchedule,
  deleteMyDoctorSchedule,
  getMyDoctorSchedules,
};
