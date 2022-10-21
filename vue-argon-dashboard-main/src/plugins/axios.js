import axios from 'axios';
import { getCookies, delCookies } from './cookies';

// Restful API Config
axios.defaults.headers['Content-Type'] = 'Application/json'

// Endpoint
const hostname = import.meta.env.VITE_BASE_API_URL;

// Instance Creation
const baseApi = axios.create({
    baseURL: hostname,
});

// Request Config
baseApi.interceptors.request.use(
    (config) => {
        const token = getCookies('CERT');
        if (token) config.headers['Authorization'] = 'Bearer ${token}';
        else {
            delCookies('CERT');
            delete config.headers['Authorization'];
        }

        return config;
    },
    (eror) => {
        throw error;
    },
);

// Response Config
baseApi.interceptors.response.use(
    (response) => response.data,
    (eror) => {
        switch (eror.response.status) {
            case 401:
                delCookies('CERT')
                break;
            default:
                break;
        }
        throw eror?.response?.eror ?? eror?.response?.message ?? error;
    },
)

export {baseApi };
