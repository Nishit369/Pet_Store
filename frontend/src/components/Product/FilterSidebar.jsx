import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
    
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate =useNavigate();

  const [filters, setFilters] = useState({
    animal: "",
    gender: "",
    age: "",
    trained: "",
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const animals = [
    "Dogs",
    "Cats",
    "Rabbits",
    "Guinea Pigs",
    "Hamsters",
    "Turtles",
    "Parrots",
    "Pigeons",
    "Doves",
  ];
  
  const genders = ["male", "female"];
  const trainedOptions = ["yes", "no"];
  const ages = ["new born", "young", "adult", "old"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      animal: params.animal || "",
      gender: params.gender || "", // Fixed case (params.Gender → params.gender)
      age: params.age || "",
      trained: params.trained || "",
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 10000,
    });
    setPriceRange([0, params.maxPrice ? Number(params.maxPrice) : 10000]);
  }, [searchParams]);
  
  const handleFilterChange = (e) => {
    const{name, value, checked, type } =e.target
    let newFilters = { ...filters };

if (type === "checkbox") {
  if (checked) {
    // Add the selected value to the array (avoid duplicates)
    newFilters[name] = [...(newFilters[name] || []), value];
  } else {
    // Remove the unchecked value from the array
    newFilters[name] = newFilters[name].filter((item) => item !== value);  
  }
}else{
    newFilters[name] = value;
}
setFilters(newFilters);
console.log(newFilters);
    
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

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender ===gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>          
        ))}
      
      
      </div>
      {/* trained Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Trained</label>
        {trainedOptions.map((trained) => (
          <div key={trained} className="flex items-center mb-1">
            <input
              type="radio"
              name="trained"
              value={trained}
              onChange={handleFilterChange}
              checked={filters.trained ===trained}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{trained}</span>
          </div>          
        ))}
        {/* age Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">age</label>
        {ages.map((age) => (
          <div key={age} className="flex items-center mb-1">
            <input
              type="radio"
              name="age"
              value={age}
              onChange={handleFilterChange}
              checked={filters.age ===age}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{age}</span>
          </div>          
        ))}
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
      </div>
    </div>
  );
};

export default FilterSidebar;