import axiosInstance from "./axiosConfig";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};
