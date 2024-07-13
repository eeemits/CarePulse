import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  address: string;
  allergies: string | undefined;
  birthDate: Date;
  currentMedication: string | undefined;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  familyMedicalHistory: string | undefined;
  gender: Gender;
  identificationDocument: FormData | undefined;
  identificationNumber: string | undefined;
  identificationType: string | undefined;
  insurancePolicyNumber: string;
  insuranceProvider: string;
  name: string;
  occupation: string;
  pastMedicalHistory: string | undefined;
  phone: string;
  primaryPhysician: string;
  privacyConsent: boolean;
  userId: string;
}

export interface Appointment extends Models.Document {
  cancellationReason: string | null;
  note: string;
  patient: Patient;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  userId: string;
}
