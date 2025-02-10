import axios from "axios";

const BASE_URL = "https://proprints.tranquility.org.ng/api";

export const AdminLogin = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/Admin/AdminLogin`, {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error("Login failed:",error.message);
    throw error; 
  }
};
