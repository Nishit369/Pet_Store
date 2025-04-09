const express = require("express");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create new user
    user = new User({
      name,
      email,
      password,
      role: role || "customer", // Default to "user" if role is not specified
    });

    await user.save();

    // If registering as a doctor, create doctor profile
    if (role === "doctor") {
      const { qualification, description, fees } = req.body;

      // Validate doctor-specific fields
      if (!qualification || !description || !fees) {
        // Delete the user we just created since doctor info is incomplete
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({
          message:
            "Doctor registration requires qualification, description, and fees",
        });
      }

      // Create doctor record linked to the user
      const doctor = new Doctor({
        user_id: user._id,
        qualification,
        description,
        fees: Number(fees),
      });

      await doctor.save();
    }

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        // Send the user and token in response
        res.status(201).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route POST /api/users/login
// @desc Authenticate user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // Send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/users/profile
// @desc Get logged-in user's profile (Protected Route)
// @access Private
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
