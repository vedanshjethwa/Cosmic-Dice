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
  updateBalance: (amount: number) => void;
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
  // Default user and wallet data - no authentication required
  const [user] = useState<User>({
    id: 'demo-user-123',
    email: 'demo@cosmic777.com',
    username: 'CosmicPlayer',
    created_at: new Date().toISOString()
  });

  const [wallet, setWallet] = useState<Wallet>({
    real_balance: 75,
    bonus_balance: 25,
    total_deposited: 1000,
    total_withdrawn: 500,
    total_wagered: 2500,
    total_won: 2100
  });

  const [isLoading] = useState(false);
  const isAuthenticated = true; // Always authenticated

  const login = async (email: string, password: string) => {
    // Mock login - always succeeds
    return Promise.resolve();
  };

  const register = async (email: string, password: string, username: string) => {
    // Mock register - always succeeds
    return Promise.resolve();
  };

  const logout = async () => {
    // Mock logout
    return Promise.resolve();
  };

  const refreshWallet = async () => {
    // Mock refresh
    return Promise.resolve();
  };

  const updateBalance = (amount: number) => {
    setWallet(prev => ({
      ...prev,
      real_balance: Math.max(0, prev.real_balance + amount),
      total_wagered: amount < 0 ? prev.total_wagered + Math.abs(amount) : prev.total_wagered,
      total_won: amount > 0 ? prev.total_won + amount : prev.total_won
    }));
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
        updateBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};