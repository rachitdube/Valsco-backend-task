import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../src/middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

export default router;
