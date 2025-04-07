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
      image,
      petId,
    } = req.body;
    console.log(req.body);
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
      images: [{ url: image, altText: "pet image" }],
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
    const {
      type,
      breed,
      gender,
      size,
      minPrice,
      maxPrice,
      minAge,
      maxAge,
      search,
    } = req.query;
    const filter = {};

    // Your existing filters...
    if (type) filter.type = type;
    if (breed) filter.breed = breed;
    if (gender) filter.gender = gender;
    if (size) filter.size = size;

    // Add text search capability
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { breed: { $regex: search, $options: "i" } },
      ];
    }

    // Your existing price and age filters...
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

    await pet.deleteOne();
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

// @route POST /api/pets/purchase
// @desc Purchase a pet
// @access Private
router.post("/purchase", protect, async (req, res) => {
  try {
    const { petId } = req.body;

    // 1. Verify pet availability
    const pet = await Pet.findById(petId);
    if (!pet || !pet.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Pet is no longer available for purchase",
      });
    }

    // 2. Process payment (you'd integrate with a payment provider here)

    // 3. Create order record
    const order = new Order({
      pet: petId,
      buyer: req.user._id, // Get the buyer ID from the authenticated user
      purchaseDate: new Date(),
      price: pet.price,
      // Add other order details if needed
    });

    await order.save();

    // 4. Update pet availability
    pet.isAvailable = false;
    await pet.save();

    // 5. Return success response
    return res.status(200).json({
      success: true,
      message: "Pet purchase successful",
      order: order,
    });
  } catch (error) {
    console.error("Pet purchase error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during the purchase process",
    });
  }
});
module.exports = router;
