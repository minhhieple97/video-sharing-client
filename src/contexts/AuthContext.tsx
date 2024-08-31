import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/api';
import { User } from '../interfaces';
import { useLoading } from '../hooks/useLoading';

interface AuthContextType {
  user: User | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'auth_user';
const AUTH_EXPIRATION_KEY = 'auth_expiration';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { setIsLoading } = useLoading();

  const [error, setError] = useState<string | null>(null);
  const saveUserToStorage = (user: User) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
    localStorage.setItem(AUTH_EXPIRATION_KEY, expirationTime.toString());
  };

  const removeUserFromStorage = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_EXPIRATION_KEY);
  };

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    const expirationTime = localStorage.getItem(AUTH_EXPIRATION_KEY);
    if (storedUser && expirationTime) {
      if (new Date().getTime() < parseInt(expirationTime, 10)) {
        setUser(JSON.parse(storedUser));
        setIsLoading(false);
        return;
      } else {
        removeUserFromStorage();
      }
    }
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      saveUserToStorage(currentUser);
    } catch {
      setUser(null);
      setError('Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await loginUser(email, password);
      setUser(user);
      saveUserToStorage(user);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await registerUser(email, password);
      setUser(user);
      saveUserToStorage(user);
    } catch (err) {
      setError('Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    removeUserFromStorage();
    setUser(null);
    setIsLoading(false);
    try {
      await logoutUser();
    } catch (err) {
      setError('Logout failed. Please try again.');
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    checkAuthStatus,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
