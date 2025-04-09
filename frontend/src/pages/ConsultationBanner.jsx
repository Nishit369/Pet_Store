import { Link } from "react-router-dom";

const ConsultationBanner = () => {
  return (
    <section className="bg-gradient-to-r from-purple-400 to-blue-500 text-white py-12 px-4 md:px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Need Expert Veterinary Advice?</h2>
        <p className="text-lg mb-6">
          Connect with experienced veterinarians online for consultations and guidance.
        </p>
        <Link
          to="/doc" // Link to your Veterinarians page
          className="bg-white text-purple-500 font-semibold py-3 px-6 rounded-md hover:bg-purple-100 transition-colors duration-300"
        >
          Book a Consultation
        </Link>
      </div>
    </section>
  );
};

export default ConsultationBanner;