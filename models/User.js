import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student"
    },

    phone: {
      type: String,
      default: ""
    },

    profileImage: {
      type: String,
      default: ""
    },

    className: {
      type: String,
      default: ""
    },

    section: {
      type: String,
      default: ""
    },

    rollNumber: {
      type: String,
      default: ""
    },

    employeeId: {
      type: String,
      default: ""
    },

    subject: {
      type: String,
      default: ""
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

const User = mongoose.model("User", userSchema);

export default User;