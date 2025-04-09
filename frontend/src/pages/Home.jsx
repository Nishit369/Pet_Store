import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import DocAppBnr from "../components/Product/DocAppBnr";
import MainPro from "../components/Product/MainPro";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";
import ProductGrid from "../components/Product/ProductGrid";
import ConsultationBanner from "../pages/ConsultationBanner"; // New component
import FeaturedCategories from "../pages/FeaturedCategories"; // New component

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products for Dogs (you can adjust this or fetch more categories)
    dispatch(
      fetchProductsByFilters({
        animal: "Dogs",
        limit: 8,
      })
    );
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <Hero />
      <MainPro />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Online Consultation Banner */}
      <ConsultationBanner />

      <div className="container mx-auto py-8">
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
          Top Picks for Your Furry Friends
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <DocAppBnr />
    </div>
  );
};

export default Home;