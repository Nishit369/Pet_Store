import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { MenuIcon, XMarkIcon } from "@heroicons/react/10/solid";
const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
    closeMobileMenu(); // Close menu after navigation
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* LEFT - Symbol only */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-xl font-bold">🐾</span>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMobileMenuOpen ? (
              <div className="h-6 w-6" >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
                </div> 
            ) : (
              <div className="h-6 w-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>  
              </div> 
            )}
          </button>
        </div>

        {/* CENTER - Nav links (hidden on mobile) */}
        <div className="hidden md:flex justify-center space-x-6">
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

        {/* RIGHT - Login + Book (Hidden on mobile for now - you can adjust) */}
        <div className="hidden md:block">
          {/* Add your login and book components here */}
        </div>
      </div>

      {/* MOBILE MENU (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-500 py-4 px-4">
          <div className="flex flex-col space-y-3">
            <span
              className="cursor-pointer hover:text-blue-100 transition-colors duration-300 block py-2"
              onClick={() => {
                navigate("/about");
                closeMobileMenu();
              }}
            >
              Services
            </span>
            <span
              className="cursor-pointer hover:text-blue-100 transition-colors duration-300 block py-2"
              onClick={() => {
                navigate("/doc");
                closeMobileMenu();
              }}
            >
              Veterinarians
            </span>
            <span
              className="cursor-pointer hover:text-blue-100 transition-colors duration-300 block py-2"
              onClick={() => {
                navigate("/about");
                closeMobileMenu();
              }}
            >
              About Us
            </span>
            <span
              className="cursor-pointer hover:text-blue-100 transition-colors duration-300 block py-2"
              onClick={() => scrollToSection("contact-section")}
            >
              Contact
            </span>
            {/* You can add mobile versions of your login/book buttons here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;