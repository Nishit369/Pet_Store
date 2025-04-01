import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import DocAppBnr from "../components/Product/DocAppBnr";

import MainPro from "../components/Product/MainPro";

import NewArrivals from "../components/Product/NewArrivals";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";
import ProductDetails from "../components/Product/ProductDetails";
import ProductGrid from "../components/Product/ProductGrid";


const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        animal: "Dogs",
        limit: 8,
      })
    );
    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <MainPro />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product ...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <DocAppBnr />
      
    </div>
  );
};
export default Home;
