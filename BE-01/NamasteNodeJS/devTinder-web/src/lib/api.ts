import axios from "axios";

const baseURL = (import.meta.env.VITE_BASE_API_URL ?? "").replace(/\/+$/, "");

const api = axios.create({
    baseURL,
    withCredentials: true,
});

export default api;
