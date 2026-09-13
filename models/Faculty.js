import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    designation: {
      type: String,
      required: true
    },

    subject: {
      type: String
    },

    qualification: {
      type: String
    },

    experience: {
      type: String
    },

    image: {
      type: String
    },

    bio: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Faculty", facultySchema);