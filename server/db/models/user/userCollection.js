import db from "../../connection.js";
const userCollection = db.collection("users");

// Create
export const createUser = async (userData) => {
  console.log("USER DATA on UserModeL: ", userData);
  try {
    const newUser = {
      _id: userData.firebaseUserId, // Use Firebase ID as MongoDB document ID
      userName: userData.userName,
    };

    const result = await userCollection.insertOne(newUser);
    return result;
  } catch (error) {
    throw new Error("Error creating a new user: " + error.message);
  }
};

// Read
export const findUserById = async (userId) => {
  try {
    const userDocument = await userCollection.findOne({ _id: userId });
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
