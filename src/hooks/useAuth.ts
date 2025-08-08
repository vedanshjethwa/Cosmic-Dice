import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  referralCode: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Verify token and get user profile
      fetchProfile();
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.getProfile();
      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true
      });
    } catch (error) {
      // Token invalid, clear it
      localStorage.removeItem('auth_token');
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    setState({
      user: response.user,
      isLoading: false,
      isAuthenticated: true
    });
  };

  const register = async (userData: {
    email: string;
    password: string;
    username: string;
    phone?: string;
    referralCode?: string;
  }) => {
    const response = await api.register(userData);
    setState({
      user: response.user,
      isLoading: false,
      isAuthenticated: true
    });
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
    }
  };

  return {
    ...state,
    login,
    register,
    logout,
    refreshProfile: fetchProfile
  };
};