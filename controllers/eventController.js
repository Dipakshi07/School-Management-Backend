import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({
      createdAt: -1
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: "Event deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};