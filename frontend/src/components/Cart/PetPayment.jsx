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
    setCheckoutId("dummy-checkout-id");
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Success:", details);
    navigate("/order-confirmation");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <input type="email" value={user.email} className="w-full p-2 border rounded" disabled />
          <h3 className="text-lg mb-4 mt-4">Pet Details</h3>
          <p><strong>Name:</strong> {pet.name}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Age:</strong> {pet.age} years</p>
          <p><strong>Price:</strong> ${pet.price}</p>
          {!checkoutId ? (
            <button type="submit" className="w-full bg-black text-white py-3 rounded mt-4">
              Continue to Payment
            </button>
          ) : (
            <PayPalButton amount={pet.price} onSuccess={handlePaymentSuccess} />
          )}
        </form>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="flex items-start justify-between py-2 border-b">
          <div className="flex items-start">
            <img src={pet.images[0]?.url} alt={pet.images[0]?.altText} className="w-20 h-24 object-cover mr-4" />
            <div>
              <h3 className="text-md">{pet.name}</h3>
              <p className="text-gray-500">Breed: {pet.breed}</p>
              <p className="text-gray-500">Age: {pet.age} years</p>
            </div>
          </div>
          <p className="text-xl">${pet.price}</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${pet.price}</p>
        </div>
      </div>
    </div>
  );
};

export default PetPayment;
