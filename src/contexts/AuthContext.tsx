import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

interface Wallet {
  real_balance: number;
  bonus_balance: number;
  total_deposited: number;
  total_withdrawn: number;
  total_wagered: number;
  total_won: number;
}

interface AuthContextType {
  user: User | null;
  wallet: Wallet | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshWallet: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Default dummy user - everyone is "logged in"
  const [user] = useState<User>({
    id: 'dummy-user-id',
    email: 'player@cosmic.casino',
    username: 'CosmicPlayer',
    created_at: new Date().toISOString()
  });

  // Default dummy wallet
  const [wallet] = useState<Wallet>({
    real_balance: 1000,
    bonus_balance: 500,
    total_deposited: 2000,
    total_withdrawn: 500,
    total_wagered: 5000,
    total_won: 3500
  });

  const [isLoading] = useState(false);
  const isAuthenticated = true; // Always authenticated

  // Dummy functions - no actual authentication
  const login = async (email: string, password: string) => {
    // No-op
  };

  const register = async (email: string, password: string, username: string) => {
    // No-op
  };

  const logout = async () => {
    // No-op
  };

  const refreshWallet = async () => {
    // No-op
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        wallet,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};