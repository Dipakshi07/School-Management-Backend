import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import Notice from "../models/Notice.js";


/* =====================================
   TEACHER PROFILE
===================================== */

export const getTeacherProfile =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.findOne({
          user: req.user.id
        }).populate(
          "user",
          "-password"
        );

      if (!teacher) {
        return res.status(404).json({
          message:
            "Teacher profile not found"
        });
      }

      res.status(200).json({
        teacher
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch teacher profile"
      });
    }
  };


/* =====================================
   TEACHER DASHBOARD
===================================== */

export const getTeacherDashboard =
  async (req, res) => {

    try {

      const teacher =
        await Teacher.findOne({
          user: req.user.id
        }).populate(
          "user",
          "-password"
        );

      const students =
        await Student.find({
          status: "active"
        })
        .populate(
          "user",
          "name email"
        )
        .limit(100);

      const notices =
        await Notice.find({
          isActive: true
        })
        .sort({
          date: -1
        })
        .limit(5);

      res.status(200).json({

        teacher,

        stats: {
          students:
            students.length,

          classes:
            teacher?.assignedClasses
              ?.length || 0,

          assignments: 0,

          attendance: 0
        },

        students,

        notices

      });

    } catch (error) {

      console.error(
        "Teacher Dashboard Error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to load teacher dashboard"
      });
    }
  };


/* =====================================
   TEACHER STUDENTS
===================================== */

export const getTeacherStudents =
  async (req, res) => {

    try {

      const students =
        await Student.find({
          status: "active"
        })
        .populate(
          "user",
          "name email phone"
        );

      res.status(200).json({
        students
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch students"
      });
    }
  };