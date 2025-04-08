import React from 'react';
import { FaPaw, FaShoppingCart, FaStethoscope, FaCalendarAlt, FaBookOpen } from 'react-icons/fa'; // Using Font Awesome for icons

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 py-20 px-8 sm:px-16 lg:px-32 text-gray-900 relative overflow-hidden">
      {/* Subtle Background Pattern (Optional - requires CSS) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(102,126,234,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold mb-6 text-indigo-700 tracking-tight">
          About <span className="text-purple-600">PetConnect</span>
        </h1>
        <p className="text-xl leading-relaxed mb-10 max-w-3xl text-gray-700">
          We're more than just a platform; at <span className="font-semibold text-indigo-600">PetConnect</span>, we're building a vibrant community for pet lovers. We understand the profound bond you share with your furry, feathered, or scaled companions. That's why we've curated a space to connect you with everything you need to nurture that relationship – from finding your perfect pet to ensuring their lifelong well-being.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4 text-indigo-600">
                <FaPaw className="text-3xl mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Find Your Companion</h2>
              </div>
              <p className="text-gray-600">Discover a diverse range of adorable pets waiting for their forever homes.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4 text-purple-600">
                <FaShoppingCart className="text-3xl mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Premium Pet Supplies</h2>
              </div>
              <p className="text-gray-600">Access a curated selection of high-quality food, toys, and accessories.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4 text-indigo-600">
                <FaStethoscope className="text-3xl mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Expert Veterinary Care</h2>
              </div>
              <p className="text-gray-600">Connect with trusted vets for consultations and ensure your pet's health.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4 text-purple-600">
                <FaCalendarAlt className="text-3xl mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Effortless Appointments</h2>
              </div>
              <p className="text-gray-600">Easily schedule and manage appointments for all your pet's needs.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4 text-indigo-600">
                <FaBookOpen className="text-3xl mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">Valuable Pet Insights</h2>
              </div>
              <p className="text-gray-600">Explore our blog for expert advice on care, nutrition, and training.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl italic text-purple-700 font-semibold">
            "Because they are your family too."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;