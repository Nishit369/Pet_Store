import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ contextType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Get current search parameters and update the search query
    const current = Object.fromEntries([...searchParams]);
    
    if (searchQuery.trim()) {
      // Add search parameter
      setSearchParams({
        ...current,
        search: searchQuery.trim()
      });
    } else {
      // Remove search parameter if query is empty
      const { search, ...rest } = current;
      setSearchParams(rest);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex">
      <input
        type="text"
        placeholder={`Search ${contextType}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 flex items-center justify-center"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;