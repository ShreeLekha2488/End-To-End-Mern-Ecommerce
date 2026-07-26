import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getOrderById } from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const data = await getOrderById(id);

      setOrder(data.order || data);
    } catch (error) {
      toast.error("Unable to load order");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return <Loader text="Loading Order..." />;
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">
            Order Not Found
          </h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-10">
          Order Details
        </h1>

        {/* Shipping */}

        <div className="bg-white shadow rounded-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Shipping Address
          </h2>

          <p>
            <strong>Name:</strong>{" "}
            {order.shippingAddress.fullName}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {order.shippingAddress.phone}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {order.shippingAddress.address}
          </p>

          <p>
            {order.shippingAddress.city},{" "}
            {order.shippingAddress.state}
          </p>

          <p>
            {order.shippingAddress.pincode},{" "}
            {order.shippingAddress.country}
          </p>

        </div>

        {/* Order Items */}

        <div className="bg-white shadow rounded-xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Ordered Products
          </h2>

          {order.orderItems.map((item) => (

            <div
              key={item.product}
              className="flex items-center gap-5 border-b py-4"
            >

              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/100"
                }
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">

                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>

                <p>
                  Quantity : {item.quantity}
                </p>

                <p>
                  Price : ₹{item.price}
                </p>

              </div>

              <div className="font-bold text-lg">
                ₹{item.price * item.quantity}
              </div>

            </div>

          ))}

        </div>

        {/* Payment */}

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Payment Information
            </h2>

            <p>
              <strong>Method:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  order.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {order.paymentStatus}
              </span>
            </p>

            <p>
              <strong>Order Status:</strong>{" "}
              <span className="text-blue-600 font-semibold">
                {order.orderStatus}
              </span>
            </p>

          </div>

          {/* Price Summary */}

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Price Details
            </h2>

            <div className="flex justify-between mb-3">
              <span>Items Price</span>
              <span>₹{order.itemsPrice}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span>₹{order.shippingPrice}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Tax</span>
              <span>₹{order.taxPrice}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default OrderDetails;