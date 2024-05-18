import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_KEY,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Authorization denied." });
  } else {
    jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          token_secret: process.env.TOKEN_KEY,
          test: "HELLO",
          token: token,
          message: "Token is not valid.",
        });
      } else {
        req.user = decoded; // Assign decoded user to request object
        next();
      }
    });
  }
}
