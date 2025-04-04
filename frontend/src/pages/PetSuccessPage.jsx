import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PurchaseSuccess() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:9000/api/pets/${productId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch pet data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
        setPet(data);
      } catch (err) {
        console.error("Error fetching pet data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchPetData();
    }
  }, [productId]);

  if (loading) return <div className="p-6 text-center">Loading purchase details...</div>;

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!pet) return <div className="p-6 text-center">No pet found.</div>;

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Purchase Successful! 🎉</h1>
      <p className="mb-6 text-gray-700">Thanks for adopting <span className="font-semibold">{pet.name}</span>! They're lucky to have you 🐾</p>

      <div className="bg-white shadow-lg rounded-lg p-6 inline-block">
        {pet.images?.[0]?.url && (
          <img 
            src={pet.images[0].url} 
            alt={pet.name} 
            className="w-64 h-64 object-cover rounded-lg mx-auto mb-4"
          />
        )}
        <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
        <p className="text-gray-600">{pet.breed}</p>
        <p className="text-gray-700 mt-2">{pet.description}</p>
        <p className="text-lg font-bold text-green-700 mt-4">${pet.price}</p>
      </div>

      <div className="mt-6">
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PurchaseSuccess;
