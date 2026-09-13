import mongoose from "mongoose";
import News from "../models/News.js";

/*
|--------------------------------------------------------------------------
| GET ALL NEWS
|--------------------------------------------------------------------------
| Public API
| Main website isi API se news fetch karegi.
| Latest news sabse pehle show hogi.
*/

export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({
      createdAt: -1,
    });

    res.status(200).json(news);
  } catch (error) {
    console.error("Get News Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch news",
      error: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| CREATE NEWS
|--------------------------------------------------------------------------
| Protected API
| Sirf logged-in admin news add kar sakta hai.
*/

export const createNews = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      image,
    } = req.body;

    // Required field validation
    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "News title is required",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "News description is required",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "News date is required",
      });
    }

    const news = await News.create({
      title: title.trim(),
      description: description.trim(),
      category: category || "School News",
      date,
      image: image?.trim() || "",
    });

    res.status(201).json({
      success: true,
      message: "News added successfully",
      news,
    });
  } catch (error) {
    console.error("Create News Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create news",
      error: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| UPDATE NEWS
|--------------------------------------------------------------------------
| Protected API
*/

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Check MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID",
      });
    }

    const {
      title,
      description,
      category,
      date,
      image,
    } = req.body;

    const updatedNews = await News.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined && {
          title: title.trim(),
        }),

        ...(description !== undefined && {
          description: description.trim(),
        }),

        ...(category !== undefined && {
          category,
        }),

        ...(date !== undefined && {
          date,
        }),

        ...(image !== undefined && {
          image: image?.trim() || "",
        }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      news: updatedNews,
    });
  } catch (error) {
    console.error("Update News Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update news",
      error: error.message,
    });
  }
};


/*
|--------------------------------------------------------------------------
| DELETE NEWS
|--------------------------------------------------------------------------
| Protected API
*/

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Check MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID",
      });
    }

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("Delete News Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete news",
      error: error.message,
    });
  }
};