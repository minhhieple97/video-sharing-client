import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const GuestRoute: React.FC = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/" /> : <Outlet />;
};
