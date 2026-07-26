import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

import { getAllProducts, searchProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Load Products
  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts();

      setProducts(data.products || []);
    } catch (error) {
      toast.error("Failed to load products");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Search Products
  const handleSearch = async () => {
    try {
      setLoading(true);

      if (searchTerm.trim() === "") {
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
  }, []);

  if (loading) {
    return <Loader text="Loading Products..." />;
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-5">
            Welcome to Global Bazaar
          </h1>

          <p className="text-xl mb-10">
            Discover the latest electronics, fashion,
            accessories and much more.
          </p>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            onClear={handleClear}
          />

        </div>

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Latest Products
          </h2>

          <span className="text-gray-600">
            {products.length} Products
          </span>

        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-2xl font-semibold text-gray-600">
              No Products Found
            </h2>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}

          </div>
        )}

      </section>

      <Footer />
    </>
  );
};

export default Home;