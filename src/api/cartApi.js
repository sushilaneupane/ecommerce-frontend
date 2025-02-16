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
    throw error.response.data;
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
export const deleteCart = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    console.error("Error deleting cart:", error.message);
    throw error;
  }
};
export const updateCart = async (id, data, token) => {
  try {
    console.log(id, data, token);
    
    const response = await axiosInstance.patch(`/carts/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error.message);
    throw error;
  }
};
