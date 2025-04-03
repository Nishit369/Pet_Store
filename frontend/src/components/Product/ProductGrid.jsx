import { Link, useLocation } from "react-router-dom";

const ProductGrid = ({ products, loading, error, productType }) => {
  const location = useLocation();
  const isPetRoute = location.pathname.includes("/petsall");
  
  // Function to determine if checkout button should be shown
  const shouldShowCheckoutButton = (product) => {
    // Show checkout button if explicitly on petsall route
    if (isPetRoute) return true;
    
    // Show checkout button if product type is explicitly set to "pets"
    if (productType === "pets") return true;
    
    // Show checkout button if product category is pet (if your data has such property)
    if (product.category === "pets") return true;
    
    // Otherwise don't show checkout button
    return false;
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => {
        // Determine the appropriate link path based on product type
        const linkPath = shouldShowCheckoutButton(product) 
          ? `/pets/${product._id}` 
          : `/product/${product._id}`;
          
        return (
          <div key={index} className="bg-white p-4 rounded-lg">
            <Link to={linkPath} className="block">
              <div className="w-full h-96 mb-4">
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alText || product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-sm mb-2">{product.name}</h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter">
                $ {product.price}
              </p>
            </Link>
            
            {/* Checkout button only for pets */}
            {shouldShowCheckoutButton(product) && (
              <div className="mt-4">
                <Link 
                  to={`/pets/${product._id}`} 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center font-medium"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;