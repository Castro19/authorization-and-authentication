import express from "express";
import {
  managePermission,
  getPermissions,
} from "../db/models/permission/permissionServices.js";
import { hasPermissionForSecret } from "../helpers/generateJWT.js";
const router = express.Router();

router.get("/:secretId", async (req, res) => {
  const { userId } = req.user;
  const { secretId } = req.params;
  try {
    // Check if the user making the request has "viewer" privileges or higher
    const isAuthorized = await hasPermissionForSecret(userId, secretId, [
      "admin",
      "editor",
      "viewer",
    ]);
    if (!isAuthorized) {
      return res.status(403).json({
        message: "Access denied. You do not have the necessary permissions.",
      });
    }
    const permissions = await getPermissions(secretId);
    res.json(permissions);
  } catch (error) {
    res.status(500).send("Failed to fecth  Permissions: " + error.message);
    console.error("Failed to fecth Permissions: ", error);
  }
});

// Create Permissions for the Secret
router.post("/", async (req, res) => {
  // Get the list of permissions: [{userId, roles: []}, ...]
  const permissionData = req.body;
  // Get the user ID of the user making the request
  const { userId } = req.user;
  try {
    // Check if the user making the request has "admin" privileges
    const isAuthorized = await hasPermissionForSecret(
      userId,
      permissionData.secretId,
      ["admin"]
    );
    if (!isAuthorized) {
      return res.status(403).json({
        message: "Access denied. You do not have the necessary permissions.",
        code: 403,
      });
    }
    // If we get here, the user has admin privilegs so make the change to the database to modify the secret's permissions
    await managePermission(permissionData, "upsert"); // Include the user making the request
    res.json({ message: "Permissions updated successfully", code: 201 });
  } catch (error) {
    res.status(500).send("Failed to update Permission: " + error.message);
    console.error("Failed to update Permission: ", error);
  }
});

router.delete("/", async (req, res) => {
  const permissionData = req.body;
  const { userId } = req.user;
  try {
    // Check if the user making the request has "admin" privileges
    const isAuthorized = await hasPermissionForSecret(
      userId,
      permissionData.secretId,
      ["admin"]
    );
    if (!isAuthorized) {
      return res.status(403).json({
        message: "Access denied. You do not have the necessary permissions.",
        code: 403,
      });
    }
    await managePermission(permissionData, "delete");
    res.json({ message: "Permissions deleted successfully", code: 202 });
  } catch (error) {
    res.status(500).send("Failed to delete Permission: " + error.message);
    console.error("Failed to delete Permission: ", error);
  }
});
export default router;
