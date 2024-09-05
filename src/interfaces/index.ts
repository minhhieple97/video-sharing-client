export interface User {
  id: number;
  email: string;
  token: string;
}

export interface INotificationFromServer {
  id: string;
  email: string;
  title: string;
}
export interface INotification extends INotificationFromServer {
  id: string;
}

export interface Video {
  id: number;
  youtubeId: string;
  title: string;
  sharedAt: string;
  user: User;
}

export type VideoListResponse = Video[];
