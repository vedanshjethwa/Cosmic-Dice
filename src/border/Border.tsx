import React, { useState } from 'react';
import { Wallet, ArrowLeft, HelpCircle } from 'lucide-react';

interface BorderProps {
  balance: number;
  onBackClick: () => void;
  onHelpClick: () => void;
}

function GameInstructions({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full mt-2 w-80 bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 rounded-xl shadow-xl border border-blue-500/20 z-50">
      <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-800 transform rotate-45"></div>
      <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-[#1E90FF] bg-clip-text text-transparent flex items-center gap-2">
        🎲 How to Play Dice Game
      </h3>
      <div className="space-y-3 text-sm">
        <div className="space-y-2">
          <p className="text-gray-300">• Enter your bet amount</p>
          <p className="text-gray-300">• Tap "Roll" to roll the dice</p>
          <p className="text-gray-300">• If the number is more than 4, you win 2x your bet</p>
          <p className="text-gray-300">• If it's 4 or less, you lose the bet</p>
        </div>
        <div className="mt-3 pt-3 border-t border-blue-500/20">
          <p className="text-gray-300">Your wallet updates automatically after each round</p>
        </div>
      </div>
    </div>
  );
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function Border({ balance, onBackClick, onHelpClick }: BorderProps) {
  const [showGameInfo, setShowGameInfo] = useState(false);

  return (
    <header className="bg-gradient-to-b from-black/80 to-black/40 border-t border-blue-500 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft 
              className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400 transition-colors" 
              onClick={onBackClick}
            />
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-white to-[#1E90FF] bg-clip-text text-transparent hidden md:inline">
                Cosmic{' '}
              </span>
              <span className="bg-gradient-to-r from-white to-[#1E90FF] bg-clip-text text-transparent md:hidden">
                C
              </span>
              <span className="text-blue-500 hidden md:inline">Dice</span>
              <span className="text-blue-500 md:hidden">D</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative">
              <button
                onClick={() => {
                  setShowGameInfo(!showGameInfo);
                  onHelpClick();
                }}
                onMouseEnter={() => setShowGameInfo(true)}
                onMouseLeave={() => setShowGameInfo(false)}
                className="p-1.5 md:p-2 hover:bg-blue-500/10 rounded-lg transition-colors"
                title="How to Play"
              >
                <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </button>
              <GameInstructions isOpen={showGameInfo} />
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 flex items-center gap-2">
              <Wallet className="text-blue-500" size={20} />
              <span className="text-blue-500 font-medium">
                {formatINR(balance)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}