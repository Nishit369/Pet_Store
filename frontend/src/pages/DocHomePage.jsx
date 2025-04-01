import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [doctors, setDoctors] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/doctor/all");
        const data = await response.json();
        setDoctors(data); 
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []); 

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-[#C6E7FF] text-center py-16 px-4">
        <h1 className="text-3xl font-bold">Book Appointment With Trusted Doctors</h1>
        <p className="mt-2">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
        <input
          type="submit"
          value="Book appointment →"
          className="mt-4 bg-white text-blue-600 px-6 py-2 rounded hover:bg-light-brown cursor-pointer"
        />
      </section>

      {/* Specialties */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Find by Speciality</h2>
        <p className="text-gray-600">Browse through our list of specializations</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {["General Physician", "Gynecologist", "Dermatologist", "Pediatrics", "Neurologist", "Gastroenterologist"].map(
            (spec) => (
              <div key={spec} className="p-3 bg-gray-100 rounded-md shadow-md">
                {spec}
              </div>
            )
          )}
        </div>
      </section>

      {/* Top Doctors */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Top Doctors to Book</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="p-5 bg-white shadow-md rounded-md text-center cursor-pointer"
                onClick={() => navigate(`/appointment/${doctor._id}`)}
              >
                <div className="text-lg font-bold">{doctor.name}</div>
                <p className="text-gray-600">Specialty: {doctor.description}</p>
                <span className="text-green-600">✓ Available</span>
              </div>
            ))
          ) : (
            <p>Loading doctors...</p>
          )}
        </div>
        <input
          type="submit"
          value="More"
          className="mt-6 bg-gray-200 px-6 py-2 rounded hover:bg-light-brown cursor-pointer"
        />
      </section>

      {/* CTA Section */}
      <section className="bg-[#C6E7FF] text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Book Appointment With 100+ Trusted Doctors</h2>
        <input
          type="submit"
          value="Create account"
          className="mt-4 bg-white text-blue-600 px-6 py-2 rounded"
        />
      </section>
    </div>
  );
}
