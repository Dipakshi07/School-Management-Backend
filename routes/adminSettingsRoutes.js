
import express from "express";

import {
  getAdminSettings,
  updateAdminSettings,
  changeAdminPassword,
} from "../controllers/adminSettingsController.js";

import { protect } from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* =========================================================
   GET ADMIN SETTINGS
========================================================= */

router.get(
  "/",
  protect,
  adminMiddleware,
  getAdminSettings
);


/* =========================================================
   UPDATE ADMIN SETTINGS
========================================================= */

router.put(
  "/",
  protect,
  adminMiddleware,
  updateAdminSettings
);


/* =========================================================
   CHANGE ADMIN PASSWORD
========================================================= */

router.put(
  "/password",
  protect,
  adminMiddleware,
  changeAdminPassword
);

export default router;
