import db from "../../connection.js";

import { ObjectId } from "mongodb"; // Make sure this matches your import setup

const secretCollection = db.collection("secrets");

export const modifyPermission = async (permissionData, operation) => {
  const { userId, secretId, roles } = permissionData;

  try {
    if (operation === "delete") {
      // Delete the permission for the given userId and secretId
      await secretCollection.updateOne(
        { _id: new ObjectId(secretId) },
        { $pull: { permissions: { userId } } }
      );
    } else if (operation === "upsert") {
      // Find the secret by its ID
      const filter = {
        _id: new ObjectId(secretId),
        "permissions.userId": userId,
      };

      // Check if the permission already exists for the user
      const existingSecret = await secretCollection.findOne(filter);

      if (existingSecret) {
        // Update the existing permission roles for the user
        await secretCollection.updateOne(filter, {
          $set: { "permissions.$.roles": roles },
        });
      } else {
        // Add a new permission entry for the user
        await secretCollection.updateOne(
          { _id: new ObjectId(secretId) },
          { $push: { permissions: { userId, roles } } }
        );
      }
    } else {
      throw new Error("Invalid operation type. Must be 'upsert' or 'delete'.");
    }
  } catch (error) {
    throw new Error(`Error modifying Permission: ${error.message}`);
  }
};

export const getPermissionsBySecretId = async (secreId) => {
  try {
    const secret = await secretCollection.findOne(
      { _id: new ObjectId(secreId) },
      { projection: { permissions: 1 } }
    );
    if (!secret) {
      throw new Error("Secret not found");
    }

    // Return the permissions array
    return secret.permissions;
  } catch (error) {
    throw new Error(`Failed to get permissions: ${error.message}`);
  }
};
