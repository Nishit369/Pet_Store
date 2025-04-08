import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa"
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
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
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
                
                // Get search query from URL parameters
                const searchQuery = searchParams.get('search');
                let url = 'http://localhost:9000/api/pets';
                
                // Build query string with all parameters
                const queryParams = new URLSearchParams();
                
                if (searchQuery) {
                    queryParams.append('search', searchQuery);
                }
                
                // Add other potential filter params to the API request
                const animal = searchParams.get('animal');
                const gender = searchParams.get('gender');
                const age = searchParams.get('age'); 
                const trained = searchParams.get('trained');
                const minPrice = searchParams.get('minPrice');
                const maxPrice = searchParams.get('maxPrice');
                const color = searchParams.get('color');
                
                // Convert animal type to lowercase to match backend enum
                if (animal) queryParams.append('type', animal.toLowerCase());
                if (gender) queryParams.append('gender', gender.toLowerCase());
                if (trained) queryParams.append('trained', trained);
                if (minPrice) queryParams.append('minPrice', minPrice);
                if (maxPrice) queryParams.append('maxPrice', maxPrice);
                
                // Handle age ranges
                if (age) {
                    // Convert age categories to numeric ranges for the backend
                    switch(age) {
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
                
                // Handle color with case insensitivity
                if (color) queryParams.append('color', color);
                
                // Append query string to URL if we have parameters
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
        <div className="flex flex-col lg:flex-row">
            {/*mobile filter button*/}
            <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
                <FaFilter className="mr-2" />Filters
            </button>
            {/** filter side bar */}
            <div ref={sidebarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar />
            </div>
            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">pets</h2>
                
                {/* Add Search Component */}
                <SearchBar contextType="pets" />
                
                {/** sort options */}
                <SortOptions />
                {/**product grid */}
                <ProductGrid 
                    products={products}
                    loading={loading} 
                    error={error}
                    productType="pets" 
                />
            </div>
        </div>
    );
}

export default CollectionPets;