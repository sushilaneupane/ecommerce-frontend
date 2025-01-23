import axiosInstance from "./axiosConfig";

export const createWishlist = async (data, token) => {
  try {    
    console.log(data, token);
    const response = await axiosInstance.post("/wishlist", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {    
    throw error.response.data.error;
  }
};
export const getWishlistByUserId = async (userId, token) => {
  try {  
    const response = await axiosInstance.get(`/wishlist/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteWishlist = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/wishlist/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    console.error("Error deleting wishlist:", error.message);
    throw error;
  }
};