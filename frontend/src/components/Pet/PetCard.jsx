import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <Link to={`/pets/${pet._id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <div className="relative aspect-square">
          <img
            src={pet.images[0]?.url}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
          {!pet.isAvailable && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                Not Available
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{pet.name}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{pet.breed}</span>
            <span className="text-blue-600 font-semibold">${pet.price}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
            <div>
              <span>Age: </span>
              <span className="font-medium">{pet.age} years</span>
            </div>
            <div>
              <span>Gender: </span>
              <span className="font-medium">{pet.gender}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
