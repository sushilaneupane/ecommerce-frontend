import axiosInstance from "./axiosConfig";

export const createCart = async (data, token) => {
  try {    
    const response = await axiosInstance.post("/carts", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating cart:", error.message);
    throw error;
  }
};


export const getCartsByUserId = async (userId, token) => {
  try {    
    const response = await axiosInstance.get(`/carts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};