import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingScreen } from '../LoadingScreen';
import { AuthModal } from './AuthModal';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <AuthModal />;
  }

  return <>{children}</>;
};