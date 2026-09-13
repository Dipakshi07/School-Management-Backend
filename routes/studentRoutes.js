import express from "express";

import {
  getStudentProfile,
  getStudentDashboard,
  updateStudentProfile
} from "../controllers/studentController.js";

import authMiddleware
  from "../middleware/authMiddleware.js";

import roleMiddleware
  from "../middleware/roleMiddleware.js";


const router =
  express.Router();


router.get(
  "/dashboard",

  authMiddleware,

  roleMiddleware("student"),

  getStudentDashboard
);


router.get(
  "/profile",

  authMiddleware,

  roleMiddleware("student"),

  getStudentProfile
);


router.put(
  "/profile",

  authMiddleware,

  roleMiddleware("student"),

  updateStudentProfile
);


export default router;