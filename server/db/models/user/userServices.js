import * as UserModel from "./userCollection.js";
import { v4 as uuidv4 } from "uuid";

export const addUser = async (userData) => {
  try {
    userData["userId"] = uuidv4(); // Generate a UUID
    await UserModel.createUser(userData);
    return { userId: userData["userId"], userName: userData.userName };
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};

export const getUser = async (identifier, type) => {
  try {
    let user;
    if (type === "userName") {
      user = await UserModel.findUserById(identifier);
    } else if (type === "userId") {
      user = await UserModel.findUserByUsername(identifier);
    } else {
      throw new Error("Invalid type specified");
    }
    return user;
  } catch (error) {
    return null;
  }
};

export const fetchAllUsers = async () => {
  try {
    const users = await UserModel.findAllUsers();
    return users;
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};
