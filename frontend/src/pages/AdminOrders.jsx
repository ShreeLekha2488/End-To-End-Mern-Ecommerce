import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../services/orderService";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getAllOrders();

      setOrders(data.orders || []);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, {
        orderStatus: status,
      });

      toast.success("Order Updated");

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);

      toast.success("Order Deleted");

      fetchOrders();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return <Loader text="Loading Orders..." />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Manage Orders
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4">Order ID</th>

                <th className="p-4">Customer</th>

                <th className="p-4">Amount</th>

                <th className="p-4">Payment</th>

                <th className="p-4">Status</th>

                <th className="p-4">Update</th>

                <th className="p-4">Delete</th>

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

                  <td className="p-4">
                    {order.user?.name}
                  </td>

                  <td className="p-4">
                    ₹{order.totalPrice}
                  </td>

                  <td className="p-4">
                    {order.paymentStatus}
                  </td>

                  <td className="p-4">
                    {order.orderStatus}
                  </td>

                  <td className="p-4">

                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg p-2"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(order._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default AdminOrders;