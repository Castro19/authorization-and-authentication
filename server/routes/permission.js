import express from "express";
import {
  managePermission,
  getPermissions,
} from "../db/models/permission/permissionServices.js";
const router = express.Router();

const roles = ["admin", "viewer"];

router.get("/:secretId", async (req, res) => {
  const { secretId } = req.params;
  try {
    const permissions = await getPermissions(secretId);
    res.json(permissions);
  } catch (error) {
    res.status(500).send("Failed to fecth  Permissions: " + error.message);
    console.error("Failed to fecth Permissions: ", error);
  }
});

router.post("/", async (req, res) => {
  const permissionData = req.body;
  try {
    await managePermission(permissionData, "upsert");
    res.json({
      message: "Permissions Post is working",
    });
  } catch (error) {
    res.status(500).send("Failed to create Permission: " + error.message);
    console.error("Failed to create Permission: ", error);
  }
});

router.delete("/", async (req, res) => {
  const permissionData = req.body;
  try {
    await managePermission(permissionData, "delete");
    res.json({
      message: "Permissions Delete is working",
    });
  } catch (error) {
    res.status(500).send("Failed to create Permission: " + error.message);
    console.error("Failed to create Permission: ", error);
  }
});

export default router;
