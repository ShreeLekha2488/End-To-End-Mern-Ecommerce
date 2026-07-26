import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import {
  getProductById,
  updateProduct,
} from "../services/productService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    image: "",
    price: "",
    stock: "",
  });

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

      const item = data.product || data;

      setProduct({
        name: item.name || "",
        brand: item.brand || "",
        category: item.category || "",
        description: item.description || "",
        image: item.image || "",
        price: item.price || "",
        stock: item.stock || "",
      });
    } catch (error) {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProduct(id, {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });

      toast.success("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to Update Product"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Product..." />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-6">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-4xl font-bold mb-8">
            Edit Product
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
                className="w-full border rounded-lg p-3"
                required
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
                className="w-full border rounded-lg p-3"
                required
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
                className="w-full border rounded-lg p-3"
                required
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
                className="w-full border rounded-lg p-3"
                required
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
                className="w-full border rounded-lg p-3"
                required
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
                className="w-full border rounded-lg p-3"
                required
              />

            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold"
            >
              {saving ? "Updating..." : "Update Product"}
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default EditProduct;