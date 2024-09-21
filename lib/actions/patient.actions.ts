import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
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
