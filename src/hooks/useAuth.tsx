import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AUTH_CHECK_INTERVAL } from '../constants';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, checkAuthStatus, error, clearError, setUser } = context;

  useEffect(() => {
    const checkAuthInterval = setInterval(() => {
      checkAuthStatus();
    }, AUTH_CHECK_INTERVAL);

    return () => clearInterval(checkAuthInterval);
  }, [checkAuthStatus]);

  return { user, checkAuthStatus, error, clearError, setUser };
};
