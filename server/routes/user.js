import express from "express";
import { addUser, getUser } from "../db/models/user/userServices.js";
const router = express.Router();

// Read: (get user id from username)
router.get("/userid", async (req, res) => {
  const { username } = req.query;
  try {
    const user = await getUser(username, "userId");

    res.json(user._id);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read (get username from userId)
router.get("/username", async (req, res) => {
  const { userid } = req.query;
  try {
    const user = await getUser(userid, "userName");
    res.json(user.userName);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { firebaseUserId, userName } = req.body;
    if (!firebaseUserId) {
      return res.status(400).send("Firebase User ID is required");
    }
    const result = await addUser({ firebaseUserId, userName });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send("Failed to create user: " + error.message);
    console.error("Failed to create user: ", error);
  }
});

export default router;
