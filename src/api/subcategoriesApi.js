import axiosInstance from "./axiosConfig";

export const getSubcategories = async () => {
  try {
    const response = await axiosInstance.get("/subcategories");
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error.message);
    throw new Error("Failed to fetch subcategories. Please try again later.");
  }
};