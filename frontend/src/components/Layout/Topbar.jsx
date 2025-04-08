import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to scroll to a specific section on the current page
  const scrollToSection = (sectionId) => {
    // If we're already on the homepage
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home and then scroll
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md">
  <div className="container mx-auto flex items-center py-3 px-4">
    
    {/* LEFT - Symbol only */}
    <div 
      className="flex-1 flex items-center cursor-pointer" 
      onClick={() => navigate("/")}
    >
      <span className="text-xl font-bold">🐾</span>
    </div>

    {/* CENTER - Nav links */}
    <div className="flex-1 hidden md:flex justify-center space-x-6">
      <span 
        className="cursor-pointer hover:text-blue-100 transition-colors duration-300"
        onClick={() => navigate("/about")}
      >
        Services
      </span>
      <span 
        className="cursor-pointer hover:text-blue-100 transition-colors duration-300"
        onClick={() => navigate("/doc")}
      >
        Veterinarians
      </span>
      <span 
        className="cursor-pointer hover:text-blue-100 transition-colors duration-300"
        onClick={() => navigate("/about")}
      >
        About Us
      </span>
      <span 
        className="cursor-pointer hover:text-blue-100 transition-colors duration-300"
        onClick={() => scrollToSection("contact-section")}
      >
        Contact
      </span>
    </div>

    {/* RIGHT - Login + Book */}
    <div className="flex-1 flex justify-end items-center space-x-4">
      <button 
        onClick={() => navigate("/login")}
        className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors duration-300"
      >
        Login
      </button>
      <button 
        onClick={() => navigate("/appointments/new")}
        className="hidden md:block bg-transparent border border-white text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-white hover:text-blue-600 transition-colors duration-300"
      >
        Book Now
      </button>
    </div>

  </div>
</div>
  );
};

export default Topbar;