import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getMyOrders } from "../services/orderService";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getMyOrders();

      setOrders(data.orders || []);
    } catch (error) {
      toast.error("Failed to load orders");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <Loader text="Loading Orders..." />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-2xl text-gray-600">
              No Orders Found
            </h2>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full bg-white shadow rounded-xl overflow-hidden">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Order ID
                  </th>

                  <th className="p-4">
                    Date
                  </th>

                  <th className="p-4">
                    Amount
                  </th>

                  <th className="p-4">
                    Payment
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {order._id.substring(0, 10)}...
                    </td>

                    <td className="p-4 text-center">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-center font-semibold">
                      ₹{order.totalPrice}
                    </td>

                    <td className="p-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>

                    </td>

                    <td className="p-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.orderStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>

                    </td>

                    <td className="p-4 text-center">

                      <Link
                        to={`/orders/${order._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        View
                      </Link>

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

export default MyOrders;