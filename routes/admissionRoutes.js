import express from "express";

import {
  createAdmission,
  getAdmissions,
  updateAdmissionStatus,
} from "../controllers/admissionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ======================================
// PUBLIC ADMISSION FORM
// ======================================

router.post("/", createAdmission);


// ======================================
// ADMIN ADMISSIONS
// ======================================

router.get("/", protect, getAdmissions);


// ======================================
// APPROVE / DECLINE
// ======================================

router.put(
  "/:id/status",
  protect,
  updateAdmissionStatus
);


export default router;