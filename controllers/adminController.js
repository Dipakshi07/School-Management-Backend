import User from "../models/User.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Notice from "../models/Notice.js";
import News from "../models/News.js";
import Admission from "../models/Admission.js";
import EventRegistration from "../models/EventRegistration.js";
import Contact from "../models/Contact.js";
import bcrypt from "bcryptjs";

// =====================================================
// ADMIN DASHBOARD STATS
// =====================================================

export const getAdminDashboard = async (req, res) => {
  try {
    const [
      students,
      teachers,
      pendingAdmissions,
      notices,
      news,
      eventRegistrations,
      unreadContacts,
    ] = await Promise.all([
      // Total students
      Student.countDocuments(),

      // Total teachers
      Teacher.countDocuments(),

      // Pending admissions
      Admission.countDocuments({
        status: "Pending",
      }),

      // Active notices
      Notice.countDocuments({
        isActive: true,
      }),

      // Active news
      News.countDocuments({
        isActive: true,
      }),

      // Total event registrations
      EventRegistration.countDocuments(),

      // Unread contact messages
      Contact.countDocuments({
        isRead: false,
      }),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        students,
        teachers,
        admissions: pendingAdmissions,
        pendingAdmissions,
        notices,
        news,
        eventRegistrations,

        // Contact messages
        unreadContacts,
        unreadMessages: unreadContacts,
      },
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL STUDENTS
// =====================================================

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate(
        "user",
        "name email phone profileImage isActive role"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("Get Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};

// =====================================================
// CREATE STUDENT
// =====================================================

export const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      studentId,
      className,
      section,
      rollNumber,
      dateOfBirth,
      gender,
      fatherName,
      motherName,
      address,
    } = req.body;

    if (!name || !email || !studentId) {
      return res.status(400).json({
        success: false,
        message: "Name, email and student ID are required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const existingStudent = await Student.findOne({
      studentId: studentId.trim(),
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student ID already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password || "123456",
      10
    );

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "student",
      phone: phone || "",
      isActive: true,
    });

    const student = await Student.create({
      user: user._id,
      studentId: studentId.trim(),
      className: className || "",
      section: section || "",
      rollNumber: rollNumber || "",
      dateOfBirth: dateOfBirth || null,
      gender: gender || "",
      fatherName: fatherName || "",
      motherName: motherName || "",
      address: address || "",
    });

    await student.populate(
      "user",
      "name email phone profileImage isActive role"
    );

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    console.error("Create Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE STUDENT
// =====================================================

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (student.user) {
      await User.findByIdAndDelete(student.user);
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student",
    });
  }
};

// =====================================================
// GET ALL TEACHERS
// =====================================================

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate(
        "user",
        "name email phone profileImage isActive role"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (error) {
    console.error("Get Teachers Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
    });
  }
};

// =====================================================
// CREATE TEACHER
// =====================================================

export const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      employeeId,
      subject,
      qualification,
      experience,
      department,
      gender,
      address,
      profileImage,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    let finalEmployeeId = employeeId?.trim();

    if (!finalEmployeeId) {
      const teacherCount = await Teacher.countDocuments();

      finalEmployeeId = `TCH-${String(
        teacherCount + 1
      ).padStart(4, "0")}`;

      let exists = await Teacher.findOne({
        employeeId: finalEmployeeId,
      });

      let counter = teacherCount + 2;

      while (exists) {
        finalEmployeeId = `TCH-${String(
          counter
        ).padStart(4, "0")}`;

        exists = await Teacher.findOne({
          employeeId: finalEmployeeId,
        });

        counter++;
      }
    }

    const existingTeacher = await Teacher.findOne({
      employeeId: finalEmployeeId,
    });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Employee ID already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password || "123456",
      10
    );

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "teacher",
      phone: phone || "",
      profileImage: profileImage || "",
      isActive: true,
    });

    const teacher = await Teacher.create({
      user: user._id,
      employeeId: finalEmployeeId,
      subject: subject || "",
      qualification: qualification || "",
      experience: experience || "",
      department: department || "",
      gender: gender || "",
      address: address || "",
    });

    await teacher.populate(
      "user",
      "name email phone profileImage isActive role"
    );

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacher,
      employeeId: finalEmployeeId,
    });
  } catch (error) {
    console.error("Create Teacher Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create teacher",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE TEACHER
// =====================================================

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      employeeId,
      subject,
      qualification,
      experience,
      department,
      gender,
      address,
      profileImage,
    } = req.body;

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    let user = null;

    if (teacher.user) {
      const userId = teacher.user._id || teacher.user;
      user = await User.findById(userId);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Associated teacher user not found",
      });
    }

    const normalizedEmail = email
      .toLowerCase()
      .trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: user._id },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const normalizedEmployeeId =
      employeeId?.trim();

    if (normalizedEmployeeId) {
      const existingTeacher =
        await Teacher.findOne({
          employeeId: normalizedEmployeeId,
          _id: { $ne: teacher._id },
        });

      if (existingTeacher) {
        return res.status(400).json({
          success: false,
          message: "Employee ID already exists",
        });
      }

      teacher.employeeId =
        normalizedEmployeeId;
    }

    teacher.subject = subject?.trim() || "";

    teacher.qualification =
      qualification?.trim() || "";

    teacher.experience =
      experience !== undefined &&
      experience !== null
        ? experience
        : "";

    teacher.department =
      department?.trim() || "";

    teacher.gender =
      gender?.trim() || "";

    teacher.address =
      address?.trim() || "";

    await teacher.save();

    user.name = name.trim();
    user.email = normalizedEmail;
    user.phone = phone?.trim() || "";

    if (profileImage !== undefined) {
      user.profileImage =
        profileImage || "";
    }

    await user.save();

    const updatedTeacher =
      await Teacher.findById(id).populate(
        "user",
        "name email phone profileImage isActive role"
      );

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(
      "Update Teacher Error:",
      error
    );

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "Email or Employee ID already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update teacher",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE TEACHER
// =====================================================

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(
      req.params.id
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    if (teacher.user) {
      const userId =
        teacher.user._id || teacher.user;

      await User.findByIdAndDelete(userId);
    }

    await Teacher.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Teacher Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete teacher",
    });
  }
};

