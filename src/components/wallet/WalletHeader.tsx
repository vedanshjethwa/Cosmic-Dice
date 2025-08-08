import React from 'react';
import { Wallet, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface WalletHeaderProps {
  showBalance: boolean;
  onToggleBalance: () => void;
}

export const WalletHeader: React.FC<WalletHeaderProps> = ({ showBalance, onToggleBalance }) => {
  const { user } = useAuth();

  if (!user) return null;

  // Mock balance for demo - replace with actual wallet data
  const totalBalance = 5000;

  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-400 px-4 py-2 rounded-xl transition-all border border-blue-500/30 flex items-center gap-2 shadow-lg">
      <Wallet size={20} />
      <span className="font-medium">
        {showBalance ? `₹${totalBalance.toLocaleString()}` : '₹••••••'}
      </span>
      <button
        onClick={onToggleBalance}
        className="text-gray-400 hover:text-white transition-colors"
      >
        {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};