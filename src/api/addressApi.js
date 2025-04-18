import axiosInstance from "./axiosConfig";

export const getAddressByUserId = async (userId, token) => {
  try {
    const response = await axiosInstance.get(`/address/user/${userId}`, { headers: {
        Authorization: `Bearer ${token}`,
      }});
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw new Error("Failed to fetch categories. Please try again later.");
  }
};

export const createAddress= async (data, token) => {
    try {    
      const response = await axiosInstance.post("/address", data, {
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

  export const updateAddress= async (id, data, token) => {
    try {    
      const response = await axiosInstance.put(`/address/${id}`, data, {
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