import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface WalletData {
  realBalance: number;
  bonusBalance: number;
  lockedBalance: number;
  totalDeposited: number;
  totalWithdrawn: number;
  totalWagered: number;
  totalWon: number;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.getWalletBalance();
      setWallet(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWallet = () => {
    fetchWallet();
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return {
    wallet,
    isLoading,
    error,
    refreshWallet
  };
};