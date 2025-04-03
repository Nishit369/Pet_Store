import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }
    
    setSearchParams(params);
  };
  
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="text-gray-500">
        <span id="productCount">
          {/* You can add product count here */}
        </span>
      </div>
      
      <div className="flex items-center">
        <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
        <select
          id="sort"
          onChange={handleSortChange}
          value={searchParams.get("sortBy") || ""}
          className="border p-2 rounded-md focus:outline-none"
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </div>
  );
};

export default SortOptions;