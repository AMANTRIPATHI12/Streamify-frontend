import axios from "axios";

const Base_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: Base_URL,
  withCredentials: true,
});
