import Contact from "../models/Contact.js";

// =====================================================
// CREATE CONTACT MESSAGE
// =====================================================

export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and message are required",
      });
    }

    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      subject: subject?.trim() || "",
      message: message.trim(),
      isRead: false,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error(
      "Contact creation error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to save contact message",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL CONTACT MESSAGES
// =====================================================

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error(
      "Get contacts error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
      error: error.message,
    });
  }
};

// =====================================================
// MARK MESSAGE AS READ
// =====================================================

export const markContactAsRead = async (
  req,
  res
) => {
  try {
    const contact =
      await Contact.findByIdAndUpdate(
        req.params.id,
        {
          isRead: true,
        },
        {
          new: true,
        }
      );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      contact,
    });
  } catch (error) {
    console.error(
      "Mark read error:",
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
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete contact error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message,
    });
  }
};