import mongoose from "mongoose";

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true
    },

    eventTitle: {
      type: String,
      required: true
    },

    studentName: {
      type: String,
      required: true,
      trim: true
    },

    className: {
      type: String,
      required: true
    },

    section: {
      type: String,
      required: true,
      trim: true
    },

    rollNumber: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);