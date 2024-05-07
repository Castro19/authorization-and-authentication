import express from "express";
// prettier-ignore
import {
  addSecret,        // Create
  fetchUserSecrets, // Read
  updateSecret,     // Update
  deleteSecret,     // Delete
} from "../db/models/secret/secretServices.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create a secret
router.post("/", async (req, res) => {
  try {
    const { userId, userName, title, description } = req.body;
    if (!userId) {
      return res.status(400).send("Firebase Secret ID is required");
    }
    const result = await addSecret({ userId, userName, title, description });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send("Failed to create Secret: " + error.message);
    console.error("Failed to create Secret: ", error);
  }
});

// Read: Fetch all Secrets
router.get("/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const secrets = await fetchUserSecrets(userName);
    res.json(secrets);
  } catch (error) {
    res.send({ message: error });
  }
});

// Update a Secret
router.put("/:secretId", async (req, res) => {
  try {
    const secretId = req.params.secretId;
    const { userId, title, description } = req.body;
    const response = await updateSecret(userId, secretId, title, description);
    res.send(response);
  } catch (error) {
    res.status(500).send("Failed to Update Secret: " + error.message);
    console.error("Failed to Update Secret: ", error);
  }
});

// Delete a Secret
router.delete("/:secretId", async (req, res) => {
  try {
    const id = req.params.secretId;
    const [userId, secretId] = id.split("_");

    console.log("USERID: ", userId);
    console.log("SECRETID: ", secretId);
    const result = await deleteSecret(userId, secretId);
    res.send({ result: result });
  } catch (error) {
    res.status(500).send("Failed to Delete Secret: " + error.message);
    console.error("Failed to Delete Secret: ", error);
  }
});

// Helpers:

export default router;
