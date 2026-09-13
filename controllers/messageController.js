import mongoose from "mongoose";
import Message from "../models/Message.js";

// ==========================================
// GET ALL MESSAGES
// ==========================================
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE MESSAGE
// ==========================================
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Get Message Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch message",
    });
  }
};

// ==========================================
// CREATE MESSAGE
// ==========================================
export const createMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "",
      subject: subject?.trim() || "General Enquiry",
      message: message.trim(),
      status: "unread",
      priority: "normal",
      adminNote: "",
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Create Message Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE MESSAGE
// ==========================================
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const {
      status,
      priority,
      adminNote,
    } = req.body;

    const updatedMessage =
      await Message.findByIdAndUpdate(
        id,
        {
          ...(status !== undefined && { status }),
          ...(priority !== undefined && { priority }),
          ...(adminNote !== undefined && {
            adminNote: adminNote.trim(),
          }),
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Update Message Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update message",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE MESSAGE
// ==========================================
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const deletedMessage =
      await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
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
    console.error("Delete Message Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};