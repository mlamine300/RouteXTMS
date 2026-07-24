/// <reference types="vite/client" />
import axios from 'axios';
import { getToken } from './tokenServices';

// Create a custom instance
const axiosClient = axios.create({
  baseURL: import.meta.env.BACKEND_URL || 'http://localhost:3500',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (e.g., automatically attach a bearer token)
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (e.g., global error logging or logging out on 401)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // Optional: Clear tokens and redirect user
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
