import { useEffect, useState } from "react";
import { FaPaw, FaEdit, FaTrash, FaPlus, FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";

const PetManagement = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: "",
    breed: "",
    gender: "",
    size: "",
    minPrice: "",
    maxPrice: "",
    search: ""
  });
  const [showFilters, setShowFilters] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentPet, setCurrentPet] = useState({
    name: "",
    description: "",
    price: "",
    breed: "",
    age: "",
    gender: "",
    size: "",
    type: "",
    vaccinated: false,
    trained: false,
    images: [],
    isAvailable: true
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("userToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchPets = async (filterParams = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(`http://localhost:9000/api/pets?${queryParams}`);
      setPets(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch pets");
      console.error("Error fetching pets:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePet = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/pets/${id}`, getAuthHeaders());
      setPets(pets.filter(pet => pet._id !== id));
    } catch (err) {
      console.error("Error deleting pet:", err);
      alert("Failed to delete pet. Please try again.");
    }
  };

  const savePet = async () => {
    try {
      if (modalMode === "add") {
        const response = await axios.post("http://localhost:9000/api/pets", currentPet, getAuthHeaders());
        setPets([...pets, response.data]);
      } else {
        const response = await axios.put(`http://localhost:9000/api/pets/${currentPet._id}`, currentPet, getAuthHeaders());
        setPets(pets.map(pet => pet._id === currentPet._id ? response.data : pet));
      }
      closeModal();
    } catch (err) {
      console.error("Error saving pet:", err);
      alert(`Failed to ${modalMode === "add" ? "add" : "update"} pet. Please try again.`);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      deletePet(id);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePetInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentPet(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const openAddModal = () => {
    setCurrentPet({
      name: "",
      description: "",
      price: "",
      breed: "",
      age: "",
      gender: "",
      size: "",
      type: "",
      vaccinated: false,
      trained: false,
      images: [],
      isAvailable: true
    });
    setModalMode("add");
    setShowModal(true);
  };

  const openEditModal = (pet) => {
    setCurrentPet({ ...pet });
    setModalMode("edit");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const applyFilters = () => {
    fetchPets(filters);
  };

  const resetFilters = () => {
    setFilters({
      type: "",
      breed: "",
      gender: "",
      size: "",
      minPrice: "",
      maxPrice: "",
      search: ""
    });
    fetchPets();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setCurrentPet(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  const removeImage = (index) => {
    setCurrentPet(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <FaPaw className="mr-2 text-blue-600" /> Pet Management
        </h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition duration-300"
        >
          <FaPlus className="mr-2" /> Add New Pet
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              name="search"
              placeholder="Search pets..."
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
          >
            <FaFilter className="mr-2" /> {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="fish">Fish</option>
                  <option value="reptile">Reptile</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <input
                  type="text"
                  name="breed"
                  placeholder="Any breed"
                  value={filters.breed}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <select
                  name="size"
                  value={filters.size}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                >
                  <option value="">All Sizes</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price ($)</label>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="1000"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-100"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pets Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Breed</th>
              <th className="py-3 px-4 text-left">Age</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pets.length > 0 ? (
              pets.map((pet) => (
                <tr
                  key={pet._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      {pet.images && pet.images.length > 0 ? (
                        <img 
                          src={pet.images[0].url} 
                          alt={pet.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <FaPaw className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    {pet.name}
                  </td>
                  <td className="p-4 text-gray-700 capitalize">
                    {pet.type}
                  </td>
                  <td className="p-4 text-gray-700">
                    {pet.breed}
                  </td>
                  <td className="p-4 text-gray-700">
                    {pet.age} {pet.age === 1 ? 'year' : 'years'}
                  </td>
                  <td className="p-4 text-gray-700 font-medium">
                    ${pet.price}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pet.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {pet.isAvailable ? 'Available' : 'Sold'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(pet)}
                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(pet._id)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <FaPaw className="text-gray-300 text-5xl mb-3" />
                    <p className="text-lg font-medium">No pets found</p>
                    <p className="text-sm mt-1">Add a new pet or adjust your filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Pet Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <h3 className="text-lg font-medium text-gray-900">
                    {modalMode === "add" ? "Add New Pet" : "Edit Pet"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={currentPet.name}
                          onChange={handlePetInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                          name="type"
                          value={currentPet.type}
                          onChange={handlePetInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="dog">Dog</option>
                          <option value="cat">Cat</option>
                          <option value="bird">Bird</option>
                          <option value="fish">Fish</option>
                          <option value="reptile">Reptile</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                        <input
                          type="text"
                          name="breed"
                          value={currentPet.breed}
                          onChange={handlePetInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
                        <input
                          type="number"
                          name="age"
                          value={currentPet.age}
                          onChange={handlePetInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          name="gender"
                          value={currentPet.gender}
                          onChange={handlePetInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                        <select
                          name="size"
                          value={currentPet.size}
                          onChange={handlePetInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                          required
                        >
                          <option value="">Select Size</option>
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                          type="number"
                          name="price"
                          value={currentPet.price}
                          onChange={handlePetInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="vaccinated"
                            name="vaccinated"
                            checked={currentPet.vaccinated}
                            onChange={handlePetInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="vaccinated" className="ml-2 block text-sm text-gray-700">
                            Vaccinated
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="trained"
                            name="trained"
                            checked={currentPet.trained}
                            onChange={handlePetInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="trained" className="ml-2 block text-sm text-gray-700">
                            Trained
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isAvailable"
                            name="isAvailable"
                            checked={currentPet.isAvailable}
                            onChange={handlePetInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">
                            Available
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={currentPet.description}
                          onChange={handlePetInputChange}
                          rows="3"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                        <input
                        name="image"
                          type="text"
                          onChange={handlePetInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        />
                        
                        {/* Image preview */}
                        {currentPet.images && currentPet.images.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {currentPet.images.map((img, index) => (
                              <div key={index} className="relative w-16 h-16">
                                <img 
                                  src={img} 
                                  alt={`Pet image ${index + 1}`} 
                                  className="w-full h-full object-cover rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={savePet}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {modalMode === "add" ? "Add Pet" : "Update Pet"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetManagement;