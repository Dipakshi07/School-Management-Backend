import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String
    },

    location: {
      type: String
    },

    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Event", eventSchema);