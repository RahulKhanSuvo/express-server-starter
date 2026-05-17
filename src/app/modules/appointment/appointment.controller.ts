import status from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";

const bookAppointment = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment booked successfully",
    data: null,
  });
});
const getMyAppointments = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointments fetched successfully",
    data: null,
  });
});
const changeAppointmentStatus = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment booked successfully",
    data: null,
  });
});
const getMySingleAppointment = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment booked successfully",
    data: null,
  });
});
const getAllAppointments = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment booked successfully",
    data: null,
  });
});
const bookAppointmentWithPayLater = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment booked successfully",
    data: null,
  });
});
const initiatePayment = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment booked successfully",
    data: null,
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
