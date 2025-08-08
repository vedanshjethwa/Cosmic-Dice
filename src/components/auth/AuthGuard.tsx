import React from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

// No authentication required - just pass through children
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  return <>{children}</>;
};