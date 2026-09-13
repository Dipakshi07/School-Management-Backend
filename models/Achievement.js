import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Academic",
        "Sports",
        "Cultural",
        "Award",
        "Competition",
        "Other",
      ],
      default: "Other",
    },

    year: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "Trophy",
      trim: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model(
  "Achievement",
  achievementSchema
);

export default Achievement;