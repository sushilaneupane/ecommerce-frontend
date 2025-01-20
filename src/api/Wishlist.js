import axiosInstance from "./axiosConfig";

export const createWishlist = async (data, token) => {
  try {    
    const response = await axiosInstance.post("/wishlist", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating wishlist:", error.message);
    throw error;
  }
};
