import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <h1>Welcome to PetConnect</h1>
      <p>Find the best doctors for your pets.</p>
      <button className="hero-button" onClick={() => navigate("/collection-docs")}>
        Book Appointment
      </button>
    </div>
  );
};

export default HeroSection;