import { AuthResponse, User } from '../interfaces';
import axiosInstance from '../utils/axios-config';
export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>('/auth/current-user');
  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', { email, password });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};
