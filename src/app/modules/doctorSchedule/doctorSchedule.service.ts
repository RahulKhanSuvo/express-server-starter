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
const getAllDoctorSchedules = () => {};
const getDoctorScheduleById = () => {};
const updateMyDoctorSchedule = () => {};
const deleteMyDoctorSchedule = () => {};
const getMyDoctorSchedules = () => {};
export const DoctorScheduleService = {
  createMyDoctorSchedule,
  getAllDoctorSchedules,
  getDoctorScheduleById,
  updateMyDoctorSchedule,
  deleteMyDoctorSchedule,
  getMyDoctorSchedules,
};
