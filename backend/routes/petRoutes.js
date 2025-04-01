const express = require("express");
const Pet = require("../models/Pet");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/pets
// @desc Create a new Pet
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      breed,
      age,
      gender,
      size,
      type,
      vaccinated,
      trained,
      images,
      petId,
    } = req.body;

    const pet = new Pet({
      name,
      description,
      price,
      breed,
      age,
      gender,
      size,
      type,
      vaccinated,
      trained,
      images,
      petId,
      user: req.user._id,
    });

    const createdPet = await pet.save();
    res.status(201).json(createdPet);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/pets
// @desc Get all pets with filters
// @access Public
router.get("/", async (req, res) => {
  try {
    const { type, breed, gender, size, minPrice, maxPrice, minAge, maxAge } =
      req.query;
    const filter = {};

    if (type) filter.type = type;
    if (breed) filter.breed = breed;
    if (gender) filter.gender = gender;
    if (size) filter.size = size;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minAge || maxAge) {
      filter.age = {};
      if (minAge) filter.age.$gte = Number(minAge);
      if (maxAge) filter.age.$lte = Number(maxAge);
    }

    const pets = await Pet.find(filter);
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/pets/:id
// @desc Get pet by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/pets/:id
// @desc Update pet
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    Object.assign(pet, req.body);
    const updatedPet = await pet.save();
    res.json(updatedPet);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/pets/:id
// @desc Delete pet
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    await pet.remove();
    res.json({ message: "Pet removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/pets/available/new
// @desc Get latest available pets
// @access Public
router.get("/available/new", async (req, res) => {
  try {
    const newPets = await Pet.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(newPets);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
