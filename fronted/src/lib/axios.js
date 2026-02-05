import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.NODE === "development" ? "http://localhost:5000/api" : "https://videoconferenc.onrender.com/api",
  withCredentials: true,
});
