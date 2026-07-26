const express = require("express");

const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

// ======================================
// Logged-in User Routes
// ======================================

// Get My Profile
// GET /api/users/profile
router.get("/profile", protect, getMyProfile);

// Update My Profile
// PUT /api/users/profile
router.put("/profile", protect, updateMyProfile);

// ======================================
// Admin Routes
// ======================================

// Get All Users
// GET /api/users
router.get("/", protect, admin, getAllUsers);

// Get User By ID
// GET /api/users/:id
router.get("/:id", protect, admin, getUserById);

// Update User Role
// PUT /api/users/:id/role
router.put("/:id/role", protect, admin, updateUserRole);

// Delete User
// DELETE /api/users/:id
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;