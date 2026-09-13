import express from "express";

import {
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from "../controllers/facultyController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFaculty);

router.post("/", protect, createFaculty);

router.put("/:id", protect, updateFaculty);

router.delete("/:id", protect, deleteFaculty);

export default router;