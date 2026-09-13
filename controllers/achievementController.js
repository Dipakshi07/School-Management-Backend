import mongoose from "mongoose";
import Achievement from "../models/Achievement.js";

// ==========================================
// GET ALL ACHIEVEMENTS - PUBLIC
// ==========================================

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: achievements.length,
      achievements,
    });
  } catch (error) {
    console.error("Get Achievements Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch achievements",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE ACHIEVEMENT
// ==========================================

export const getAchievementById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid achievement ID",
      });
    }

    const achievement = await Achievement.findById(id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      achievement,
    });
  } catch (error) {
    console.error(
      "Get Achievement Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch achievement",
      error: error.message,
    });
  }
};

// ==========================================
// CREATE ACHIEVEMENT - ADMIN
// ==========================================

export const createAchievement = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      year,
      icon,
      image,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Achievement title is required",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Achievement description is required",
      });
    }

    if (!year?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Achievement year is required",
      });
    }

    const achievement = await Achievement.create({
      title: title.trim(),
      description: description.trim(),
      category: category || "Other",
      year: year.trim(),
      icon: icon?.trim() || "Trophy",
      image: image?.trim() || "",
    });

    res.status(201).json({
      success: true,
      message: "Achievement added successfully",
      achievement,
    });
  } catch (error) {
    console.error(
      "Create Achievement Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create achievement",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE ACHIEVEMENT - ADMIN
// ==========================================

export const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid achievement ID",
      });
    }

    const {
      title,
      description,
      category,
      year,
      icon,
      image,
    } = req.body;

    const updatedAchievement =
      await Achievement.findByIdAndUpdate(
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

          ...(year !== undefined && {
            year: year.trim(),
          }),

          ...(icon !== undefined && {
            icon: icon?.trim() || "Trophy",
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

    if (!updatedAchievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      achievement: updatedAchievement,
    });
  } catch (error) {
    console.error(
      "Update Achievement Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update achievement",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE ACHIEVEMENT - ADMIN
// ==========================================

export const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid achievement ID",
      });
    }

    const deletedAchievement =
      await Achievement.findByIdAndDelete(id);

    if (!deletedAchievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Achievement Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete achievement",
      error: error.message,
    });
  }
};