
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Campus",
        "Activities",
        "Sports",
        "Events",
      ],
      required: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model(
  "Gallery",
  gallerySchema
);

export default Gallery;
