export interface User {
  id: number;
  email: string;
}
export interface AuthResponse extends User {
  token: string;
}

export interface VideoShareData {
  youtubeId: string;
  username: string;
  title: string;
}

export interface Video {
  id: number;
  youtubeId: string;
  title: string;
  sharedAt: string;
  user: User;
}

export type VideoListResponse = Video[];
