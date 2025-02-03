import axios from "axios";

// type AxiosInstance = axios.AxiosInstance;


const api = axios.create({
    baseURL: "http://localhost:4200",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error?.response?.data || error?.message);
        return Promise.reject(error);
    }
)


// Example API utility

export default api;