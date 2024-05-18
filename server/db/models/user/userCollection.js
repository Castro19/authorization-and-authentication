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

export const findAllUsers = async () => {
  try {
    const userDocuments = await userCollection
      .find({}, { projection: { userId: 1, userName: 1 } })
      .toArray();
    if (!userDocuments || userDocuments.length === 0) {
      throw new Error("No users found");
    }
    // Transform the documents to return an array of objects with 'userID' and 'userName'
    const users = userDocuments.map((doc) => ({
      userId: doc.userId, // Assuming _id is the field for userID
      userName: doc.userName,
    }));
    return users;
  } catch (error) {
    throw new Error("Error retrieving users: " + error.message);
  }
};
