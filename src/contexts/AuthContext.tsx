import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [user, setUser] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with mock data if no user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('cosmic_user');
    const savedWallet = localStorage.getItem('cosmic_wallet');
    
    if (savedUser && savedWallet) {
      setUser(JSON.parse(savedUser));
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email: email,
        username: email.split('@')[0],
        created_at: new Date().toISOString()
      };

      const mockWallet: Wallet = {
        real_balance: 1000,
        bonus_balance: 100,
        total_deposited: 1000,
        total_withdrawn: 0,
        total_wagered: 0,
        total_won: 0
      };

      // Save to localStorage
      localStorage.setItem('cosmic_user', JSON.stringify(mockUser));
      localStorage.setItem('cosmic_wallet', JSON.stringify(mockWallet));
      localStorage.setItem('auth_token', 'mock_token_' + Date.now());

      setUser(mockUser);
      setWallet(mockWallet);
    } catch (error) {
      throw new Error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser: User = {
        id: 'user_' + Date.now(),
        email: email,
        username: username,
        created_at: new Date().toISOString()
      };

      const mockWallet: Wallet = {
        real_balance: 500, // Welcome bonus
        bonus_balance: 100,
        total_deposited: 0,
        total_withdrawn: 0,
        total_wagered: 0,
        total_won: 0
      };

      // Save to localStorage
      localStorage.setItem('cosmic_user', JSON.stringify(mockUser));
      localStorage.setItem('cosmic_wallet', JSON.stringify(mockWallet));
      localStorage.setItem('auth_token', 'mock_token_' + Date.now());

      setUser(mockUser);
      setWallet(mockWallet);
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Clear localStorage
      localStorage.removeItem('cosmic_user');
      localStorage.removeItem('cosmic_wallet');
      localStorage.removeItem('auth_token');
      
      setUser(null);
      setWallet(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWallet = async () => {
    // Mock wallet refresh - in a real app this would fetch from API
    if (wallet) {
      const updatedWallet = { ...wallet };
      setWallet(updatedWallet);
      localStorage.setItem('cosmic_wallet', JSON.stringify(updatedWallet));
    }
  };

  const isAuthenticated = !!user;

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