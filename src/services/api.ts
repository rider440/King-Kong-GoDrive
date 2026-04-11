import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "" // Proxied via Vite
});

// Attach token automatically
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;

export const getImageUrl = (path: string | null | undefined): string => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = 'https://localhost:7112'; // Backend base URL
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};