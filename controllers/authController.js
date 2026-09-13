import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";


// =====================================
// REGISTER USER
// =====================================

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      className,
      section,
      rollNumber,
      employeeId,
      subject
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      // Public registration ko student tak limit
      // karna safer hai
      role: role || "student",

      phone,
      className,
      section,
      rollNumber,
      employeeId,
      subject
    });

    res.status(201).json({
      message: "User registered successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    console.error(
      "Register Error:",
      error
    );

    res.status(500).json({
      message: "Server error during registration"
    });
  }
};


// =====================================
// LOGIN USER
// =====================================

export const loginUser = async (req, res) => {
  try {

    const {
      email,
      password,
      role
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message:
          "Your account has been deactivated. Please contact administration."
      });
    }

    // Login screen par selected role
    // aur database role same hona chahiye
    if (role && user.role !== role) {
      return res.status(403).json({
        message:
          `This account is registered as ${user.role}, not ${role}.`
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        className: user.className,
        section: user.section,
        rollNumber: user.rollNumber,
        employeeId: user.employeeId,
        subject: user.subject,
        profileImage: user.profileImage
      }
    });

  } catch (error) {

    console.error(
      "Login Error:",
      error
    );

    res.status(500).json({
      message: "Server error during login"
    });
  }
};


// =====================================
// GET CURRENT USER
// =====================================

export const getCurrentUser = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user
    });

  } catch (error) {

    console.error(
      "Current User Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch user"
    });
  }
};