import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  // Get user and token from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
};

export default ProtectedRoute;