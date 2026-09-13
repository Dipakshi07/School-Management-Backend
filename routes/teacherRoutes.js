import express from "express";

import {
  getTeacherProfile,
  getTeacherDashboard,
  getTeacherStudents
} from "../controllers/teacherController.js";

import authMiddleware
  from "../middleware/authMiddleware.js";

import roleMiddleware
  from "../middleware/roleMiddleware.js";


const router =
  express.Router();


router.get(
  "/dashboard",

  authMiddleware,

  roleMiddleware("teacher"),

  getTeacherDashboard
);


router.get(
  "/profile",

  authMiddleware,

  roleMiddleware("teacher"),

  getTeacherProfile
);


router.get(
  "/students",

  authMiddleware,

  roleMiddleware("teacher"),

  getTeacherStudents
);


export default router;