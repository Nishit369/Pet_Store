const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
    qualification: { type: String, required: true },
    fees: { type: Number, required: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
