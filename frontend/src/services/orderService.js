import api from "./api";

// ===============================
// Create New Order
// ===============================
export const createOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

// ===============================
// Get Logged-in User Orders
// ===============================
export const getMyOrders = async () => {
  const { data } = await api.get("/orders/myorders");
  return data;
};

// ===============================
// Get Single Order
// ===============================
export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

// ===============================
// Admin - Get All Orders
// ===============================
export const getAllOrders = async () => {
  const { data } = await api.get("/orders/admin/all");
  return data;
};

// ===============================
// Admin - Update Order Status
// ===============================
export const updateOrderStatus = async (id, orderStatus) => {
  const { data } = await api.put(`/orders/${id}`, {
    orderStatus,
  });

  return data;
};

// ===============================
// Admin - Delete Order
// ===============================
export const deleteOrder = async (id) => {
  const { data } = await api.delete(`/orders/${id}`);
  return data;
};