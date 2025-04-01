const mongoose = require("mongoose");
const { Doctor } = require("./models/Doctor");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const seedDoctors = async () => {
  try {
    const doctors = [
      {
        name: "Dr. Jane Doe",
        description: "Experienced Neurologist",
        qualification: "MBBS, MD",
        fees: 150,
      },
      {
        name: "Dr. John Smith",
        description: "Expert Cardiologist",
        qualification: "MBBS, DM",
        fees: 200,
      },
      {
        name: "Dr. Emily Johnson",
        description: "Specialist in Pediatrics",
        qualification: "MBBS, DCH",
        fees: 120,
      },
      {
        name: "Dr. Michael Brown",
        description: "Orthopedic Surgeon",
        qualification: "MBBS, MS",
        fees: 180,
      },
      {
        name: "Dr. Sarah Wilson",
        description: "Dermatologist with 15 years experience",
        qualification: "MBBS, MD",
        fees: 160,
      },
      {
        name: "Dr. David Lee",
        description: "Renowned Psychiatrist",
        qualification: "MBBS, MD (Psychiatry)",
        fees: 170,
      },
    ];

    await Doctor.insertMany(doctors);
    console.log("Doctors saved successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error saving doctors:", err);
  }
};

seedDoctors();
