import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboard";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";

// Components
import ProtectedRoute from "../components/ProtectedRoute";

// 404 Page
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/products" element={<Products />} />

      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />

      {/* Protected User Routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-product"
        element={
          <ProtectedRoute adminOnly={true}>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-product/:id"
        element={
          <ProtectedRoute adminOnly={true}>
            <EditProduct />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;