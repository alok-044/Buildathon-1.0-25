import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { storage } from "../utils/storage";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await storage.getToken();
      if (token) {
        config.headers['x-auth-token'] = token; 
      }
    } catch (error) {
      console.error("Error attaching token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      console.log("Session expired or invalid token");
      
      await storage.removeToken();
      
    }
    return Promise.reject(error);
  }
);

export default api;