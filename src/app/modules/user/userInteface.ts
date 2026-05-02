import { Gender } from "../../../generated/prisma/enums";

export interface IDoctor {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: Gender;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  averageRating?: number;
}
export interface CreateDoctor {
  password: string;
  doctor: IDoctor;
  specialties: string[];
}
