import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sku: "",
    description: "",
    countInStock: 0,
    collections: "",
    animal: "Dogs",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    images: [],
  });
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:9000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setProducts(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url: imageUrl.trim(), altText }],
    }));
    setImageUrl("");
    setAltText("");
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
      const payload = {
        ...formData,
        tags: tagsArray,
      };

      await axios.post("http://localhost:9000/api/products", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setFormData({
        name: "",
        price: "",
        sku: "",
        description: "",
        countInStock: 0,
        collections: "",
        animal: "Dogs",
        tags: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        images: [],
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError("Failed to add product.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:9000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-6 bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-xl font-semibold mb-2">Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="border p-2" required />
          <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price" className="border p-2" required />
          <input name="sku" value={formData.sku} onChange={handleInputChange} placeholder="SKU" className="border p-2" required />
        </div>

        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows={3} className="border p-2 w-full" required />

        <h3 className="text-xl font-semibold mt-6 mb-2">Inventory & Categorization</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="countInStock" type="number" value={formData.countInStock} onChange={handleInputChange} placeholder="Count In Stock" className="border p-2" required />
          <input name="collections" value={formData.collections} onChange={handleInputChange} placeholder="Collections" className="border p-2" required />
          <select name="animal" value={formData.animal} onChange={handleInputChange} className="border p-2">
            <option value="Dogs">Dogs</option>
            <option value="Cats">Cats</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
          </select>
        </div>

        <input name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Tags (comma-separated)" className="border p-2 w-full" />

        <h3 className="text-xl font-semibold mt-6 mb-2">SEO Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} placeholder="Meta Title" className="border p-2" />
          <input name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} placeholder="Meta Description" className="border p-2" />
          <input name="metaKeywords" value={formData.metaKeywords} onChange={handleInputChange} placeholder="Meta Keywords" className="border p-2" />
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">Product Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="border p-2" />
          <input value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Alt Text (optional)" className="border p-2" />
          <button type="button" onClick={handleAddImage} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Image
          </button>
        </div>

        {formData.images.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Images:</h4>
            <ul className="list-disc pl-5">
              {formData.images.map((img, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{img.url} {img.altText && `- (${img.altText})`}</span>
                  <button onClick={() => handleRemoveImage(idx)} className="text-red-600 hover:underline text-sm">Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </form>

      {/* Product Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50 cursor-pointer">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link to={`/admin/products/${product._id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
