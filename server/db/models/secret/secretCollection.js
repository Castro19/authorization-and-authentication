import db from "../../connection.js";
import { ObjectId } from "mongodb"; // Make sure this matches your import setup

const secretCollection = db.collection("secrets");
const userCollection = db.collection("users");

export const createSecret = async (secretData) => {
  console.log("USER DATA on SecretModeL: ", secretData);
  try {
    const newSecret = {
      _id: secretData.secretId,
      userId: secretData.userId,
      userName: secretData.userName,
      title: secretData.title,
      description: secretData.description,
      permissions: [{ userId: secretData.userId, roles: ["admin"] }],
    };

    const result = await secretCollection.insertOne(newSecret);
    return result;
  } catch (error) {
    throw new Error("Error creating a new secret: " + error.message);
  }
};

export const getSecretsByUserName = async (userName) => {
  try {
    const query = {
      $or: [{ userName: userName }, { "permissions.userName": userName }],
    };
    const secrets = await secretCollection.find(query).toArray();

    return secrets;
  } catch (error) {
    throw new Error("Error Fetching Secrets: " + error.message);
  }
};

export const getSecretsByUserId = async (userId) => {
  console.log("USER ID: ", userId);
  try {
    const query = {
      $or: [{ userId: userId }, { "permissions.userId": userId }],
    };
    const secrets = await secretCollection.find(query).toArray();

    return secrets;
  } catch (error) {
    throw new Error("Error Fetching Secrets: " + error.message);
  }
};

export const deleteSecretByIds = async (userId, secretId) => {
  try {
    const result = await secretCollection.deleteOne({
      _id: new ObjectId(secretId), // Correct way to convert string to ObjectId
      userId: userId, // Ensuring that the user initiating the delete is the owner
    });
    if (result.deletedCount === 0) {
      throw new Error(
        "No secret found with the provided ID, or you do not have permission to delete this secret."
      );
    }
    return result;
  } catch (error) {
    throw new Error("Error Deleting Secret: " + error.message);
  }
};

export const updateSecretByIds = async (
  userId,
  secretId,
  title,
  description
) => {
  try {
    const result = await secretCollection.updateOne(
      {
        _id: new ObjectId(secretId), // Convert string ID to ObjectId
        userId: userId, // Ensure only the owner can update
      },
      {
        $set: {
          title: title,
          description: description,
        },
      }
    );

    if (result.matchedCount === 0) {
      throw new Error(
        "No secret found with the provided ID, or you do not have permission to update this secret."
      );
    }

    return result;
  } catch (error) {
    throw new Error("Error Updating Secret: " + error.message);
  }
};
