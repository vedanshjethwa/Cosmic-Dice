import React from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // No authentication required - always render children
  return <>{children}</>;
};