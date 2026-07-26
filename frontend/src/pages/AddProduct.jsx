import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { createProduct } from "../services/productService";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createProduct({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });

      toast.success("Product Added Successfully");

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to Add Product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-4xl font-bold mb-8">
            Add New Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>

              <label className="block font-semibold mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block font-semibold mb-2">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block font-semibold mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block font-semibold mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block font-semibold mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block font-semibold mb-2">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

            </div>

            <div>

              <label className="block font-semibold mb-2">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default AddProduct;