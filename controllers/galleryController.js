
import mongoose from "mongoose";
import Gallery from "../models/Gallery.js";

// ==========================================
// GET ALL GALLERY IMAGES
// PUBLIC
// ==========================================

export const getGalleryImages = async (
  req,
  res
) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: gallery.length,
      gallery,
    });
  } catch (error) {
    console.error(
      "Get Gallery Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
      error: error.message,
    });
  }
};


// ==========================================
// GET SINGLE IMAGE
// PUBLIC
// ==========================================

export const getGalleryImageById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery image ID",
      });
    }

    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    res.status(200).json({
      success: true,
      image,
    });
  } catch (error) {
    console.error(
      "Get Gallery Image Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch gallery image",
      error: error.message,
    });
  }
};


// ==========================================
// ADD GALLERY IMAGE
// ADMIN ONLY
// ==========================================

export const createGalleryImage = async (
  req,
  res
) => {
  try {
    const {
      title,
      category,
      image,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Image title is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Image category is required",
      });
    }

    if (!image?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    const galleryImage =
      await Gallery.create({
        title: title.trim(),
        category,
        image: image.trim(),
      });

    res.status(201).json({
      success: true,
      message:
        "Gallery image added successfully",
      galleryImage,
    });
  } catch (error) {
    console.error(
      "Create Gallery Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to add gallery image",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE GALLERY IMAGE
// ADMIN ONLY
// ==========================================

export const updateGalleryImage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery image ID",
      });
    }

    const {
      title,
      category,
      image,
    } = req.body;

    const updatedImage =
      await Gallery.findByIdAndUpdate(
        id,
        {
          ...(title !== undefined && {
            title: title.trim(),
          }),

          ...(category !== undefined && {
            category,
          }),

          ...(image !== undefined && {
            image: image.trim(),
          }),
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedImage) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Gallery image updated successfully",
      galleryImage: updatedImage,
    });
  } catch (error) {
    console.error(
      "Update Gallery Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update gallery image",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE GALLERY IMAGE
// ADMIN ONLY
// ==========================================

export const deleteGalleryImage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery image ID",
      });
    }

    const deletedImage =
      await Gallery.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Gallery Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete gallery image",
    });
  }
};
