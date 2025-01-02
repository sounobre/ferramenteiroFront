import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {}; 
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request Config:', config); 
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('Response Data:', response.data); 
        return response;
    },
    (error) => {
        console.error('Response Error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export default api;
