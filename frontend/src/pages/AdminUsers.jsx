import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../services/userService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers();

      setUsers(data.users || []);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, { role });

      toast.success("User role updated");

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Role update failed"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      toast.success("User deleted");

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  if (loading) {
    return <Loader text="Loading Users..." />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Manage Users
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4">Name</th>

                <th className="p-4">Email</th>

                <th className="p-4">Role</th>

                <th className="p-4">Joined</th>

                <th className="p-4">Change Role</th>

                <th className="p-4">Delete</th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-4">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(
                          user._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg p-2"
                    >
                      <option value="user">
                        User
                      </option>

                      <option value="admin">
                        Admin
                      </option>

                    </select>

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(user._id)
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

export default AdminUsers;