import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import {
  getAllProducts,
  deleteProduct,
} from "../services/productService";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts();

      setProducts(data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      toast.success("Product Deleted");

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  if (loading) {
    return <Loader text="Loading Products..." />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Manage Products
          </h1>

          <Link
            to="/admin/products/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
          >
            <FaPlus />
            Add Product
          </Link>

        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl">
              No Products Found
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-4">Image</th>

                  <th className="p-4">Name</th>

                  <th className="p-4">Category</th>

                  <th className="p-4">Price</th>

                  <th className="p-4">Stock</th>

                  <th className="p-4">Actions</th>

                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">

                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/60"
                        }
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                    </td>

                    <td className="p-4 font-semibold">
                      {product.name}
                    </td>

                    <td className="p-4">
                      {product.category}
                    </td>

                    <td className="p-4">
                      ₹{product.price}
                    </td>

                    <td className="p-4">
                      {product.stock}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-3 justify-center">

                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(product._id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
};

export default AdminProducts;