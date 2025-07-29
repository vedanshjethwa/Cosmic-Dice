import { Wallet, HelpCircle, ArrowLeft } from 'lucide-react';

interface TopBorderProps {
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

export function TopBorder({ balance, onBackClick, onHelpClick }: TopBorderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-header backdrop-blur-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft
              className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400 transition-colors"
              onClick={onBackClick}
            />
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent hidden md:inline">
                Cosmic{' '}
              </span>
              <span className="bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent md:hidden">
                C
              </span>
              <span className="text-blue-500 hidden md:inline">Limbo </span>
              <span className="text-blue-500 md:hidden">L</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={onHelpClick}
              className="p-1.5 md:p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
              title="How to Play"
            >
              <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
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