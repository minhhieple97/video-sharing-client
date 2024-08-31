import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/api';
import { User } from '../interfaces';

interface AuthContextType {
  user: User | null;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    setError(null);
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    const expirationTime = localStorage.getItem(AUTH_EXPIRATION_KEY);

    if (storedUser && expirationTime) {
      if (new Date().getTime() < parseInt(expirationTime, 10)) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
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
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginUser(email, password);
      setUser(user);
      saveUserToStorage(user);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await registerUser(email, password);
      setUser(user);
      saveUserToStorage(user);
    } catch (err) {
      setError('Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    removeUserFromStorage();
    setUser(null);
    setLoading(false);
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
    loading,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
