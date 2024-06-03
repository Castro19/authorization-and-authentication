import express from "express";
// prettier-ignore
import {
  addSecret,        // Create
  fetchUserSecrets, // Read
  updateSecret,     // Update
  deleteSecret,     // Delete
} from "../db/models/secret/secretServices.js";
import { hasPermissionForSecret } from "../helpers/generateJWT.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create a secret
router.post("/", async (req, res) => {
  try {
    const { userId, userName, title, description, permissions, privacy } =
      req.body;
    if (!userId) {
      return res.status(400).send("Firebase Secret ID is required");
    }
    const result = await addSecret({
      userId,
      userName,
      title,
      description,
      permissions,
      privacy,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send("Failed to create Secret: " + error.message);
    console.error("Failed to create Secret: ", error);
  }
});

// Read: Fetch all Secrets
router.get("/:userName", async (req, res) => {
  const userName = req.params.userName;
  try {
    const secrets = await fetchUserSecrets(userName);
    // console.log("SECRETS FETCHED: ", secrets);
    res.json(secrets);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update a Secret
router.put("/:secretId", async (req, res) => {
  const secretId = req.params.secretId;
  const { title, description } = req.body;
  // Get the user ID of the user making the request
  const { userId } = req.user;
  try {
    // Check if the user making the request has "admin" privileges
    const isAuthorized = await hasPermissionForSecret(userId, secretId, [
      "admin",
      "editor",
    ]);
    if (!isAuthorized) {
      return res.status(403).json({
        message: "Access denied. You do not have the necessary permissions.",
        code: 403,
      });
    }

    const response = await updateSecret(userId, secretId, title, description);
    res.send(response);
  } catch (error) {
    res.status(500).send("Failed to Update Secret: " + error.message);
    console.error("Failed to Update Secret: ", error);
  }
});

// Delete a Secret
router.delete("/:secretId", async (req, res) => {
  console.log("params: ", req.params);
  const { secretId } = req.params;
  const { userId } = req.user;
  try {
    console.log("secret id: ", secretId);
    const isAuthorized = await hasPermissionForSecret(userId, secretId, [
      "admin",
    ]);
    if (!isAuthorized) {
      return res.status(403).json({
        message: "Access denied. You do not have the necessary permissions.",
        code: 403,
      });
    }

    const result = await deleteSecret(userId, secretId);
    res.send({ result: result });
  } catch (error) {
    res.status(500).send("Failed to Delete Secret: " + error.message);
    console.error("Failed to Delete Secret: ", error);
  }
});

export default router;
