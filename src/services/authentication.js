// axios
import axios from "axios";

// API URL
export const API_URL = "https://strapi.arvanschool.ir/api/";

// Save user and jwt to local storage
const saveToStorage = (user, jwt, callback) => {
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("user", JSON.stringify(user));
  if (callback) callback(user, jwt);
};

// Login
export const login = async (credentials, saveUserData) => {
  const { data } = await axios.post(`${API_URL}auth/local`, credentials);
  saveToStorage(data.user, data.jwt, saveUserData);
  return data.user;
};

// Sign Up
export const registerUser = async (userData, saveUserData) => {
  const { data } = await axios.post(`${API_URL}auth/local/register`, userData);
  saveToStorage(data.user, data.jwt, saveUserData);
  return data.user;
};
