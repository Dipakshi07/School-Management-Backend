import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    details: {
      type: String,
      default: "",
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      default: ""
    },

    venue: {
      type: String,
      default: ""
    },

    lastDate: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      default: "Announcement",
      trim: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Notice", noticeSchema);