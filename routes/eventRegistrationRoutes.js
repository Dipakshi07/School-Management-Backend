import express from "express";

import {
  registerForEvent,
  getAllEventRegistrations,
  getEventRegistrationById,
  deleteEventRegistration,
} from "../controllers/eventRegistrationController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ============================================
// PUBLIC
// ============================================

// Student website se event registration
router.post(
  "/",
  registerForEvent
);


// ============================================
// ADMIN
// ============================================

// Get all registrations
router.get(
  "/",
  protect,
  getAllEventRegistrations
);


// Get single registration
router.get(
  "/:id",
  protect,
  getEventRegistrationById
);


// Delete registration
router.delete(
  "/:id",
  protect,
  deleteEventRegistration
);

export default router;