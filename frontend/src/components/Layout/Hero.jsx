import { Link } from "react-router-dom";
import heroImg from "../../assets/fstbanner.jpeg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-200 to-purple-300 overflow-hidden">
      <img
        src={heroImg}
        alt="Hero Banner"
        className="w-full h-[400px] lg:h-[750px] object-cover opacity-70"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <p className="text-sm tracking-tighter md:text-lg mb-3">Welcome to</p>
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-4">
            PetConnect
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Your ultimate destination for happy and healthy pets.
          </p>
          <div className="flex justify-center space-x-2 md:space-x-4"> {/* Container for buttons */}
            <Link
              to="/petsall"
              className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm md:text-lg font-semibold hover:bg-purple-600 transition-colors duration-300"
            >
              Explore Pets
            </Link>
            <Link
              to="/productsall"
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm md:text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;