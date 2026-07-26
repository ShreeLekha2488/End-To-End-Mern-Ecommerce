import api from "./api";

// ===============================
// Get All Products
// ===============================
export const getAllProducts = async (
  page = 1,
  limit = 8,
  keyword = "",
  category = ""
) => {
  const { data } = await api.get("/products", {
    params: {
      page,
      limit,
      keyword,
      category,
    },
  });

  return data;
};

// ===============================
// Get Product By ID
// ===============================
export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// ===============================
// Create Product (Admin)
// ===============================
export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

// ===============================
// Update Product (Admin)
// ===============================
export const updateProduct = async (id, productData) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

// ===============================
// Delete Product (Admin)
// ===============================
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

// ===============================
// Search Products
// ===============================
export const searchProducts = async (keyword) => {
  const { data } = await api.get("/products", {
    params: {
      keyword,
    },
  });

  return data;
};

// ===============================
// Filter Products
// ===============================
export const filterProducts = async (category) => {
  const { data } = await api.get("/products", {
    params: {
      category,
    },
  });

  return data;
};