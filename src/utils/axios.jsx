import axios from "axios";
import { baseURL } from "../common/SummerAPI";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: false
});

// --- Request Interceptor ---
Axios.interceptors.request.use(
    (config) => {
        // ✨ YAHAN CHANGE KIYA: access_token check karein jo Login me set kiya tha
        const token = localStorage.getItem("access_token") || localStorage.getItem("admintoken");
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expire ho gaya ya galat hai, toh logout karwa do
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_data");
            
            const unauthorizedEvent = new CustomEvent("on-unauthorized");
            window.dispatchEvent(unauthorizedEvent);
            
            // Optional: User ko Login pe bhej do
            // window.location.href = "/Login";
        }
        return Promise.reject(error);
    }
);

export default Axios;