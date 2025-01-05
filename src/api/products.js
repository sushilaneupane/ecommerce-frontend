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

export const getProductsByCategoryId= async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/products/category/${categoryId}`);
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products for the category");
  }
};
