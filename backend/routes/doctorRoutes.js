const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const allDoctors = await Doctor.find();
    res.json(allDoctors);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch doctors", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch doctor", details: err.message });
  }
});

module.exports = router;
