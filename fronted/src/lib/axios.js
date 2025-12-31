import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://webchat-r7fq.onrender.com" : "/api",
  withCredentials: true,
});