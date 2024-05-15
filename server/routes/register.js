import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
import { addUser, getUser } from "../db/models/user/userServices.js";
// import generateAccessToken from "../helpers/generateJWT.js";

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/signup", async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).send("Username and password required");
  }
  // Check for the following and assign an `error.code` if:
  // 1. if username is already taken "auth/username-already-in-use"
  // 2. weak password "auth/weak-password"
  // 3. else another error
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await addUser({ userName, hashedPassword });
    // Create the JWT
    const token = jwt.sign(
      { userName: userName, userId: user.userId },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Failed to create user: " + error.message);
    console.error("Failed to create user: ", error);
  }
});

// routes/user.js
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await getUser(userName, "userId");
    if (!user) {
      return res.status(401).json({
        code: "auth/user-not-found",
        message: "No user found with this username.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (isMatch) {
      const token = jwt.sign(
        { userName: userName, userId: user.userId },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res
        .status(200)
        .json({ userId: user.userId, userName: user.userName, token: token });
    } else {
      return res.status(401).json({
        code: "auth/invalid-credential",
        message: "Invalid credentials provided.",
      });
    }
  } catch (error) {
    console.error("Login error:", error); // Logging the error can help in debugging
    return res
      .status(500)
      .json({ code: "server-error", message: "Error authenticating user." });
  }
});

router.get("/verifyToken", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // Optionally add more checks here (e.g., check if the user exists in the database)
    return res.status(200).json({
      isValid: true,
      userId: decoded.userId,
      userName: decoded.userName,
    });
  });
});

export default router;
