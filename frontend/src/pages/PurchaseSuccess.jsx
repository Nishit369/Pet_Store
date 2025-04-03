import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function PurchaseSuccess() {
  const location = useLocation();
  const pet = location.state?.pet;
  
  if (!pet) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank you for your purchase!</h1>
        <p className="mb-4">Your order has been successfully processed.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Purchase Successful!</h1>
          <p className="text-green-600 text-lg">
            Congratulations on your new pet!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          {pet.images && pet.images.length > 0 && (
            <img 
              src={pet.images[0].url}
              alt={pet.name}
              className="w-full md:w-1/3 rounded-lg object-cover"
            />
          )}
          
          <div>
            <h2 className="text-xl font-semibold">{pet.name}</h2>
            <p className="text-gray-600">{pet.breed}</p>
            <p className="text-gray-800 mt-2">Purchase price: ${pet.price}</p>
            <p className="mt-4">
              We'll contact you shortly with next steps for bringing {pet.name} home!
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccess;