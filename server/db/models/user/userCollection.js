import db from "../../connection.js";
const userCollection = db.collection("users");

// Create
export const createUser = async (userData) => {
  try {
    const newUser = {
      userId: userData.userId,
      userName: userData.userName,
      hashedPassword: userData.hashedPassword,
    };

    await userCollection.insertOne(newUser);
  } catch (error) {
    throw new Error("Error creating a new user: " + error.message);
  }
};

// Read
export const findUserById = async (userId) => {
  try {
    const userDocument = await userCollection.findOne({ userId: userId });
    if (!userDocument) {
      throw new Error("No user found with ID: " + userId);
    }
    return userDocument;
  } catch (error) {
    throw new Error("Error retrieving user by ID: " + error.message);
  }
};

// Read
export const findUserByUsername = async (username) => {
  try {
    const userDocument = await userCollection.findOne({ userName: username });
    if (!userDocument) {
      throw new Error("No user found with username: " + username);
    }
    return userDocument;
  } catch (error) {
    throw new Error("Error retrieving user by username: " + error.message);
  }
};
