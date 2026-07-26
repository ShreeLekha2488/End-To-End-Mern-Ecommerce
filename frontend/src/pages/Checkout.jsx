import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { createOrder } from "../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      return toast.error("Cart is Empty");
    }

    try {
      setLoading(true);

      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
        })),

        shippingAddress,

        paymentMethod,

        itemsPrice: totalPrice,

        shippingPrice: 0,

        taxPrice: 0,

        totalPrice,
      };

      await createOrder(orderData);

      toast.success("Order Placed Successfully");

      localStorage.removeItem("cart");

      navigate("/my-orders");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-10">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Shipping Address */}

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Shipping Address
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingAddress.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <textarea
                name="address"
                placeholder="Address"
                value={shippingAddress.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingAddress.city}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingAddress.state}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={shippingAddress.pincode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

          </div>

          {/* Order Summary */}

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between mb-3"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

            <hr className="my-5" />

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span>₹{totalPrice}</span>

            </div>

            {/* Payment */}

            <div className="mt-8">

              <label className="font-semibold">
                Payment Method
              </label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
                className="w-full border rounded-lg mt-3 p-3"
              >
                <option value="COD">
                  Cash On Delivery
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="Card">
                  Credit / Debit Card
                </option>

              </select>

            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Checkout;