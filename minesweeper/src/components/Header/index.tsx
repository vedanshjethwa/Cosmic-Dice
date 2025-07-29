import React from 'react';
import { Wallet, HelpCircle, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  balance: number;
  onBackClick?: () => void;
  onHelpClick?: () => void;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

const Header: React.FC<HeaderProps> = ({
  balance,
  onBackClick,
  onHelpClick,
}) => {
  return (
    <header className="bg-gradient-to-b from-black via-black to-[#0a0f1a] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <ArrowLeft className="w-8 h-8 text-[#3b82f6] -mr-1" />
              <span className="bg-gradient-to-r from-white to-[#3b82f6] bg-clip-text text-transparent">
                <span className="hidden md:inline">Cosmic Tap Zone</span>
                <span className="md:hidden">CTZ</span>
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {onHelpClick && (
              <button
                onClick={onHelpClick}
                className="p-1.5 md:p-2 hover:bg-[#1a2942]/50 rounded-lg transition-colors"
                title="How to Play"
              >
                <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-[#3b82f6]" />
              </button>
            )}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
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
};

export default Header;
