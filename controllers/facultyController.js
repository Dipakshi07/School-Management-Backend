import Faculty from "../models/Faculty.js";

export const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({
      createdAt: -1
    });

    res.json(faculty);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);

    res.status(201).json(faculty);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.json(faculty);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);

    res.json({
      message: "Faculty deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};