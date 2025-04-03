import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Link } from 'react-router-dom';

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
  
  if (loading) return <div className="p-4">Loading pet details...</div>;
  
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  
  if (!pet) return <div className="p-4">No pet found</div>;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout for: {pet.name}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pet Image */}
          <div>
            {pet.images && pet.images.length > 0 && (
              <img 
                src={pet.images[0].url}
                alt={pet.name}
                className="w-full h-auto rounded-lg object-cover"
              />
            )}
          </div>
          
          {/* Pet Details */}
          <div>
            <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
            <p className="text-gray-600 mb-2">{pet.breed}</p>
            <p className="text-gray-800 mb-4">{pet.description}</p>
            
            <div className="text-2xl font-bold mb-6">
              ${pet.price}
            </div>
            
            {/* Checkout Form */}
            <form className="space-y-4" onSubmit={handleCheckout}>
              {/* You could add payment method options or other fields here */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCheckout;