import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { GameLayout } from './game/GameLayout';

interface GameWrapperProps {
  gameTitle: string;
  children: React.ReactNode;
}

export function GameWrapper({ gameTitle, children }: GameWrapperProps) {
  const { isAuthenticated, wallet } = useAuth();

  // Check if user has sufficient balance
  const totalBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);
  const hasBalance = totalBalance >= 1;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] flex items-center justify-center p-4">
        <div className="bg-[#132F4C] rounded-2xl p-8 border border-red-500/20 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
          <p className="text-gray-400 mb-6">
            Please log in to access this game.
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!hasBalance) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] flex items-center justify-center p-4">
        <div className="bg-[#132F4C] rounded-2xl p-8 border border-yellow-500/20 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Insufficient Balance</h2>
          <p className="text-gray-400 mb-6">
            You need at least ₹1 to play this game. Your current balance is ₹{totalBalance.toFixed(2)}.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.href = '/deposit'}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Funds
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GameLayout gameTitle={gameTitle}>
      {children}
    </GameLayout>
  );
}