import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    animal: "",
    gender: "",
    age: "",
    trained: true,
    color: "",
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const animals = [
    "Dog",
    "Cat",
    "Rabbit",
    "Guinea Pig",
    "Hamster",
    "Turtle",
    "Bird",
    "Pigeon",
    "Dove",
  ];
  
  const genders = ["male", "female"];
  const trainedOptions = ["yes", "no"];
  const ages = ["new born", "young", "adult", "old"];
  
  // Common animal colors for all animals
  const colors = [
    "Black", 
    "White", 
    "Brown", 
    "Golden", 
    "Gray", 
    "Cream", 
    "Red", 
    "Orange",
    "Yellow",
    "Green", 
    "Blue",
    "Purple",
    "Pink",
    "Spotted", 
    "Striped",
    "Brindle", 
    "Multicolor"
  ];

  // Initialize filters from URL params
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    
    setFilters({
      animal: params.animal || "",
      gender: params.gender || "",
      age: params.age || "",
      trained: params.trained || "",
      color: params.color || "",
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 10000,
    });
    
    setPriceRange([
      Number(params.minPrice || 0),
      Number(params.maxPrice || 10000)
    ]);
  }, [searchParams]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    // Update the filters state
    const newFilters = { ...filters, [name]: value };
    
    // If animal changes, reset the color filter
    if (name === 'animal') {
      newFilters.color = "";
    }
    
    setFilters(newFilters);
    
    // Update URL params
    updateURLParams(newFilters);
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
  
    // Update price range state
    setPriceRange([0, newPrice]);
  
    // Update filters with new price range
    const newFilters = { 
      ...filters, 
      minPrice: 0, 
      maxPrice: newPrice 
    };
    
    setFilters(newFilters);
    
    // Update URL params
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    
    // Update or remove each parameter based on filter values
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 0) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // Update the URL without reloading the page
    setSearchParams(params);
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setFilters({
      animal: "",
      gender: "",
      age: "",
      trained: "",
      color: "",
      minPrice: 0,
      maxPrice: 10000,
    });
    
    setPriceRange([0, 10000]);
    setSearchParams(new URLSearchParams());
  };

  // Only show color filter when an animal type is selected
  const showColorFilter = filters.animal !== "";

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium text-gray-800">Filter</h3>
        <button 
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear All
        </button>
      </div>

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
              checked={filters.animal === animal}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{animal}</span>
          </div>
        ))}
      </div>

      {/* Color Filter - Show when any animal is selected */}
      {showColorFilter && (
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Color</label>
          {colors.map((color) => (
            <div key={color} className="flex items-center mb-1">
              <input
                type="radio"
                name="color"
                value={color}
                onChange={handleFilterChange}
                checked={filters.color === color}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700">{color}</span>
            </div>
          ))}
        </div>
      )}

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
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>          
        ))}
      </div>

      {/* Trained Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Trained</label>
        {trainedOptions.map((trained) => (
          <div key={trained} className="flex items-center mb-1">
            <input
              type="radio"
              name="trained"
              value={trained}
              onChange={handleFilterChange}
              checked={filters.trained === trained}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{trained}</span>
          </div>          
        ))}
      </div>

      {/* Age Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Age</label>
        {ages.map((age) => (
          <div key={age} className="flex items-center mb-1">
            <input
              type="radio"
              name="age"
              value={age}
              onChange={handleFilterChange}
              checked={filters.age === age}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{age}</span>
          </div>          
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
      
        <input
          type="range"
          name="maxPrice" 
          min={0} 
          max={10000} 
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" 
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>Rs.0</span>
          <span>Rs.{priceRange[1]}</span>
        </div>     
      </div>
    </div>
  );
};

export default FilterSidebar;