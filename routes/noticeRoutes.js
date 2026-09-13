import express from "express";

import {
  getNotices,
  getAllNotices,
  createNotice,
  updateNotice,
  deleteNotice
} from "../controllers/noticeController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();


/* ================================
   MAIN WEBSITE
================================ */

router.get("/", getNotices);


/* ================================
   ADMIN - GET ALL
================================ */

router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware("admin"),
  getAllNotices
);


/* ================================
   ADMIN - CREATE
================================ */

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createNotice
);


/* ================================
   ADMIN - UPDATE
================================ */

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateNotice
);


/* ================================
   ADMIN - DELETE
================================ */

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteNotice
);

export default router;