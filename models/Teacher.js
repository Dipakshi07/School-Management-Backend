import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    qualification: {
      type: String,
      default: ""
    },

    experience: {
      type: Number,
      default: 0
    },

    department: {
      type: String,
      default: ""
    },

    assignedClasses: [
      {
        className: String,
        section: String
      }
    ],

    joiningDate: {
      type: Date
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
  "Teacher",
  teacherSchema
);