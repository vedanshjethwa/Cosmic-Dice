import { ArrowLeft, Info } from 'lucide-react';

interface BorderProps {
  onBackClick: () => void;
  onHelpClick: () => void;
}

export function Border({ onBackClick, onHelpClick }: BorderProps) {
  return (
    <header className="bg-gradient-to-b from-black/80 via-black/60 to-black/40 p-4 relative z-20">
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
              <span className="text-[#1E90FF] hidden md:inline">card</span>
              <span className="text-[#1E90FF] md:hidden">C</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={onHelpClick}
              className="p-1.5 md:p-2 hover:bg-blue-500/10 rounded-lg transition-colors"
              title="How to Play"
            >
              <Info className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}