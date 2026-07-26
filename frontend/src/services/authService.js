import api from "./api";

// ===============================
// Register User
// ===============================
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return response.data;
};

// ===============================
// Login User
// ===============================
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return response.data;
};

// ===============================
// Get Logged-in User
// ===============================
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// ===============================
// Logout
// ===============================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ===============================
// Check Login
// ===============================
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// ===============================
// Get Current User
// ===============================
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};