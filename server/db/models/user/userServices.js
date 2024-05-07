import * as UserModel from "./userCollection.js";

export const addUser = async (userData) => {
  try {
    console.log("User data: ", userData);
    const result = await UserModel.createUser(userData);
    return { message: "User created successfully", userId: result.insertedId };
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
    throw new Error("Service error: " + error.message);
  }
};
