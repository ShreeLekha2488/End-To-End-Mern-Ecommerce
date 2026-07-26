import { Link } from "react-router-dom";
import { FaShoppingCart, FaEye } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">

      {/* Product Image */}
      <div className="overflow-hidden">
        <img
          src={
            product.image ||
            "https://via.placeholder.com/300x250?text=No+Image"
          }
          alt={product.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800 truncate">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Brand : {product.brand}
        </p>

        <p className="text-sm text-gray-500">
          Category : {product.category}
        </p>

        <p className="mt-3 text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-4 flex justify-between items-center">

          <h3 className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </h3>

          {product.stock > 0 ? (
            <span className="text-green-600 font-semibold">
              In Stock
            </span>
          ) : (
            <span className="text-red-600 font-semibold">
              Out of Stock
            </span>
          )}

        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">

          <Link
            to={`/products/${product._id}`}
            className="flex-1 bg-gray-900 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-black transition"
          >
            <FaEye />
            Details
          </Link>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`flex-1 py-2 rounded-lg flex justify-center items-center gap-2 transition ${
              product.stock > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            <FaShoppingCart />
            Cart
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;