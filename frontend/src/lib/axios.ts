import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";
const baseURL = isDevelopment
  ? import.meta.env.VITE_API_URL_DEV
  : import.meta.env.VITE_API_URL_PROD;

export const axiosInstance = axios.create({
  baseURL: baseURL || "http://localhost:5001/api",
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
