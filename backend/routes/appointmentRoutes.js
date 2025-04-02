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

router.get("/", (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
