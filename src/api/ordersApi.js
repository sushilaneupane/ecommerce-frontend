import axiosInstance from "./axiosConfig";

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};