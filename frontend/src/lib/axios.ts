import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";
const baseURL = isDevelopment
  ? import.meta.env.VITE_API_URL_DEV
  : import.meta.env.VITE_API_URL_PROD;

export const axiosInstance = axios.create({
  baseURL: baseURL || "http://localhost:5001/api",
  withCredentials: true,
  // Required for ngrok free tier to bypass the browser warning page (ERR_NGROK_6024)
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
