import { Link } from "react-router-dom";
import petImg from "../../assets/pets.webp";
import proImg from "../../assets/products.jpeg";

const MainPro = () => {
  return (
    <section className="py-16 px-2 md:px-4 lg:px-8">
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        {/* Pets Section */}
        <div className="relative flex-1">
          <img src={petImg} alt="Pets Section" className="w-full h-[500px] object-cover" />
          <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 p-3">
            <h2 className="text-lg font-semibold">PET'S SECTION</h2>
            <Link to="/petsall" className="text-gray-900 underline">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Products Section */}
        <div className="relative flex-1">
          <img src={proImg} alt="Product Section" className="w-full h-[500px] object-cover" />
          <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 p-3">
            <h2 className="text-lg font-semibold">PRODUCT'S SECTION</h2>
            <Link to="/productsall" className="text-gray-900 underline">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPro;