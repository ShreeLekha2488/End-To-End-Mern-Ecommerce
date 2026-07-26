import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Registration Successful! Please login.");

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });

      // Redirect to Login page
      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-8">

          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Address
              </label>

              <textarea
                name="address"
                rows="3"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <p className="text-center mt-6">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;