import express from "express";

import {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public - Contact form
router.post("/", createMessage);

// Admin
router.get("/", protect, getMessages);

router.get("/:id", protect, getMessageById);

router.put("/:id", protect, updateMessage);

router.delete("/:id", protect, deleteMessage);

export default router;