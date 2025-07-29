import { Wallet, HelpCircle, ArrowLeft, Sparkles } from 'lucide-react';

interface BorderProps {
  balance: number;
  onBackClick: () => void;
  onHelpClick: () => void;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function Border({ balance, onBackClick, onHelpClick }: BorderProps) {
  return (
    <header className="bg-gradient-to-b from-black via-black to-[#0a0f1a] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft
              className="w-6 h-6 text-[#3b82f6] cursor-pointer hover:text-[#60a5fa] transition-colors"
              onClick={onBackClick}
            />
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-[#3b82f6]" />
              <h1 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-white to-[#3b82f6] bg-clip-text text-transparent hidden md:inline">
                  Cosmic{' '}
                </span>
                <span className="bg-gradient-to-r from-white to-[#3b82f6] bg-clip-text text-transparent md:hidden">
                  C
                </span>
                <span className="text-[#3b82f6] hidden md:inline">
                  heads & tails{' '}
                </span>
                <span className="text-[#3b82f6] md:hidden">H&T</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <button
              onClick={onHelpClick}
              className="p-1.5 md:p-2 hover:bg-[#1a2942]/50 rounded-lg transition-colors"
              title="How to Play"
            >
              <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-[#3b82f6]" />
            </button>
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
}