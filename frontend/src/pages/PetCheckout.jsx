import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { FaPaw, FaVenusMars, FaRuler, FaSyringe, FaGraduationCap } from 'react-icons/fa';

function PetCheckout() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:9000/api/pets/${productId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch pet data: ${response.statusText}`);
        }
        
        const data = await response.json();
        setPet(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching pet data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      fetchPetData();
    }
  }, [productId]);
  
  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!pet) return;
    
    try {
      setIsProcessing(true);
      
      // Send request to your backend to process the purchase
      const response = await fetch('http://localhost:9000/api/pets/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId: productId,
          // Include any other necessary data (user ID, payment info, etc.)
          // userId: user?._id or from auth state
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process purchase');
      }
      
      // If successful, show success message and redirect
      toast.success(`Successfully purchased ${pet.name}!`, {
        duration: 3000,
      });
      
      // Redirect to a success/confirmation page
      navigate('/purchase-success', { state: { pet } });
      
    } catch (err) {
      toast.error(err.message || 'Failed to complete purchase', {
        duration: 3000,
      });
      console.error('Purchase error:', err);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Helper function to capitalize first letter
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Helper function to format the age appropriately
  const formatAge = (age) => {
    if (age < 1) {
      const months = Math.round(age * 12);
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    return `${age} year${age !== 1 ? 's' : ''}`;
  };
  
  if (loading) return <div className="p-4 flex justify-center items-center h-64">Loading pet details...</div>;
  
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  
  if (!pet) return <div className="p-4">No pet found</div>;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout for: {pet.name}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pet Image and Key Details */}
          <div className="space-y-4">
            {pet.images && pet.images.length > 0 ? (
              <img 
                src={pet.images[0].url}
                alt={pet.name}
                className="w-full h-auto rounded-lg object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            
            
            {/* Price card */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Price</h3>
              <p className="text-3xl font-bold text-blue-900">Rs. {pet.price}</p>
            </div>
          </div>
          
          {/* Pet Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-1">{pet.name}</h2>
            <div className="flex items-center space-x-2 mb-4">
              <FaPaw className="text-blue-600" />
              <span className="text-lg text-gray-700">{capitalize(pet.type)} · {pet.breed}</span>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">About {pet.name}</h3>
              <p className="text-gray-700">{pet.description}</p>
            </div>
            
            {/* Key characteristics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <FaVenusMars className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{capitalize(pet.gender)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-bold">Age</span>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{formatAge(pet.age)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <FaRuler className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-medium">{capitalize(pet.size)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: pet.color.toLowerCase() === 'black' ? '#000' : pet.color.toLowerCase() }}></div>
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-medium">{pet.color}</p>
                </div>
              </div>
            </div>
            
            {/* Health & Training */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Health & Training</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <FaSyringe className={pet.vaccinated ? "text-green-600 mr-2" : "text-gray-400 mr-2"} />
                  <span className={pet.vaccinated ? "text-green-600" : "text-gray-500"}>
                    {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaGraduationCap className={pet.trained ? "text-green-600 mr-2" : "text-gray-400 mr-2"} />
                  <span className={pet.trained ? "text-green-600" : "text-gray-500"}>
                    {pet.trained ? "Trained" : "Not Trained"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Checkout Form */}
            <form className="space-y-4" onSubmit={handleCheckout}>
              <p className="text-sm text-gray-600">
                By completing this purchase, you agree to our terms and conditions for pet adoption.
              </p>
              
              {/* Fixed checkout button - removing the Link wrapper and just using the form submission */}
              <Link to={`/pet/checkout/${productId}`}>
              <button 
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-md transition duration-300 ${
                  isProcessing 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isProcessing ? "Processing..." : "Complete Purchase"}
              </button>
              </Link>
             
            </form>
            
            {/* Return link */}
            <div className="mt-4 text-center">
              <Link to="/petsall" className="text-blue-600 hover:underline">
                Return to Pet Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCheckout;