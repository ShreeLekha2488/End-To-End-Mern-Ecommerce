import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getAllUsers } from "../services/userService";
import { getAllProducts } from "../services/productService";
import { getAllOrders } from "../services/orderService";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [orders, setOrders] = useState([]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const usersData = await getAllUsers();
      const productsData = await getAllProducts();
      const ordersData = await getAllOrders();

      const users = usersData.users || [];
      const products = productsData.products || [];
      const allOrders = ordersData.orders || [];

      const revenue = allOrders.reduce(
        (total, order) => total + (order.totalPrice || 0),
        0
      );

      setStats({
        users: users.length,
        products: products.length,
        orders: allOrders.length,
        revenue,
      });

      setOrders(allOrders.slice(0, 5));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader text="Loading Dashboard..." />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-10">
          Admin Dashboard
        </h1>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">

            <FaUsers size={35} />

            <h2 className="text-4xl font-bold mt-4">
              {stats.users}
            </h2>

            <p>Total Users</p>

          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

            <FaBoxOpen size={35} />

            <h2 className="text-4xl font-bold mt-4">
              {stats.products}
            </h2>

            <p>Total Products</p>

          </div>

          <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg">

            <FaShoppingCart size={35} />

            <h2 className="text-4xl font-bold mt-4">
              {stats.orders}
            </h2>

            <p>Total Orders</p>

          </div>

          <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">

            <FaRupeeSign size={35} />

            <h2 className="text-4xl font-bold mt-4">
              ₹{stats.revenue}
            </h2>

            <p>Total Revenue</p>

          </div>

        </div>

        {/* Quick Links */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <Link
            to="/admin/products"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">
              Products
            </h2>

            <p className="mt-2 text-gray-600">
              Manage Products
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">
              Orders
            </h2>

            <p className="mt-2 text-gray-600">
              Manage Orders
            </p>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-bold">
              Users
            </h2>

            <p className="mt-2 text-gray-600">
              Manage Users
            </p>
          </Link>

        </div>

        {/* Recent Orders */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          {orders.length === 0 ? (
            <p>No Orders Found</p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-3">Order ID</th>

                    <th className="p-3">Customer</th>

                    <th className="p-3">Amount</th>

                    <th className="p-3">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3">
                        {order._id.slice(0, 8)}...
                      </td>

                      <td className="text-center">
                        {order.user?.name || "N/A"}
                      </td>

                      <td className="text-center">
                        ₹{order.totalPrice}
                      </td>

                      <td className="text-center">
                        {order.orderStatus}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

      <Footer />

    </>
  );
};

export default AdminDashboard;