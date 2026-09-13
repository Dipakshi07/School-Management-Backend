import express from "express";

import {
  getAdminDashboard,

  // Students
  getAllStudents,
  createStudent,
  deleteStudent,

  // Teachers
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,

  // Admissions
  getAdmissions,
  updateAdmissionStatus,

  // Event Registrations
  getEventRegistrations,
  deleteEventRegistration,

  // Contact Messages
  getContacts,
  updateContactStatus,
  deleteContact,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// =====================================================
// ADMIN DASHBOARD
// =====================================================

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  getAdminDashboard
);

// =====================================================
// STUDENTS
// =====================================================

router.get(
  "/students",
  authMiddleware,
  roleMiddleware("admin"),
  getAllStudents
);

router.post(
  "/students",
  authMiddleware,
  roleMiddleware("admin"),
  createStudent
);

router.delete(
  "/students/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteStudent
);

// =====================================================
// TEACHERS
// =====================================================

router.get(
  "/teachers",
  authMiddleware,
  roleMiddleware("admin"),
  getAllTeachers
);

router.post(
  "/teachers",
  authMiddleware,
  roleMiddleware("admin"),
  createTeacher
);

router.put(
  "/teachers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateTeacher
);

router.delete(
  "/teachers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteTeacher
);

// =====================================================
// ADMISSIONS
// =====================================================

router.get(
  "/admissions",
  authMiddleware,
  roleMiddleware("admin"),
  getAdmissions
);

router.put(
  "/admissions/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateAdmissionStatus
);

// =====================================================
// EVENT REGISTRATIONS
// =====================================================

router.get(
  "/event-registrations",
  authMiddleware,
  roleMiddleware("admin"),
  getEventRegistrations
);

router.delete(
  "/event-registrations/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteEventRegistration
);

// =====================================================
// CONTACT MESSAGES
// =====================================================

// Get all contact messages
router.get(
  "/contacts",
  authMiddleware,
  roleMiddleware("admin"),
  getContacts
);

// Mark message read/unread
router.put(
  "/contacts/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateContactStatus
);

// Delete contact message
router.delete(
  "/contacts/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteContact
);

// =====================================================
// EXPORT
// =====================================================

export default router;