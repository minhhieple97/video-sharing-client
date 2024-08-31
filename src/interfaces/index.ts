export interface User {
  id: number;
  email: string;
}
export interface AuthResponse extends User {
  token: string;
}
