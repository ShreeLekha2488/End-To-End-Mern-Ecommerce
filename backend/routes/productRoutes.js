const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

// =======================================
// Public Routes
// =======================================

// Get All Products
// GET /api/products
router.get("/", getProducts);

// Get Single Product
// GET /api/products/:id
router.get("/:id", getProductById);

// =======================================
// Admin Routes
// =======================================

// Create Product
// POST /api/products
router.post("/", protect, admin, createProduct);

// Update Product
// PUT /api/products/:id
router.put("/:id", protect, admin, updateProduct);

// Delete Product
// DELETE /api/products/:id
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;