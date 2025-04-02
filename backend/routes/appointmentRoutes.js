const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user_id, date, time, status, reason, doctor_id } = req.body;
    const appointment = new Appointment({
      user_id,
      date,
      time,
      status,
      reason,
      doctor_id,
    });
    await appointment.save();
    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating appointment", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    const allAppointments = await Appointment.find({ user_id: id })
      .populate("user_id")
      .populate("doctor_id");
    res.json(allAppointments);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch doctors", details: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const { id } = req.query;
    const allAppointments = await Appointment.find()
      .populate("user_id")
      .populate("doctor_id");
    res.json(allAppointments);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch doctors", details: err.message });
  }
});

module.exports = router;
