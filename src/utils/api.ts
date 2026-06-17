import axios from "axios";
import { getUserLocalStorage } from "../contexts/auth/utils";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: `${baseURL}`,
});

api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default api;
