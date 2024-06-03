import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findSecret } from "../db/models/secret/secretServices.js";
dotenv.config();

export default function generateAccessToken(username) {
  const userId = getUser(username, "userId");
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userId },
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
          message: "Token is not valid.",
        });
      } else {
        req.user = decoded; // Assign decoded user to request object
        next();
      }
    });
  }
}

// Helper function to check user permissions for a specific secret
export async function hasPermissionForSecret(userId, secretId, requiredRoles) {
  console.log("userid making req: ", userId);
  console.log("secret id: ", secretId);
  console.log("REQ roles: ", requiredRoles);
  // Fetch the secret object from the database
  const secret = await findSecret(secretId);

  if (!secret) {
    return false; // Secret not found
  }

  const userPermissions = secret.permissions.find((p) => p.userId === userId);
  console.log("user perms: ", userPermissions);

  if (!userPermissions) {
    return false; // No permissions found for this user
  }
  // console.log("HMMM: ");
  // Return true or false whether the user has the required roles
  return requiredRoles.some((role) => userPermissions.roles.includes(role));
}
