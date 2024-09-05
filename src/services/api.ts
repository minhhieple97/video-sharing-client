import { User, VideoListResponse } from '../interfaces';
import axiosInstance from '../utils/axios-config';
export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>('/auth/current-user');
  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await axiosInstance.post<User>('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (email: string, password: string): Promise<User> => {
  const response = await axiosInstance.post<User>('/auth/register', { email, password });
  return response.data;
};

export const getVideos = async (skip: number, take: number): Promise<VideoListResponse> => {
  const response = await axiosInstance.get<VideoListResponse>(`/videos?skip=${skip}&take=${take}`);
  return response.data;
};

export const shareVideo = async (youtubeLink: string) => {
  await axiosInstance.post('/videos/share', { youtubeLink });
};
