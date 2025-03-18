"use server";

// add "use server" on top of patients.actions.ts file.
// By adding "use server", you're telling Next.js that all the functions in this file should be executed on the server, never on the client. Server-side code can access all environment variables, including those not prefixed with NEXT_PUBLIC_.
// This is why your PROJECT_ID, API_KEY, and DATABASE_ID became accessible.

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { BUCKET_ID, storage, users, db, DATABASE_ID, PATIENT_COLLECTION_ID, ENDPOINT, PROJECT_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
    return newUser;
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents?.users.find((item) => item.email === user.email);
    }
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const response = await users.get(userId);

    return parseStringify(response);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({ identificationDocument, ...patients }: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await db.createDocument(DATABASE_ID!, PATIENT_COLLECTION_ID!, ID.unique(), {
      identificationDocumentId: file?.$id || null,
      identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      ...patients
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

export const getPatients = async (userId: string) => {
  try {
    const patients = await db.listDocuments(DATABASE_ID!, PATIENT_COLLECTION_ID!, [Query.equal("userId", userId)]);
    return parseStringify(patients);
  } catch (error) {
    console.log(error);
  }
};
