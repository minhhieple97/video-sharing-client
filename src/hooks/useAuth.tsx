import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, login, register, logout, checkAuthStatus, error, clearError } = context;

  useEffect(() => {
    const checkAuthInterval = setInterval(() => {
      checkAuthStatus();
    }, 5 * 60 * 1000);

    return () => clearInterval(checkAuthInterval);
  }, [checkAuthStatus]);

  return { user, login, register, logout, checkAuthStatus, error, clearError };
};
