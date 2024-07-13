/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  address: string;
  allergies: string | undefined;
  birthDate: Date;
  currentMedication: string | undefined;
  emergencyContactName: string;
  emergencyContactNumber: string;
  familyMedicalHistory: string | undefined;
  gender: Gender;
  identificationDocument: FormData | undefined;
  identificationNumber: string | undefined;
  identificationType: string | undefined;
  insurancePolicyNumber: string;
  insuranceProvider: string;
  occupation: string;
  pastMedicalHistory: string | undefined;
  primaryPhysician: string;
  privacyConsent: boolean;
  userId: string;
}

declare type CreateAppointmentParams = {
  note: string | undefined;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  userId: string;
};

declare type UpdateAppointmentParams = {
  appointment: Appointment;
  appointmentId: string;
  type: string;
  userId: string;
};
