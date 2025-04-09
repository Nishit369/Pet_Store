import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import FilterSidebarPro from "../components/Product/FilterSiderbarPro";
import SortOptions from "../components/Product/SortOptions";
import ProductGrid from "../components/Product/ProductGrid";
import SearchBar from "../components/Common/SearchBar";

const CollectionProducts = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 py-10 px-6 md:px-10 lg:px-12 min-h-screen flex flex-col lg:flex-row relative">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-8 left-8 bg-purple-600 text-white shadow-lg rounded-full p-3 z-50 hover:bg-purple-700 focus:outline-none transition duration-300 ease-in-out lg:hidden"
      >
        <FaFilter className="h-5 w-5" />
      </button>

      {/* Filter Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        } fixed inset-y-0 z-40 left-0 w-full sm:max-w-xs bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:border-r lg:border-gray-200`}
      >
        <div className="py-8 px-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-wide">Filter Products</h3>
          <FilterSidebarPro />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-6 lg:pl-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight uppercase mb-4 md:mb-0">
            {collection ? `${collection} Collection` : "All Products"}
          </h2>
          <div className="w-full md:w-auto">
            <SearchBar contextType="products" />
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-8">
          <SortOptions />
        </div>

        {/* Product Grid */}
        <div className="mt-8"> {/* Removed the grid class here */}
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};
export default CollectionProducts;