import PetCard from "./PetCard";

const PetGrid = ({ pets }) => {
  if (!pets || pets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No pets found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet._id} pet={pet} />
      ))}
    </div>
  );
};

export default PetGrid;
