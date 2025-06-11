import axios from 'axios';

const api = axios.create({
  baseURL: 'https://enduring-art-a494539659.strapiapp.com/api',
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
