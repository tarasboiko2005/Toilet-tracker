import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
});

// Add a request interceptor to include the JWT token from localStorage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jsonwebtoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
