import axios from "axios";
import { baseURL } from "../common/SummerAPI";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: false
});

Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("admin_token") || localStorage.getItem("access_token");

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

            localStorage.removeItem("access_token");
            localStorage.removeItem("user_data");

            // ✅ Sahi Tariqa (Admin pehle)
            const token = localStorage.getItem("admin_token") || localStorage.getItem("access_token");

            const unauthorizedEvent = new CustomEvent("on-unauthorized");
            window.dispatchEvent(unauthorizedEvent);

        }
        return Promise.reject(error);
    }
);

export default Axios;