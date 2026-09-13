
import AdminSettings from "../models/AdminSettings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

/* =========================================================
   GET ADMIN SETTINGS
========================================================= */

export const getAdminSettings = async (req, res) => {
  try {
    const adminId = req.user.id;

    // Find logged-in admin
    const admin = await User.findById(adminId).select(
      "-password"
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Administrator not found",
      });
    }

    // Find settings
    let settings = await AdminSettings.findOne({
      adminId,
    });

    // Create default settings if not found
    if (!settings) {
      settings = await AdminSettings.create({
        adminId,

        profile: {
          name: admin.name || "School Administrator",
          email: admin.email || "",
          phone: admin.phone || "",
          role: admin.role || "admin",
        },
      });
    }

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load settings",
      error: error.message,
    });
  }
};


/* =========================================================
   UPDATE ADMIN SETTINGS
========================================================= */

export const updateAdminSettings = async (req, res) => {
  try {
    const adminId = req.user.id;

    const {
      profile,
      school,
      notifications,
      website,
    } = req.body;

    // Build update object only for values received
    const updateData = {};

    if (profile) {
      updateData.profile = profile;
    }

    if (school) {
      updateData.school = school;
    }

    if (notifications) {
      updateData.notifications = notifications;
    }

    if (website) {
      updateData.website = website;
    }

    // Update or create settings
    const settings = await AdminSettings.findOneAndUpdate(
      { adminId },
      {
        $set: updateData,
        $setOnInsert: {
          adminId,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    // Update basic admin information in User model
    if (profile) {
      await User.findByIdAndUpdate(
        adminId,
        {
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update settings",
      error: error.message,
    });
  }
};


/* =========================================================
   CHANGE ADMIN PASSWORD
========================================================= */

export const changeAdminPassword = async (req, res) => {
  try {
    const adminId = req.user.id;

    const {
      currentPassword,
      newPassword,
    } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must contain at least 6 characters",
      });
    }

    // Find admin from User model
    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Administrator not found",
      });
    }

    // Check current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    admin.password = hashedPassword;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: error.message,
    });
  }
};
