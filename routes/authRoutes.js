import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// Register
router.post(
  "/register",
  registerUser
);


// Login
router.post(
  "/login",
  loginUser
);


// Current user
router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);


export default router;