import express from "express";

import {
  createContact,
  getContacts,
  markContactAsRead,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// =====================================================
// PUBLIC CONTACT FORM
// =====================================================

router.post("/", createContact);

// =====================================================
// CONTACT MESSAGES
// =====================================================

router.get("/", getContacts);

router.patch(
  "/:id/read",
  markContactAsRead
);

router.delete(
  "/:id",
  deleteContact
);

export default router;