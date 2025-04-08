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
      color, 
      vaccinated,
      trained,
      image,
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
      color, 
      vaccinated,
      trained,
      images: [{ url: image, altText: "pet image" }],
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
      color,
      minPrice,
      maxPrice,
      minAge,
      maxAge,
      search,
      trained,      
      vaccinated    
    } = req.query;
    
    const filter = [];
    
    // Basic filters
    if (type) filter.push({ type });
    if (breed) filter.push({ breed });
    if (gender) filter.push({ gender });
    if (size) filter.push({ size });
    if (color) filter.push({ color });
    
    // Trained and Vaccinated filters
    if (trained !== undefined) filter.push({ trained: trained === "yes" });
    
    
    // Price filter
    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);
      filter.push({ price: priceFilter });
    }
    
    // Age filter
    if (minAge || maxAge) {
      const ageFilter = {};
      if (minAge) ageFilter.$gte = Number(minAge);
      if (maxAge) ageFilter.$lte = Number(maxAge);
      filter.push({ age: ageFilter });
    }
    
    // Search logic added as $or, wrapped inside $and
    if (search) {
      filter.push({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { breed: { $regex: search, $options: "i" } },
          { color: { $regex: search, $options: "i" } },
        ],
      });
    }
    
    const finalQuery = filter.length > 0 ? { $and: filter } : {};
    const pets = await Pet.find(finalQuery);
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
    // console.log(pet)
    // Update fields manually or safely with checks
    pet.name = req.body.name || pet.name;
    pet.description = req.body.description || pet.description;
    pet.price = req.body.price || pet.price;
    pet.breed = req.body.breed || pet.breed;
    pet.age = req.body.age || pet.age;
    pet.gender = req.body.gender || pet.gender;
    pet.size = req.body.size || pet.size;
    pet.type = req.body.type || pet.type;
    pet.color = req.body.color || pet.color;
    pet.vaccinated = req.body.vaccinated ?? pet.vaccinated;
    pet.trained = req.body.trained ?? pet.trained;

    // Explicitly update image(s)
    if (req.body.image) {
      pet.images = [{ url: req.body.image, altText: "pet image" }];
    } else if (req.body.images) {
      pet.images = req.body.images;
    }

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