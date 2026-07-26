const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

// =======================================
// User Routes
// =======================================

// Create New Order
// POST /api/orders
router.post("/", protect, createOrder);

// Get Logged-in User Orders
// GET /api/orders/myorders
router.get("/myorders", protect, getMyOrders);

// Get Single Order
// GET /api/orders/:id
router.get("/:id", protect, getOrderById);

// =======================================
// Admin Routes
// =======================================

// Get All Orders
// GET /api/orders/admin/all
router.get("/admin/all", protect, admin, getAllOrders);

// Update Order Status
// PUT /api/orders/:id
router.put("/:id", protect, admin, updateOrderStatus);

// Delete Order
// DELETE /api/orders/:id
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;