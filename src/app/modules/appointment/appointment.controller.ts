import status from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";

const bookAppointment = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const appointment = await AppointmentService.bookAppointment(payload, user!);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment booked successfully",
    data: appointment,
  });
});
const getMyAppointments = catchAsync(async (req, res) => {
  const user = req.user;
  const appointments = await AppointmentService.getMyAppointments(user!);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointments fetched successfully",
    data: appointments,
  });
});
const changeAppointmentStatus = catchAsync(async (req, res) => {
  const appointmentId = req.params.id;
  const payload = req.body;
  const user = req.user;

  const updatedAppointment = await AppointmentService.changeAppointmentStatus(
    appointmentId as string,
    payload,
    user!,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment status changed successfully",
    data: updatedAppointment,
  });
});
const getMySingleAppointment = catchAsync(async (req, res) => {
  const appointmentId = req.params.id;
  const user = req.user;

  const appointment = await AppointmentService.getMySingleAppointment(
    appointmentId as string,
    user!,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment fetched successfully",
    data: appointment,
  });
});
const getAllAppointments = catchAsync(async (req, res) => {
  const appointments = await AppointmentService.getAllAppointments();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointments fetched successfully",
    data: appointments,
  });
});
const bookAppointmentWithPayLater = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;
  const appointment = await AppointmentService.bookAppointmentWithPayLater(
    payload,
    user!,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment booked successfully",
    data: appointment,
  });
});
const initiatePayment = catchAsync(async (req, res) => {
  const appointmentId = req.params.id;
  const user = req.user;
  const paymentInfo = await AppointmentService.initiatePayment(
    appointmentId as string,
    user,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Payment initiated successfully",
    data: paymentInfo,
  });
});
export const AppointmentController = {
  bookAppointment,
  getMyAppointments,
  changeAppointmentStatus,
  getMySingleAppointment,
  getAllAppointments,
  bookAppointmentWithPayLater,
  initiatePayment,
};
