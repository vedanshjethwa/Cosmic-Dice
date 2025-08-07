import React from 'react';
import { Wallet, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface WalletHeaderProps {
  showBalance: boolean;
  onToggleBalance: () => void;
}

export const WalletHeader: React.FC<WalletHeaderProps> = ({ showBalance, onToggleBalance }) => {
  const { wallet } = useAuth();

  if (!wallet) return null;

  const totalBalance = wallet.real_balance + wallet.bonus_balance;

  return (
    <div className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg transition-colors border border-blue-500/30 flex items-center gap-2">
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