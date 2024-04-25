// src/services/AxiosService.js
import axios from 'axios';

class AxiosService {
    constructor() {
        const instance = axios.create({
            baseURL: process.env.VUE_APP_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        instance.interceptors.request.use(this.handleRequest, this.handleError);
        instance.interceptors.response.use(this.handleResponse, this.handleError);

        this.instance = instance;
    }

    handleRequest(config) {
        // e.g., Add auth token here if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    }

    handleResponse(response) {
        // Handle response or just return
        return response;
    }

    handleError(error) {
        // Handle errors
        console.error('API Error:', error);
        return Promise.reject(error);
    }

    get(url) {
        return this.instance.get(url);
    }

    post(url, body) {
        return this.instance.post(url, body);
    }

    // Add other methods (put, delete, etc.) as needed
}

export default AxiosService;
