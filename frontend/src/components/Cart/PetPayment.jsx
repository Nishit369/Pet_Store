import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const PetPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    specialInstructions: ""
  });
  
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/api/pets/${id}`);
        if (!response.ok) throw new Error("Failed to fetch pet data");
        const data = await response.json();
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const user = { email: "test@example.com" };

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    // Validate form fields
    if (!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address || 
        !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country || 
        !shippingAddress.phone) {
      alert("Please fill in all required fields");
      return;
    }
    setCheckoutId("dummy-checkout-id");
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Success:", details);
    console.log("Shipping Details:", shippingAddress);
    navigate(`/pet/success/${id}`);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">Error: {error}</p>
        <p className="mt-2">Please try again or contact support</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Complete Your Pet Adoption</h2>
        <form onSubmit={handleCreateCheckout}>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Contact Details</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={user.email} 
                className="w-full p-2 border rounded bg-gray-50" 
                disabled 
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={shippingAddress.firstName}
                  onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={shippingAddress.lastName}
                  onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Address *</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Country *</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                value={shippingAddress.phone}
                onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Special Instructions</label>
              <textarea
                value={shippingAddress.specialInstructions}
                onChange={(e) => setShippingAddress({...shippingAddress, specialInstructions: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Any additional information we should know about your pet adoption"
              ></textarea>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Pet Details</h3>
            <div className="bg-blue-50 p-4 rounded mb-4">
              <div className="flex flex-col md:flex-row md:items-center mb-2">
                <span className="font-medium mr-2">Name:</span> 
                <span>{pet.name}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center mb-2">
                <span className="font-medium mr-2">Breed:</span> 
                <span>{pet.breed}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center mb-2">
                <span className="font-medium mr-2">Age:</span> 
                <span>{pet.age} years</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="font-medium mr-2">Adoption Fee:</span> 
                <span className="text-blue-700 font-semibold">${pet.price}</span>
              </div>
            </div>
          </div>
          
          {!checkoutId ? (
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 font-medium">
              Continue to Payment
            </button>
          ) : (
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Payment Method</h3>
              <PayPalButton amount={pet.price} onSuccess={handlePaymentSuccess} />
            </div>
          )}
        </form>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-6 border-b pb-2">Order Summary</h3>
        
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-start justify-between py-2">
            <div className="flex items-start">
              <img 
                src={pet.images[0]?.url} 
                alt={pet.images[0]?.altText || pet.name} 
                className="w-20 h-24 object-cover mr-4 rounded"
              />
              <div>
                <h3 className="text-md font-medium">{pet.name}</h3>
                <p className="text-gray-500 text-sm">Breed: {pet.breed}</p>
                <p className="text-gray-500 text-sm">Age: {pet.age} years</p>
                <div className="mt-2 bg-green-100 text-green-800 text-xs py-1 px-2 rounded inline-block">
                  Ready for adoption
                </div>
              </div>
            </div>
            <p className="text-xl font-medium">${pet.price}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-600">Adoption Fee</p>
            <p>${pet.price}</p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-600">Processing Fee</p>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-600">Veterinary Check</p>
            <p className="text-green-600">Included</p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-600">Microchipping</p>
            <p className="text-green-600">Included</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-lg font-medium mt-4 pt-4 border-t">
          <p>Total</p>
          <p className="text-blue-700">${pet.price}</p>
        </div>
        
        <div className="mt-8 bg-blue-50 p-4 rounded text-sm">
          <h4 className="font-medium text-blue-700 mb-2">What's included:</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Initial veterinary check-up
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Pet microchipping
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Starter kit with food samples
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              30-day adoption support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PetPayment;