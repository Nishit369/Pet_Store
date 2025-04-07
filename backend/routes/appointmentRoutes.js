const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

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
    const { user_id, doctor_id } = req.query;

    if (!user_id && !doctor_id) {
      return res
        .status(400)
        .json({ error: "Provide either user_id or doctor_id" });
    }
    if (user_id && doctor_id) {
      return res
        .status(400)
        .json({ error: "Provide only one of user_id or doctor_id" });
    }

    const filter = user_id ? { user_id } : { doctor_id };

    const appointments = await Appointment.find(filter)
      .populate("user_id")
      .populate({ path: "doctor_id", populate: "user_id" });

    res.json(appointments);
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
      .populate({ path: "doctor_id", populate: "user_id" })
      .sort({ createdAt: -1 });
    res.json(allAppointments);
    console.log(allAppointments);
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

router.get("/doc/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findOne({ user_id: id });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const appointments = await Appointment.find({ doctor_id: doctor._id })
      .populate("user_id")
      .populate({ path: "doctor_id", populate: "user_id" });

    res.json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch appointments", details: err.message });
  }
});

module.exports = router;