// =====================================================
// GET ADMISSIONS
// =====================================================

export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      admissions,
    });
  } catch (error) {
    console.error(
      "Get Admissions Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch admissions",
    });
  }
};

// =====================================================
// UPDATE ADMISSION STATUS
// =====================================================

export const updateAdmissionStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const admission =
      await Admission.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admission status updated",
      admission,
    });
  } catch (error) {
    console.error(
      "Update Admission Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update admission",
    });
  }
};

// =====================================================
// GET EVENT REGISTRATIONS
// =====================================================

export const getEventRegistrations = async (
  req,
  res
) => {
  try {
    const registrations =
      await EventRegistration.find()
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      registrations,
    });
  } catch (error) {
    console.error(
      "Get Event Registrations Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
};

// =====================================================
// DELETE EVENT REGISTRATION
// =====================================================

export const deleteEventRegistration = async (
  req,
  res
) => {
  try {
    const registration =
      await EventRegistration.findByIdAndDelete(
        req.params.id
      );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Registration deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Event Registration Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete registration",
    });
  }
};

// =====================================================
// GET CONTACT MESSAGES
// =====================================================

export const getContacts = async (req, res) => {
  try {
    const messages = await Contact.find()
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(
      "Get Contact Messages Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE CONTACT MESSAGE STATUS
// =====================================================

export const updateContactStatus = async (
  req,
  res
) => {
  try {
    const { isRead } = req.body;

    if (typeof isRead !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isRead must be true or false",
      });
    }

    const message =
      await Contact.findByIdAndUpdate(
        req.params.id,
        {
          isRead,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: isRead
        ? "Message marked as read"
        : "Message marked as unread",
      data: message,
    });
  } catch (error) {
    console.error(
      "Update Contact Status Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update message",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE CONTACT MESSAGE
// =====================================================

export const deleteContact = async (req, res) => {
  try {
    const contact =
      await Contact.findByIdAndDelete(
        req.params.id
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Contact Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message,
    });
  }
};