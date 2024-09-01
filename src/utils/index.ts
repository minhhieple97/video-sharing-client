import { AUTH_EXPIRATION_KEY, AUTH_EXPIRATION_TIME, AUTH_STORAGE_KEY } from '../constants';
import { User } from '../interfaces';

export const saveUserToStorage = (user: User) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  const expirationTime = new Date().getTime() + AUTH_EXPIRATION_TIME;
  localStorage.setItem(AUTH_EXPIRATION_KEY, expirationTime.toString());
};
export const getUserFromStorage = () => {
  const user = localStorage.getItem(AUTH_STORAGE_KEY);
  const expirationTime = localStorage.getItem(AUTH_EXPIRATION_KEY);
  if (!user || !expirationTime) {
    return null;
  }
  if (new Date().getTime() < parseInt(expirationTime, 10)) {
    return JSON.parse(user);
  }
  return null;
};
export const removeUserFromStorage = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_EXPIRATION_KEY);
};
