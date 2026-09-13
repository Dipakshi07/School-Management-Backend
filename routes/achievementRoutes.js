import express from "express";

import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getAchievements);

router.get("/:id", getAchievementById);

// ADMIN
router.post("/", protect, createAchievement);

router.put("/:id", protect, updateAchievement);

router.delete("/:id", protect, deleteAchievement);

export default router;