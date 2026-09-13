import EventRegistration from "../models/EventRegistration.js";

// ============================================
// REGISTER FOR EVENT - PUBLIC
// ============================================

export const registerForEvent = async (req, res) => {
  try {
    const {
      eventId,
      eventTitle,
      studentName,
      className,
      section,
      rollNumber,
      email,
      phone,
      message,
    } = req.body;

    // Required fields
    if (
      !eventId ||
      !eventTitle ||
      !studentName ||
      !className ||
      !section ||
      !rollNumber ||
      !email ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check duplicate registration
    const existingRegistration =
      await EventRegistration.findOne({
        eventId,
        email: email.toLowerCase().trim(),
        rollNumber: rollNumber.trim(),
      });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message:
          "You have already registered for this event.",
      });
    }

    // Save registration
    const registration =
      await EventRegistration.create({
        eventId,
        eventTitle: eventTitle.trim(),
        studentName: studentName.trim(),
        className,
        section: section.trim(),
        rollNumber: rollNumber.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        message: message?.trim() || "",
      });

    res.status(201).json({
      success: true,
      message:
        "Registration successful! Your details have been saved.",
      registration,
    });
  } catch (error) {
    console.error(
      "Event Registration Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error. Registration could not be completed.",
    });
  }
};


// ============================================
// GET ALL EVENT REGISTRATIONS - ADMIN
// ============================================

export const getAllEventRegistrations = async (
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
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error(
      "Get Event Registrations Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch event registrations.",
    });
  }
};


// ============================================
// GET SINGLE REGISTRATION - ADMIN
// ============================================

export const getEventRegistrationById = async (
  req,
  res
) => {
  try {
    const registration =
      await EventRegistration.findById(
        req.params.id
      );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    res.status(200).json({
      success: true,
      registration,
    });
  } catch (error) {
    console.error(
      "Get Registration Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch registration.",
    });
  }
};


// ============================================
// DELETE REGISTRATION - ADMIN
// ============================================

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
        message: "Registration not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Event registration deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Registration Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete registration.",
    });
  }
};