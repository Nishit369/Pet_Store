import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from '../components/Product/FilterSidebar';
import SortOptions from '../components/Product/SortOptions';
import ProductGrid from '../components/Product/ProductGrid';
import SearchBar from '../components/Common/SearchBar';

const CollectionPets = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const sidebarRef = useRef(null);
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    const toggleSidebar = () => {
        setSideBarOpen(!isSideBarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setSideBarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true);
                const searchQuery = searchParams.get('search');
                let url = 'http://localhost:9000/api/pets';
                const queryParams = new URLSearchParams();

                if (searchQuery) queryParams.append('search', searchQuery);
                const animal = searchParams.get('animal');
                const gender = searchParams.get('gender');
                const age = searchParams.get('age');
                const trained = searchParams.get('trained');
                const minPrice = searchParams.get('minPrice');
                const maxPrice = searchParams.get('maxPrice');
                const color = searchParams.get('color');

                if (animal) queryParams.append('type', animal.toLowerCase());
                if (gender) queryParams.append('gender', gender.toLowerCase());
                if (trained) queryParams.append('trained', trained);
                if (minPrice) queryParams.append('minPrice', minPrice);
                if (maxPrice) queryParams.append('maxPrice', maxPrice);

                if (age) {
                    switch (age) {
                        case 'new born':
                            queryParams.append('maxAge', 1);
                            break;
                        case 'young':
                            queryParams.append('minAge', 1);
                            queryParams.append('maxAge', 3);
                            break;
                        case 'adult':
                            queryParams.append('minAge', 3);
                            queryParams.append('maxAge', 7);
                            break;
                        case 'old':
                            queryParams.append('minAge', 7);
                            break;
                    }
                }

                if (color) queryParams.append('color', color);

                if (queryParams.toString()) {
                    url += `?${queryParams.toString()}`;
                }

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch pets: ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching pets:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, [searchParams]);

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-100 py-10 px-6 md:px-10 lg:px-12 min-h-screen relative flex flex-col lg:flex-row">
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
                className={`${isSideBarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"} fixed inset-y-0 z-40 left-0 w-full sm:max-w-xs bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:border-r lg:border-gray-200`}
            >
                <div className="py-8 px-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 tracking-wide">Filter Options</h3>
                    <FilterSidebar />
                </div>
            </aside>

            {/* Main Content */}
            <div className=" p-4 md:p-6 lg:pl-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight uppercase mb-4 md:mb-0">
                        Find Your Perfect Companion
                    </h2>
                    <div className="w-full md:w-auto">
                        <SearchBar contextType="pets" />
                    </div>
                </div>

                {/* Sort Options */}
                <div className="mb-8">
                    <SortOptions />
                </div>

                {/* Product Grid */}
                <div className="mt-8">
                    <ProductGrid
                        products={products}
                        loading={loading}
                        error={error}
                        productType="pets"
                    />
                </div>
            </div>
        </div>
    );
}

export default CollectionPets;