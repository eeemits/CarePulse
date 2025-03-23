"use server";

import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, db, parseStringify } from "..";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await db.createDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, ID.unique(), {
      ...appointment
    });

    return parseStringify(newAppointment);
  } catch (error) {
    throw error;
  }
};

export const getAppointment = async (id: string) => {
  try {
    const response = await db.getDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, id);

    return parseStringify(response) as RestResponse<CreateAppointmentParams>;
  } catch (error) {
    throw error;
  }
};
