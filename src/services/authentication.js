// axios
import axios from "axios";

// API URL
export const API_URL = "https://strapi.arvanschool.ir/";

// Login
export const login = async (credentials) => {
  const { data } = await axios.post(`${API_URL}api/auth/local`, credentials);
  return data;
};

// Sign Up
export const registerUser = async (userData) => {
  const { data } = await axios.post(
    `${API_URL}api/auth/local/register`,
    userData
  );
  return data;
};
