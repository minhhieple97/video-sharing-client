import { logoutUser } from '../services/api';
import { removeUserFromStorage } from '../utils/helper';
import { useAuth } from './useAuth';

export const useLogout = () => {
  const { setUser } = useAuth();

  const logout = async () => {
    await logoutUser();
    removeUserFromStorage();
    setUser(null);
  };
  return { logout };
};
