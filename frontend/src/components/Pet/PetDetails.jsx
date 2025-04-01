import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const PetDetails = ({ petId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedPet, loading, error, similarPets } = useSelector(
    (state) => state.pets
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const petFetchId = petId || id;

  useEffect(() => {
    if (petFetchId) {
      dispatch(fetchPetDetails(petFetchId));
      dispatch(fetchSimilarPets({ id: petFetchId, type: selectedPet?.type }));
    }
  }, [dispatch, petFetchId, selectedPet?.type]);

  useEffect(() => {
    if (selectedPet?.images?.length > 0) {
      setMainImage(selectedPet.images[0].url);
    }
  }, [selectedPet]);

  const handleAddToCart = () => {
    if (!selectedPet.isAvailable) {
      toast.error("This pet is not available", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        itemType: "pet",
        itemId: petFetchId,
        quantity: 1,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Pet added to cart!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6">
      {selectedPet && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedPet.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }\`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-1/2">
              <img
                src={mainImage || selectedPet.images[0]?.url}
                alt={selectedPet.name}
                className="w-full h-auto object-cover rounded-lg"
              />
              {/* Mobile Thumbnails */}
              <div className="flex md:hidden space-x-4 mt-4">
                {selectedPet.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index}`}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                      mainImage === image.url ? "border-black" : "border-gray-300"
                    }\`}
                    onClick={() => setMainImage(image.url)}
                  />
                ))}
              </div>
            </div>

            {/* Pet Details */}
            <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
              <h1 className="text-3xl font-bold mb-4">{selectedPet.name}</h1>
              <p className="text-xl font-semibold mb-4">${selectedPet.price}</p>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-semibold">{selectedPet.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Breed</p>
                    <p className="font-semibold">{selectedPet.breed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Age</p>
                    <p className="font-semibold">{selectedPet.age} years</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p className="font-semibold">{selectedPet.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Size</p>
                    <p className="font-semibold">{selectedPet.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-semibold">
                      {selectedPet.isAvailable ? "Available" : "Not Available"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">Training</p>
                  <p className="font-semibold">
                    {selectedPet.trained ? "Trained" : "Not Trained"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Vaccination</p>
                  <p className="font-semibold">
                    {selectedPet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{selectedPet.description}</p>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled || !selectedPet.isAvailable}
                className={`w-full py-3 px-6 text-white font-semibold rounded-lg ${
                  selectedPet.isAvailable
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }\`}
              >
                {selectedPet.isAvailable ? "Add to Cart" : "Not Available"}
              </button>
            </div>
          </div>

          {/* Similar Pets */}
          {similarPets && similarPets.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Similar Pets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarPets.map((pet) => (
                  <PetCard key={pet._id} pet={pet} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PetDetails;
