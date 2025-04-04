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
    <div className="font-sans bg-gray-50">
      {/* Hero Banner with Pet Theme */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
               style={{backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" viewBox=\"0 0 24 24\" fill=\"white\"><path d=\"M4.5,9.5C5.9,9.5 7,10.6 7,12C7,13.4 5.9,14.5 4.5,14.5C3.1,14.5 2,13.4 2,12C2,10.6 3.1,9.5 4.5,9.5M9,6C10.7,6 12,7.3 12,9C12,10.7 10.7,12 9,12C7.3,12 6,10.7 6,9C6,7.3 7.3,6 9,6M16,9C17.7,9 19,10.3 19,12C19,13.7 17.7,15 16,15C14.3,15 13,13.7 13,12C13,10.3 14.3,9 16,9M14,2C16.8,2 19,4.2 19,7C19,8.2 18.6,9.2 17.9,10C20.2,11.2 22,13.8 22,17H14A7,7 0 0,1 7,10C7,5.6 10.1,2 14,2Z\"/></svg>')"}}></div>
        </div>
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Pet's Health Matters</h1>
              <p className="text-xl mb-8">Schedule appointments with trusted veterinarians who care for your furry friends like family.</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300 shadow-lg">
                Book Appointment →
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="https://www.rd.com/wp-content/uploads/2024/05/GettyImages-1041987488-scaled-e1714713424901.jpg" className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl relative overflow-hidden object-cover">
                {/* This would be an actual image in production */}
              </img>
            </div>
          </div>
        </div>
      </section>

      {/* New Banner/Promotional Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 p-8 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-white shadow-inner flex items-center justify-center">
                  <span className="text-orange-400 text-6xl">🐾</span>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h2 className="text-2xl font-bold text-orange-600 mb-3">Special Offer for New Pet Parents!</h2>
                <p className="text-gray-700 mb-6">First-time visit includes a comprehensive health check and free nutrition consultation. Your furry friend deserves the very best care!</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Doctors (renamed to Veterinarians) */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Top Veterinarians</h2>
            <p className="text-gray-600 mt-2">Experienced professionals who love animals as much as you do</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100 cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                >
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-500 font-bold text-lg">
                          {doctor.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                        <p className="text-blue-600">{doctor.description}</p>
                      </div>
                    </div>
                    <div className="border-t pt-4 mt-2">
                      <div className="flex items-center text-green-600">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Available for appointments</span>
                      </div>
                      <button className="w-full mt-4 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 rounded-lg transition duration-300">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-blue-100 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-blue-100 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-blue-100 rounded"></div>
                      <div className="h-4 bg-blue-100 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-8 py-3 rounded-full transition duration-300">
              View All Veterinarians
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section with Pet Theme */}
      <section className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <span className="text-5xl">🐾</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Give Your Pet the Care They Deserve</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">Join our community of pet lovers and access premium veterinary services from over 100+ trusted professionals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold shadow-lg transition duration-300">
              Create Account
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-semibold transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}