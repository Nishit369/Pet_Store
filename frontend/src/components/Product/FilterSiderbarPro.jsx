import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebarPro = () => {
    
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate =useNavigate();

  const [filters, setFilters] = useState({
    animal: "",
    brand: "",
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const animals = [
    "Dogs",
	"Cats",
	"Birds",
	"Fish"
  ];
  
  const brands = [
    "PawCare",
    "Feline Fresh",
    "PawStyle",
    "Whisker Delights",
    "PawFit",
    "ScratchMate",
    "PawPlay",
    "Feline Comfort",
    "PawPack",
    "PawDelights",
    "FelinePlay",
    "PawBites",
    "PawHouse",
    "PurrfectToys",
    "LaserPaws",
    "WhiskerBites",
    "SmartPet",
    "MeowStyle",
    "TravelPet",
    "PawHydrate",
    "FeatherPlay",
    "FeatherHome",
    "AquaCare",
    "FeatherFood",
    "AquaStyle",
    "PetPack"
];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      animal: params.animal || "",
      brand: params.brand || "",
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 10000,
    });
    setPriceRange([0, params.maxPrice ? Number(params.maxPrice) : 10000]);
  }, [searchParams]);
  
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
  
    // Iterate through filter keys and update URL parameters
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(",")); // Store arrays as comma-separated values
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]); // Store single values
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
 
  };
  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value); // Ensure it's a number
  
    setPriceRange([0, newPrice]);
  
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    
    setFilters(newFilters); // Correctly update state
    updateURLParams(newFilters); // Update the URL parameters
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Animal Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Animal</label>
        {animals.map((animal) => (
          <div key={animal} className="flex items-center mb-1">
            <input
              type="radio"
              name="animal"
              value={animal}
              onChange={handleFilterChange}
              checked={filters.animal ===animal}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{animal}</span>
          </div>
        ))}
      </div>

      
     {/* /appointment  */}
      
      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

        {/* price Filter */}
        <div className="mb-8">
            <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        
            <input
              type="range"
              name="priceRange" 
              min={0} 
              max={10000} 
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-gray-600 mt-2">
                <span>Rs.0</span>

                <span>Rs.{priceRange[1]}</span>
            </div>     
            
            
        </div>          
        
      </div>
     
  );

};
export default FilterSidebarPro;