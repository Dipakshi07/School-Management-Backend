import Notice from "../models/Notice.js";

/* =====================================================
   GET ACTIVE NOTICES
   MAIN WEBSITE
===================================================== */

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({
      isActive: true
    })
      .sort({ date: -1 })
      .limit(10);

    res.status(200).json(notices);
  } catch (error) {
    console.error("Get Notices Error:", error);

    res.status(500).json({
      message: "Failed to fetch notices"
    });
  }
};


/* =====================================================
   GET ALL NOTICES
   ADMIN DASHBOARD
===================================================== */

export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({ date: -1 });

    res.status(200).json(notices);
  } catch (error) {
    console.error("Get All Notices Error:", error);

    res.status(500).json({
      message: "Failed to fetch notices"
    });
  }
};


/* =====================================================
   CREATE NOTICE
===================================================== */

export const createNotice = async (req, res) => {
  try {
    const {
      title,
      description,
      details,
      date,
      time,
      venue,
      lastDate,
      category,
      isActive
    } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({
        message: "Title, description and date are required"
      });
    }

    const notice = await Notice.create({
      title,
      description,
      details: details || "",
      date,
      time: time || "",
      venue: venue || "",
      lastDate: lastDate || "",
      category: category || "Announcement",
      isActive:
        isActive !== undefined
          ? isActive
          : true
    });

    res.status(201).json({
      message: "Notice created successfully",
      notice
    });
  } catch (error) {
    console.error("Create Notice Error:", error);

    res.status(500).json({
      message: "Failed to create notice"
    });
  }
};


/* =====================================================
   UPDATE NOTICE
===================================================== */

export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      details,
      date,
      time,
      venue,
      lastDate,
      category,
      isActive
    } = req.body;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found"
      });
    }

    if (title !== undefined)
      notice.title = title;

    if (description !== undefined)
      notice.description = description;

    if (details !== undefined)
      notice.details = details;

    if (date !== undefined)
      notice.date = date;

    if (time !== undefined)
      notice.time = time;

    if (venue !== undefined)
      notice.venue = venue;

    if (lastDate !== undefined)
      notice.lastDate = lastDate;

    if (category !== undefined)
      notice.category = category;

    if (isActive !== undefined)
      notice.isActive = isActive;

    await notice.save();

    res.status(200).json({
      message: "Notice updated successfully",
      notice
    });
  } catch (error) {
    console.error("Update Notice Error:", error);

    res.status(500).json({
      message: "Failed to update notice"
    });
  }
};


/* =====================================================
   DELETE NOTICE
===================================================== */

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice =
      await Notice.findByIdAndDelete(id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found"
      });
    }

    res.status(200).json({
      message: "Notice deleted successfully"
    });
  } catch (error) {
    console.error("Delete Notice Error:", error);

    res.status(500).json({
      message: "Failed to delete notice"
    });
  }
};