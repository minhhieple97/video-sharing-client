import { removeUserFromStorage } from '../utils/helper';
import { useAuth } from './useAuth';

export const useLogout = () => {
  const { setUser } = useAuth();

  const logout = () => {
    removeUserFromStorage();
    setUser(null);
  };
  return { logout };
};
