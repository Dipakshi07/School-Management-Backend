import Student from "../models/Student.js";
import User from "../models/User.js";
import Notice from "../models/Notice.js";


/* =====================================
   STUDENT PROFILE
===================================== */

export const getStudentProfile =
  async (req, res) => {

    try {

      const student =
        await Student.findOne({
          user: req.user.id
        }).populate(
          "user",
          "-password"
        );

      if (!student) {
        return res.status(404).json({
          message:
            "Student profile not found"
        });
      }

      res.status(200).json({
        student
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Failed to fetch student profile"
      });
    }
  };


/* =====================================
   STUDENT DASHBOARD
===================================== */

export const getStudentDashboard =
  async (req, res) => {

    try {

      const student =
        await Student.findOne({
          user: req.user.id
        }).populate(
          "user",
          "-password"
        );

      const notices =
        await Notice.find({
          isActive: true
        })
        .sort({
          date: -1
        })
        .limit(5);

      res.status(200).json({

        student,

        stats: {
          attendance:
            student?.attendance || 0,

          assignments: 0,

          events: 0,

          notices:
            notices.length
        },

        notices

      });

    } catch (error) {

      console.error(
        "Student Dashboard Error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to load student dashboard"
      });
    }
  };


/* =====================================
   STUDENT UPDATE PROFILE
===================================== */

export const updateStudentProfile =
  async (req, res) => {

    try {

      const student =
        await Student.findOneAndUpdate(
          {
            user: req.user.id
          },

          req.body,

          {
            new: true,
            runValidators: true
          }
        );

      if (!student) {
        return res.status(404).json({
          message:
            "Student profile not found"
        });
      }

      res.status(200).json({
        message:
          "Profile updated successfully",

        student
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to update profile"
      });
    }
  };