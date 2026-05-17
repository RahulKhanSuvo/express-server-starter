import { IRequestUser } from "../../interfaces/error.interface";
import { prisma } from "../../lib/prisma";
import { TCreateMyDoctorSchedule } from "./doctorSchedule.validation";

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
