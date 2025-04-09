import { Link } from "react-router-dom";
import petImg from "../../assets/pets.webp";
import proImg from "../../assets/products.jpeg";

const MainPro = () => {
  return (
    <section className="py-16 px-2 md:px-4 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Pets Section */}
        <div className="relative flex-1 rounded-lg overflow-hidden shadow-md">
          <img
            src={petImg}
            alt="Pets Section"
            className="w-full h-[400px] object-cover opacity-90"
          />
          <div className="absolute bottom-6 left-6 bg-white bg-opacity-95 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Find Your Perfect Companion
            </h2>
            <Link
              to="/petsall"
              className="text-purple-600 font-semibold hover:underline text-sm md:text-base"
            >
              Explore Pets <span className="ml-1">🐾</span>
            </Link>
          </div>
        </div>

        {/* Products Section */}
        <div className="relative flex-1 rounded-lg overflow-hidden shadow-md">
          <img
            src={proImg}
            alt="Product Section"
            className="w-full h-[400px] object-cover opacity-90"
          />
          <div className="absolute bottom-6 left-6 bg-white bg-opacity-95 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Premium Products for Happy Pets
            </h2>
            <Link
              to="/productsall"
              className="text-blue-600 font-semibold hover:underline text-sm md:text-base"
            >
              Shop Products <span className="ml-1">🛍️</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPro;