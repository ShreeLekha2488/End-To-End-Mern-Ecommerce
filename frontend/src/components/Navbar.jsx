import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            Global Bazaar
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold flex items-center gap-2"
                  : "text-gray-700 hover:text-blue-600 flex items-center gap-2"
              }
            >
              <FaShoppingCart />
              Cart
            </NavLink>

          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">

                  <FaUserCircle
                    size={28}
                    className="text-blue-600"
                  />

                  <span className="font-medium">
                    {user?.name}
                  </span>

                </div>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;