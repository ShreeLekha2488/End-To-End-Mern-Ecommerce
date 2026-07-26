import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Increase Quantity
  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove Item
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Item Removed");
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-2xl text-gray-600">
              Your Cart is Empty
            </h2>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </button>

          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Cart Items */}

            <div className="lg:col-span-2 space-y-5">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-5 bg-white shadow-md rounded-xl p-5"
                >

                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/120"
                    }
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />

                  <div className="flex-1">

                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-600 font-semibold"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

            {/* Order Summary */}

            <div className="bg-white shadow-md rounded-xl p-6 h-fit">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">

                <span>Items</span>

                <span>{cartItems.length}</span>

              </div>

              <div className="flex justify-between mb-6">

                <span>Total</span>

                <span className="font-bold text-xl">
                  ₹{totalPrice}
                </span>

              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Cart;