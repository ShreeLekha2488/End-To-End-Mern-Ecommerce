import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import {
  getUserProfile,
  updateUserProfile,
} from "../services/userService";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getUserProfile();

      setUser({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || "",
        address: data.user.address || "",
        password: "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        name: user.name,
        phone: user.phone,
        address: user.address,
      };

      if (user.password.trim() !== "") {
        payload.password = user.password;
      }

      await updateUserProfile(payload);

      toast.success("Profile Updated Successfully");

      setUser({
        ...user,
        password: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Profile..." />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-4xl font-bold mb-8 text-center">
            My Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="font-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                Address
              </label>

              <textarea
                name="address"
                rows="3"
                value={user.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">
                New Password
              </label>

              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Leave empty if not changing"
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              {saving ? "Updating..." : "Update Profile"}
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Profile;