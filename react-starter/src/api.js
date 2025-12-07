import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Update with your backend URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If `VITE_API_BASE_URL` already points at `/api/auth` (as in your `.env`),
// the client should POST to `/login` and `/signup` (not `/auth/login`).
export const loginUser = (credentials) => apiClient.post('/login', credentials);
export const signupUser = (data) => apiClient.post('/signup', data);

export default apiClient;
