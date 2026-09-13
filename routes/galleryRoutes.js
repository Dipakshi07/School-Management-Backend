
import express from "express";

import {
  getGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// PUBLIC ROUTES
// ==========================================

router.get("/", getGalleryImages);

router.get(
  "/:id",
  getGalleryImageById
);


// ==========================================
// ADMIN ROUTES
// ==========================================

router.post(
  "/",
  protect,
  createGalleryImage
);

router.put(
  "/:id",
  protect,
  updateGalleryImage
);

router.delete(
  "/:id",
  protect,
  deleteGalleryImage
);


export default router;