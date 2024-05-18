import express from "express";
const router = express.Router();
import { fetchAllUsers } from "../db/models/user/userServices.js";
router.get("/", async (req, res) => {
  const users = await fetchAllUsers();
  res.status(200).json({ message: "Fetch all Users is working", users: users });
});

export default router;

// // Read: (get user id from username)
// router.get("/userid", async (req, res) => {
//   const { username } = req.query;
//   try {
//     const user = await getUser(username, "userId");

//     res.json(user._id);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Read (get username from userId)
// router.get("/username", async (req, res) => {
//   const { userid } = req.query;
//   try {
//     const user = await getUser(userid, "userName");
//     res.json(user.userName);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
