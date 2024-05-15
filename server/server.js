import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Routes:
import registers from "./routes/register.js";
import users from "./routes/user.js";
import secrets from "./routes/secret.js";

// Helpers
import { authenticateUser } from "./helpers/generateJWT.js";
const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes;
app.use("/registers", registers);
app.use("/users", users);
app.use("/secrets", secrets);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
