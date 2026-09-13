import express from "express";

import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTE
|--------------------------------------------------------------------------
| Main website is route se latest news fetch karegi.
| Login/token ki zarurat nahi hai.
*/
router.get("/", getNews);

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
| Admin Dashboard se news add/update/delete karne ke liye
| authentication required hai.
*/

router.post("/", protect, createNews);

router.put("/:id", protect, updateNews);

router.delete("/:id", protect, deleteNews);

export default router;