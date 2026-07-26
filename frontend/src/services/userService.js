import api from "./api";

// ===============================
// Logged-in User Profile
// ===============================
export const getUserProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

// ===============================
// Update Profile
// ===============================
export const updateUserProfile = async (userData) => {
  const { data } = await api.put("/users/profile", userData);
  return data;
};

// ===============================
// Admin - Get All Users
// ===============================
export const getAllUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

// ===============================
// Admin - Get User By ID
// ===============================
export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

// ===============================
// Admin - Update User Role
// ===============================
export const updateUserRole = async (id, roleData) => {
  const { data } = await api.put(`/users/${id}`, roleData);
  return data;
};

// ===============================
// Admin - Delete User
// ===============================
export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};