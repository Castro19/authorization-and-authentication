import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Routes:
import users from "./routes/user.js";
import secrets from "./routes/secret.js";

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes;
app.use("/users", users);
app.use("/secrets", secrets);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
