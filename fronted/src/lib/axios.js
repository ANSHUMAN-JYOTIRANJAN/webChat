import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "https://webapplication-en67.onrender.com/api",
  withCredentials: true,
});