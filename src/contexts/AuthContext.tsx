import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User } from '../interfaces';
import { getUserFromStorage, removeUserFromStorage } from '../utils/helper';
interface AuthContextType {
  user: User | null;
  error: string | null;
  checkAuthStatus: () => Promise<void>;
  clearError: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const checkAuthStatus = useCallback(async () => {
    const user = getUserFromStorage();
    if (!user) removeUserFromStorage();
    setUser(user);
  }, []);

  const clearError = () => setError(null);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const value: AuthContextType = {
    user,
    setUser,
    checkAuthStatus,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
