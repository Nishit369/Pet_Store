const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const allDoctors = await Doctor.find().populate("user_id");

    const formattedDoctors = allDoctors.map((doctor) => ({
      _id: doctor._id,
      name: doctor.user_id.name,
      email: doctor.user_id.email,
      user_id: doctor.user_id._id,
      role: doctor.user_id.role,
      createdAt: doctor.user_id.createdAt,
      updatedAt: doctor.user_id.updatedAt,
      description: doctor.description,
      qualification: doctor.qualification,
      fees: doctor.fees,
    }));

    res.json(formattedDoctors);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch doctors", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let doctor = await Doctor.findById(id).populate("user_id");

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const formattedDoctor = {
      _id: doctor._id,
      name: doctor.user_id.name,
      email: doctor.user_id.email,
      role: doctor.user_id.role,
      user_id: doctor.user_id._id,
      createdAt: doctor.user_id.createdAt,
      updatedAt: doctor.user_id.updatedAt,
      description: doctor.description,
      qualification: doctor.qualification,
      fees: doctor.fees,
    };

    res.json(formattedDoctor);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch doctor", details: err.message });
  }
});

module.exports = router;
