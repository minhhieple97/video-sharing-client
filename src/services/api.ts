import axios from 'axios';
import { AuthResponse, User } from '../interfaces';
const env = import.meta.env;
const baseURL = env.VITE_BACKEND_URL;
// Create an axios instance with default config
const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get<User>('/auth/current-user');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access, redirecting to login...');
    }
    return Promise.reject(error);
  },
);

export default api;
