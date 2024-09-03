import { AuthResponse, User, VideoListResponse } from '../interfaces';
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

export const getVideos = async (skip: number, take: number): Promise<VideoListResponse> => {
  const response = await axiosInstance.get<VideoListResponse>(`/videos?skip=${skip}&take=${take}`);
  return response.data;
};

export const shareVideo = async (youtubeLink: string) => {
  await axiosInstance.post('/vides/share', { youtubeLink });
};
