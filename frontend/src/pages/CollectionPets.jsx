import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa"
import FilterSidebar from '../components/Product/FilterSidebar';
import SortOptions from '../components/Product/SortOptions';
import ProductGrid from '../components/Product/ProductGrid';

const CollectionPets = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                console.log(data)
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