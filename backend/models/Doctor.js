const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    qualification: { type: String, required: true },
    fees: { type: Number, required: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
