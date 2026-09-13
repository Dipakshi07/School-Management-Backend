
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

import User from "./models/User.js";

// =========================
// Routes
// =========================

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import eventRegistrationRoutes from "./routes/eventRegistrationRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminSettingsRoutes from "./routes/adminSettingsRoutes.js";

dotenv.config();

const app = express();

// =========================
// Fix __dirname
// =========================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// Middleware
// =========================

app.use(
  cors({
    origin: [
      "https://school-management-frontend-delta-seven.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// Image Upload Folder
// =========================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =========================
// APIs
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/student", studentRoutes);

app.use("/api/teacher", teacherRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/notices", noticeRoutes);

app.use(
  "/api/event-registrations",
  eventRegistrationRoutes
);

app.use("/api/contact", contactRoutes);

app.use("/api/admissions", admissionRoutes);

app.use("/api/news", newsRoutes);

app.use("/api/messages", messageRoutes);

// Admin Settings
app.use(
  "/api/admin/settings",
  adminSettingsRoutes
);

app.use(
  "/api/achievements",
  achievementRoutes
);

// Gallery
app.use(
  "/api/gallery",
  galleryRoutes
);

// =========================
// Home
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bright Future School API Running",
  });
});

// =========================
// Health Check
// =========================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Working",
  });
});

// =========================
// 404 Handler
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// =========================
// Error Handler
// =========================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =========================
// MongoDB Connection
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Default Admin
    const adminEmail = "admin@gmail.com";

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        "123456",
        10
      );

      await User.create({
        name: "School Administrator",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        isActive: true,
      });

      console.log("Default Admin Created");
      console.log("Admin Email: admin@gmail.com");
      console.log("Admin Password: 123456");
    } else {
      console.log("Default Admin Already Exists");
    }
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// =========================
// Server
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server Running: http://localhost:${PORT}`);
});