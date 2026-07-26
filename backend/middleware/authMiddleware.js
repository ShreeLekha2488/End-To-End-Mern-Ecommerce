const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ======================================
// Protect Routes (JWT Authentication)
// ======================================
const protect = async (req, res, next) => {
  let token;

  try {
    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get User Without Password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User Not Found",
        });
      }

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

// ======================================
// Admin Authorization
// ======================================
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Admin Access Only",
    });
  }
};

module.exports = {
  protect,
  admin,
};