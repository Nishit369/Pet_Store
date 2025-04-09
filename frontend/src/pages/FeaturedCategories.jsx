import { Link } from "react-router-dom";
import dogFoodImg from "../assets/dog-food.webp"; // Replace with your actual image
import catToysImg from "../assets/cat-toys.webp"; // Replace with your actual image
import petAccessoriesImg from "../assets/pet-accessories.jpg"; // Replace with your actual image

const FeaturedCategories = () => {
  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">
          Explore Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dog Food */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={dogFoodImg}
              alt="Dog Food"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Link
                to="/productsall?category=dog-food" // Adjust your route and query
                className="text-white text-lg font-semibold hover:underline"
              >
                Dog Food
              </Link>
            </div>
          </div>

          {/* Cat Toys */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={catToysImg}
              alt="Cat Toys"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Link
                to="/productsall?category=cat-toys" // Adjust your route and query
                className="text-white text-lg font-semibold hover:underline"
              >
                Cat Toys
              </Link>
            </div>
          </div>

          {/* Pet Accessories */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={petAccessoriesImg}
              alt="Pet Accessories"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Link
                to="/productsall?category=accessories" // Adjust your route and query
                className="text-white text-lg font-semibold hover:underline"
              >
                Pet Accessories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;