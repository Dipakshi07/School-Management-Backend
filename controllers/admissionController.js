import Admission from "../models/Admission.js";


// ==================================================
// CREATE ADMISSION
// ==================================================

export const createAdmission = async (req, res) => {
  try {
    const {
      studentName,
      dateOfBirth,
      gender,
      classApplied,
      parentName,
      email,
      phone,
      address,
      previousSchool,
      message,
    } = req.body;


    // ==============================================
    // REQUIRED FIELD VALIDATION
    // ==============================================

    if (
      !studentName ||
      !dateOfBirth ||
      !gender ||
      !classApplied ||
      !parentName ||
      !email ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required admission fields.",
      });
    }


    // ==============================================
    // CREATE ADMISSION
    // ==============================================

    const admission = await Admission.create({
      studentName: studentName.trim(),

      dateOfBirth,

      gender,

      classApplied: classApplied.trim(),

      parentName: parentName.trim(),

      email: email.toLowerCase().trim(),

      phone: phone.trim(),

      address: address.trim(),

      previousSchool:
        previousSchool?.trim() || "",

      message:
        message?.trim() || "",

      // New application always starts as Pending
      status: "Pending",
    });


    // ==============================================
    // RESPONSE
    // ==============================================

    res.status(201).json({
      success: true,

      message:
        "Admission application submitted successfully.",

      admission,
    });

  } catch (error) {

    console.error(
      "Create Admission Error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to submit admission application.",
    });
  }
};



// ==================================================
// GET ALL ADMISSIONS
// ==================================================

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

      message:
        error.message ||
        "Failed to fetch admissions.",
    });
  }
};



// ==================================================
// UPDATE ADMISSION STATUS
// ==================================================

export const updateAdmissionStatus = async (
  req,
  res
) => {
  try {

    const { status } = req.body;


    // ==============================================
    // VALID STATUS CHECK
    // ==============================================

    const allowedStatuses = [
      "Pending",
      "Approved",
      "Declined",
    ];


    if (!status) {
      return res.status(400).json({
        success: false,

        message:
          "Status is required.",
      });
    }


    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid admission status.",
      });
    }


    // ==============================================
    // UPDATE ADMISSION
    // ==============================================

    const admission =
      await Admission.findByIdAndUpdate(
        req.params.id,

        {
          status,
        },

        {
          new: true,
          runValidators: true,
        }
      );


    // ==============================================
    // ADMISSION NOT FOUND
    // ==============================================

    if (!admission) {
      return res.status(404).json({
        success: false,

        message:
          "Admission not found.",
      });
    }


    // ==============================================
    // SUCCESS RESPONSE
    // ==============================================

    res.status(200).json({
      success: true,

      message:
        `Admission ${status.toLowerCase()} successfully.`,

      admission,
    });

  } catch (error) {

    console.error(
      "Update Admission Status Error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to update admission status.",
    });
  }
};