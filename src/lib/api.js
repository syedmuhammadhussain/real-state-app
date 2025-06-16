import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Automatically attach Bearer token from localStorage before each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Replace 'authToken' if you're using a different key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api };
