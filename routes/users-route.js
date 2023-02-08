import express from "express";
import { getUser, updateUser } from "../controllers/users-controller.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);

export default router;