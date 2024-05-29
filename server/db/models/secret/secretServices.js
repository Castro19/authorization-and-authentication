import * as SecretModel from "./secretCollection.js";
import * as UserModel from "../user/userCollection.js";

// Create
export const addSecret = async (secretData) => {
  try {
    console.log("Secret data: ", secretData);
    const result = await SecretModel.createSecret(secretData);
    return {
      message: "Secret created successfully",
      secretId: result.insertedId,
    };
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};

export const findSecret = async (secretId) => {
  try {
    return await SecretModel.getSecret(secretId);
  } catch (error) {
    throw new Error("Service error Fetching Secrets: " + error.message);
  }
};
// Read
export const fetchUserSecrets = async (userName) => {
  try {
    const user = await UserModel.findUserByUsername(userName);
    const secrets = await SecretModel.getSecretsByUserId(user.userId);
    const modifiedSecrets = secrets.map((secret) => ({
      secretId: secret._id,
      userId: secret.userId,
      userName: secret.userName,
      title: secret.title,
      description: secret.description,
      role: secret.permissions.find((perm) => perm.userId === user.userId)
        .roles,
    }));
    // console.log("MODIFED SECRETS: ", modifiedSecrets);
    return modifiedSecrets;
  } catch (error) {
    throw new Error("Service error Fetching Secrets: " + error.message);
  }
};

// Update
export const updateSecret = async (userId, secretId, title, description) => {
  try {
    const result = await SecretModel.updateSecretByIds(
      userId,
      secretId,
      title,
      description
    );
    return {
      message: "Secret successfully updated",
      secretId: secretId,
      title: title,
      description: description,
      result: result, // This could include additional details like the number of documents updated
    };
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};

// Delete
export const deleteSecret = async (userId, secretId) => {
  try {
    const result = await SecretModel.deleteSecretByIds(userId, secretId);
    return { message: "Secret successfully deleted", result };
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};

// Helpers:

// Fetch User Id given username
