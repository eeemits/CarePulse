"use server";

import { ID, Query } from "node-appwrite";
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

export const getRecentAppointment = async () => {
  try {
    const response = await db.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [Query.orderDesc("$createdAt")]);

    const initialCount = {
      sheduled: 0,
      pending: 0,
      cancelled: 0
    };

    const count = response.documents.reduce((acc, doc) => {
      if (doc.status === "scheduled") {
        acc.sheduled += 1;
      } else if (doc.status === "pending") {
        acc.pending += 1;
      } else {
        acc.cancelled += 1;
      }
      return acc;
    }, initialCount);

    const { total, documents } = response;

    const data = {
      totalCount: total,
      ...count,
      documents
    };

    return parseStringify(data);
  } catch (error) {
    console.log("error", error);
  }
};
