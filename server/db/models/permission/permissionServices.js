import * as secretsModel from "./permissionCollection.js";

export const managePermission = async (permissionData, operation) => {
  try {
    await secretsModel.modifyPermission(permissionData, operation);
  } catch (error) {
    throw new Error("Service error for modifyPermission: " + error.message);
  }
};

export const getPermissions = async (secretId) => {
  try {
    return await secretsModel.getPermissionsBySecretId(secretId);
  } catch (error) {
    throw new Error("Service error for getPermissions: " + error.message);
  }
};
