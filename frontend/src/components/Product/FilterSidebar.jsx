import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/outline";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    animal: "",
    gender: "",
    age: "",
    trained: "",
    color: "",
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [expandedFilters, setExpandedFilters] = useState({});

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
    const newFilters = { ...filters, [name]: value };
    if (name === 'animal') {
      newFilters.color = "";
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = {
      ...filters,
      minPrice: 0,
      maxPrice: newPrice
    };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 0) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
  };

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

  const toggleFilterGroup = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const isFilterGroupExpanded = (filterName) => !!expandedFilters[filterName];
  const showColorFilter = filters.animal !== "";

  return (
    <div className="bg-white shadow rounded-md p-6 sticky top-20">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-semibold text-gray-800">Filter</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:underline focus:outline-none transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      {/* Animal Filter */}
      <div className="mb-4 rounded-md border border-gray-200">
        <button
          onClick={() => toggleFilterGroup('animal')}
          className="w-full flex justify-between items-center text-gray-800 font-semibold py-3 px-4 rounded-t-md focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        >
          Animal
          <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isFilterGroupExpanded('animal') ? 'rotate-180' : ''}`} />
        </button>
        {isFilterGroupExpanded('animal') && (
          <div className="mt-2 pl-4 pr-2 py-2">
            {animals.map((animal) => (
              <div key={animal} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="animal"
                  value={animal}
                  onChange={handleFilterChange}
                  checked={filters.animal === animal}
                  className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-full"
                />
                <label htmlFor={animal} className="text-gray-700">{animal}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      {showColorFilter && (
        <div className="mb-4 rounded-md border border-gray-200">
          <button
            onClick={() => toggleFilterGroup('color')}
            className="w-full flex justify-between items-center text-gray-800 font-semibold py-3 px-4 focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            Color
            <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isFilterGroupExpanded('color') ? 'rotate-180' : ''}`} />
          </button>
          {isFilterGroupExpanded('color') && (
            <div className="mt-2 pl-4 pr-2 py-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    onChange={handleFilterChange}
                    checked={filters.color === color}
                    className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-full"
                  />
                  <label htmlFor={color} className="text-gray-700">{color}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gender Filter */}
      <div className="mb-4 rounded-md border border-gray-200">
        <button
          onClick={() => toggleFilterGroup('gender')}
          className="w-full flex justify-between items-center text-gray-800 font-semibold py-3 px-4 focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        >
          Gender
          <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isFilterGroupExpanded('gender') ? 'rotate-180' : ''}`} />
        </button>
        {isFilterGroupExpanded('gender') && (
          <div className="mt-2 pl-4 pr-2 py-2">
            {genders.map((gender) => (
              <div key={gender} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  onChange={handleFilterChange}
                  checked={filters.gender === gender}
                  className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-full"
                />
                <label htmlFor={gender} className="text-gray-700">{gender}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trained Filter */}
      <div className="mb-4 rounded-md border border-gray-200">
        <button
          onClick={() => toggleFilterGroup('trained')}
          className="w-full flex justify-between items-center text-gray-800 font-semibold py-3 px-4 focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        >
          Trained
          <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isFilterGroupExpanded('trained') ? 'rotate-180' : ''}`} />
        </button>
        {isFilterGroupExpanded('trained') && (
          <div className="mt-2 pl-4 pr-2 py-2">
            {trainedOptions.map((trained) => (
              <div key={trained} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="trained"
                  value={trained}
                  onChange={handleFilterChange}
                  checked={filters.trained === trained}
                  className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-full"
                />
                <label htmlFor={trained} className="text-gray-700">{trained}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Age Filter */}
      <div className="mb-4 rounded-md border border-gray-200">
        <button
          onClick={() => toggleFilterGroup('age')}
          className="w-full flex justify-between items-center text-gray-800 font-semibold py-3 px-4 focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        >
          Age
          <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isFilterGroupExpanded('age') ? 'rotate-180' : ''}`} />
        </button>
        {isFilterGroupExpanded('age') && (
          <div className="mt-2 pl-4 pr-2 py-2">
            {ages.map((age) => (
              <div key={age} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="age"
                  value={age}
                  onChange={handleFilterChange}
                  checked={filters.age === age}
                  className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded-full"
                />
                <label htmlFor={age} className="text-gray-700">{age}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6 rounded-md border border-gray-200 p-4">
        <label htmlFor="priceRange" className="block text-gray-600 font-medium mb-2">Price Range</label>

        <input
          type="range"
          name="maxPrice"
          min={0}
          max={10000}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
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