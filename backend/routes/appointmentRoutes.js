const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { user_id, date, time, status, reason, doctor_id } = req.body;
    // console.log("Received appointment data:", req.body);
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
      .json({ error: "Failed to fetch appointments", details: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allAppointments = await Appointment.find()
      .populate("user_id")
      .populate("doctor_id");
    res.json(allAppointments);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch appointments", details: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({
      message: "Appointment updated successfully",
      updatedAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating appointment", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting appointment", error: error.message });
  }
});

module.exports = router;
