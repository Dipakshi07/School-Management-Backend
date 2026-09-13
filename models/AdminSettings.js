
import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    profile: {
      name: {
        type: String,
        default: "School Administrator",
      },

      email: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      role: {
        type: String,
        default: "Administrator",
      },
    },

    school: {
      schoolName: {
        type: String,
        default: "Bright Future International School",
      },

      email: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },

      academicSession: {
        type: String,
        default: "2026-27",
      },

      principalName: {
        type: String,
        default: "",
      },

      website: {
        type: String,
        default: "",
      },
    },

    notifications: {
      newAdmission: {
        type: Boolean,
        default: true,
      },

      newMessage: {
        type: Boolean,
        default: true,
      },

      eventRegistration: {
        type: Boolean,
        default: true,
      },

      newContact: {
        type: Boolean,
        default: true,
      },

      newsletter: {
        type: Boolean,
        default: false,
      },
    },

    website: {
      websiteEnabled: {
        type: Boolean,
        default: true,
      },

      maintenanceMode: {
        type: Boolean,
        default: false,
      },

      showAdmissions: {
        type: Boolean,
        default: true,
      },

      showNews: {
        type: Boolean,
        default: true,
      },

      showEvents: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "AdminSettings",
  adminSettingsSchema
);
