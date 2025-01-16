import axiosInstance from "./axiosConfig";

export const createUsers = async (data) => {
  try {
    const response = await axiosInstance.post("/users", data);
    return response.data
  } catch (error) {
    throw error.message;
  }
};

export const LoginUser = async (logindata) => {
    try {
      const response = await axiosInstance.post("/users/login",logindata);
    
      return {data: response.data, status: response.status}
    } catch (error) {        
      throw  error.response.data;
    }
  };