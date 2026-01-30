import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "https://chating-36up.onrender.com/api",
  withCredentials: true,
});
