const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 1,
    },
    petId: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["Dog", "Cat", "Bird", "Fish"],
      required: true,
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
    trained: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
          required: true,
        },
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
