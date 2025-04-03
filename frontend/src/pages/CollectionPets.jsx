import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa"
import { useSearchParams } from "react-router-dom";
import FilterSidebar from '../components/Product/FilterSidebar';
import SortOptions from '../components/Product/SortOptions';
import ProductGrid from '../components/Product/ProductGrid';

const CollectionPets = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
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
                const response = await fetch('http://localhost:9000/api/pets');
                
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
    }, []);

    // Apply filters and sorting when products or search params change
    useEffect(() => {
        if (!products.length) return;
        
        let result = [...products];
        
        // Apply filters
        const animal = searchParams.get('animal');
        const gender = searchParams.get('gender');
        const age = searchParams.get('age');
        const trained = searchParams.get('trained');
        const minPrice = searchParams.get('minPrice') || 0;
        const maxPrice = searchParams.get('maxPrice') || 10000;
        
        if (animal) {
            result = result.filter(pet => pet.type?.toLowerCase() === animal.toLowerCase());
        }
        
        if (gender) {
            result = result.filter(pet => pet.gender?.toLowerCase() === gender.toLowerCase());
        }
        
        if (age) {
            result = result.filter(pet => categorizeAge(pet.age) === age.toLowerCase());
        }
        
        function categorizeAge(age) {
            if (age <= 1) return 'new born';
            if (age <= 3) return 'young';
            if (age <= 7) return 'adult';
            return 'old';
        }
        
        if (trained) {
            result = result.filter(pet => 
                trained === 'yes' ? pet.trained : !pet.trained
            );
        }
        
        // Filter by price range
        result = result.filter(pet => 
            pet.price >= Number(minPrice) && pet.price <= Number(maxPrice)
        );
        
        // Apply sorting
        const sortBy = searchParams.get('sortBy');
        if (sortBy) {
            switch (sortBy) {
                case 'priceAsc':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'priceDesc':
                    result.sort((a, b) => b.price - a.price);
                    break;
                case 'popularity':
                    // Assuming you have a 'popularity' or 'ratings' field
                    result.sort((a, b) => b.popularity - a.popularity);
                    break;
                default:
                    // Default sorting logic if needed
                    break;
            }
        }
        
        setFilteredProducts(result);
    }, [products, searchParams]);

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
                {/** sort options */}
                <SortOptions />
                {/**product grid */}
                <ProductGrid 
                    products={filteredProducts} 
                    loading={loading} 
                    error={error}
                    productType="pets" 
                />
            </div>
        </div>
    );
}

export default CollectionPets;