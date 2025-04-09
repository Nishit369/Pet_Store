import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/outline";

const FilterSidebarPro = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    animal: "",
    brand: [],
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [expandedFilters, setExpandedFilters] = useState({});

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
      brand: params.brand ? params.brand.split(",") : [],
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
    const params = new URLSearchParams(searchParams);

    params.delete("animal");
    params.delete("brand");
    params.delete("minPrice");
    params.delete("maxPrice");

    if (newFilters.animal) {
      params.set("animal", newFilters.animal);
    }

    if (newFilters.brand && newFilters.brand.length > 0) {
      params.set("brand", newFilters.brand.join(","));
    }

    if (newFilters.minPrice) {
      params.set("minPrice", newFilters.minPrice);
    }

    if (newFilters.maxPrice) {
      params.set("maxPrice", newFilters.maxPrice);
    }

    setSearchParams(params);
  };


  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);

    setPriceRange([0, newPrice]);

    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleClearAll = () => {
    const defaultFilters = {
      animal: "",
      brand: [],
      minPrice: 0,
      maxPrice: 10000
    };

    setFilters(defaultFilters);
    setPriceRange([0, 10000]);

    const params = new URLSearchParams(searchParams);
    params.delete("animal");
    params.delete("brand");
    params.delete("minPrice");
    params.delete("maxPrice");
    setSearchParams(params);
  };

  const toggleFilterGroup = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const isFilterGroupExpanded = (filterName) => !!expandedFilters[filterName];

  return (
    <div className="bg-white shadow rounded-md p-6 sticky top-20">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-semibold text-gray-800">Filter</h3>
        <button
          onClick={handleClearAll}
          className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-200"
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

      {/* Brand Filter */}
      <div className="mb-4 rounded-md border border-gray-200">
        <button
          onClick={() => toggleFilterGroup('brand')}
          className="w-full flex justify-between items-center text-gray-800 font-semibold py-3 px-4 focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        >
          Brand
          <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isFilterGroupExpanded('brand') ? 'rotate-180' : ''}`} />
        </button>
        {isFilterGroupExpanded('brand') && (
          <div className="mt-2 pl-4 pr-2 py-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  onChange={handleFilterChange}
                  checked={filters.brand.includes(brand)}
                  className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor={brand} className="text-gray-700">{brand}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6 rounded-md border border-gray-200 p-4">
        <label htmlFor="priceRange" className="block text-gray-600 font-semibold mb-3">Price Range</label>

        <input
          type="range"
          name="priceRange"
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

export default FilterSidebarPro;