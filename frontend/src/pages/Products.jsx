import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

import {
  getAllProducts,
  searchProducts,
} from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);
  const limit = 8;

  // Load Products
  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts(page, limit);

      setProducts(data.products || []);
    } catch (error) {
      toast.error("Unable to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Search Products
  const handleSearch = async () => {
    try {
      setLoading(true);

      if (!searchTerm.trim()) {
        loadProducts();
        return;
      }

      const data = await searchProducts(searchTerm);

      setProducts(data.products || []);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Clear Search
  const handleClear = () => {
    setSearchTerm("");
    loadProducts();
  };

  // Add To Cart
  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart`);
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  if (loading) {
    return <Loader text="Loading Products..." />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-center mb-8">
          All Products
        </h1>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        {products.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold text-gray-500">
              No Products Found
            </h2>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}

            </div>

            {/* Pagination */}

            <div className="flex justify-center items-center gap-5 mt-12">

              <button
                onClick={() => page > 1 && setPage(page - 1)}
                className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-black"
              >
                Previous
              </button>

              <span className="text-lg font-semibold">
                Page {page}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              >
                Next
              </button>

            </div>

          </>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Products;