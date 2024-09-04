import axios, { AxiosError } from 'axios';
const env = import.meta.env;
const baseURL = env.VITE_BACKEND_URL;
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

// Request interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access, redirecting to login...');
    }
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
