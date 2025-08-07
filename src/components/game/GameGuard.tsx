import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AlertTriangle, Wallet, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameGuardProps {
  children: React.ReactNode;
  minBalance?: number;
}

export const GameGuard: React.FC<GameGuardProps> = ({ children, minBalance = 1 }) => {
  const { isAuthenticated, wallet } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] flex items-center justify-center p-4">
        <div className="bg-[#132F4C] rounded-2xl p-8 border border-red-500/20 max-w-md w-full text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-400 mb-6">
            You must be logged in to access games. Please return to the home page and sign in.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] flex items-center justify-center p-4">
        <div className="bg-[#132F4C] rounded-2xl p-8 border border-yellow-500/20 max-w-md w-full text-center">
          <Wallet className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Loading</h2>
          <p className="text-gray-400 mb-6">
            Please wait while we load your wallet information...
          </p>
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  const totalBalance = wallet.real_balance + wallet.bonus_balance;

  if (totalBalance < minBalance) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] flex items-center justify-center p-4">
        <div className="bg-[#132F4C] rounded-2xl p-8 border border-yellow-500/20 max-w-md w-full text-center">
          <Wallet className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Insufficient Balance</h2>
          <p className="text-gray-400 mb-6">
            You need at least ₹{minBalance} to play this game. Your current balance is ₹{totalBalance.toFixed(2)}.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/deposit')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Funds
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};