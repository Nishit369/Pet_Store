const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");
const User = require("./models/User");
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
    const doctorUsers = await User.find({ role: "doctor" });

    if (doctorUsers.length === 0) {
      console.log("No users with 'doctor' role found");
      mongoose.connection.close();
      return;
    }

    console.log(
      `Found ${doctorUsers.length} doctor users to create profiles for`
    );

    // Doctor details for exactly 4 doctors
    const doctorDetails = [
      {
        description: "Experienced Neurologist",
        qualification: "MBBS, MD",
        fees: 150,
      },
      {
        description: "Expert Cardiologist",
        qualification: "MBBS, DM",
        fees: 200,
      },
      {
        description: "Specialist in Pediatrics",
        qualification: "MBBS, DCH",
        fees: 120,
      },
      {
        description: "Orthopedic Surgeon",
        qualification: "MBBS, MS",
        fees: 180,
      },
    ];

    // Create doctor records for each doctor user (limit to 4)
    const doctorProfiles = doctorUsers.slice(0, 4).map((user, index) => {
      return {
        user_id: user._id,
        description: doctorDetails[index].description,
        qualification: doctorDetails[index].qualification,
        fees: doctorDetails[index].fees,
      };
    });

    // Check if any doctors already exist and delete them to avoid duplicates
    await Doctor.deleteMany({});

    // Insert the new doctor profiles
    const result = await Doctor.insertMany(doctorProfiles);
    console.log(`${result.length} doctors saved successfully`);

    // Print the created doctor records for verification
    result.forEach(async (doctor) => {
      const user = doctorUsers.find(
        (u) => u._id.toString() === doctor.user_id.toString()
      );
      console.log(
        `Created doctor profile for ${user.name}, ${doctor.description}, Fees: $${doctor.fees}`
      );
    });

    mongoose.connection.close();
  } catch (err) {
    console.error("Error saving doctors:", err);
    mongoose.connection.close();
  }
};

seedDoctors();
