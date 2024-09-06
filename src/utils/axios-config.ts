import axios, { AxiosError } from 'axios';
import { getUserFromStorage } from './helper';
const env = import.meta?.env;
console.log({ env });
const baseURL = env?.VITE_BACKEND_URL || 'http://localhost:3000';
interface ValidationError {
  message: string[];
  error: string;
  statusCode: number;
}

interface SingleMessageError {
  message: string;
  error: string;
  statusCode: number;
}

type ApiError = ValidationError | SingleMessageError;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getUserFromStorage();
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    let errorMessage = 'An unexpected error occurred.';

    if (error.response) {
      const { data } = error.response;

      if (Array.isArray(data.message)) {
        errorMessage = `${data.message.join(', ')}`;
      } else {
        errorMessage = data.message;
      }
    } else if (error.request) {
      errorMessage = 'Network error occurred. Please check your connection.';
    }
    return Promise.reject(errorMessage);
  },
);

export default axiosInstance;
