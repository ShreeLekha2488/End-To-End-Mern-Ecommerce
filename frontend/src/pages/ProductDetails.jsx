import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

      setProduct(data.product || data);
    } catch (error) {
      toast.error("Unable to load product");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    toast.success(`${quantity} item(s) added to cart`);
  };

  const handleBuyNow = () => {
    navigate("/cart");
  };

  if (loading) {
    return <Loader text="Loading Product..." />;
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="text-center py-24">
          <h1 className="text-3xl font-bold">
            Product Not Found
          </h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Product Image */}

          <div>

            <img
              src={
                product.image ||
                "https://via.placeholder.com/600x500?text=No+Image"
              }
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-xl shadow-lg"
            />

          </div>

          {/* Product Details */}

          <div>

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <p className="mt-3 text-gray-600">
              Brand :
              <span className="font-semibold ml-2">
                {product.brand}
              </span>
            </p>

            <p className="mt-2 text-gray-600">
              Category :
              <span className="font-semibold ml-2">
                {product.category}
              </span>
            </p>

            <h2 className="text-4xl text-blue-600 font-bold mt-6">
              ₹{product.price}
            </h2>

            <div className="mt-5">

              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg">
                  Out of Stock
                </span>
              )}

            </div>

            <div className="mt-8">

              <h3 className="text-xl font-semibold mb-3">
                Description
              </h3>

              <p className="text-gray-700 leading-8">
                {product.description}
              </p>

            </div>

            {/* Quantity */}

            <div className="mt-8">

              <label className="font-semibold">
                Quantity
              </label>

              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="block mt-3 border rounded-lg px-4 py-3 w-36"
              >
                {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-10">

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex-1 disabled:bg-gray-400"
              >
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg flex-1 disabled:bg-gray-400"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;