import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    className: {
      type: String,
      required: true,
      trim: true
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

    dateOfBirth: {
      type: Date
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other"
    },

    fatherName: {
      type: String,
      default: ""
    },

    motherName: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      default: ""
    },

    attendance: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Student",
  studentSchema
);