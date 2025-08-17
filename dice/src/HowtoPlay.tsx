import React from 'react';
import { X } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A2634] rounded-2xl max-w-md w-full p-6 border border-blue-500/20 relative">
        <div className="absolute right-4 top-4 flex flex-col items-center">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <span className="text-xs text-gray-400 mt-1">Delete</span>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          How to Play
        </h2>

        <div className="space-y-4 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
              1
            </div>
            <p>
              Set your bet amount using the + and - buttons or type it directly
              (up to your balance)
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
              2
            </div>
            <p>Click 'Start Game' to begin your round</p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
              3
            </div>
            <p>Click on any balloon to reveal its multiplier value</p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
              4
            </div>
            <p>
              Your winnings will be your bet amount × the revealed multiplier
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
              5
            </div>
            <p>Be strategic! Multipliers range from 0.2× to 5×</p>
          </div>

          <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Tip</h3>
            <p className="text-sm text-gray-400">
              The bet increment changes automatically:
              <br />• Under ₹100: Increases/decreases by ₹10
              <br />• Over ₹100: Increases/decreases by ₹100
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 
            hover:from-blue-500 hover:via-blue-600 hover:to-indigo-700
            px-6 py-3 rounded-xl font-bold text-white
            transition-all duration-300 shadow-xl hover:shadow-blue-500/30
            border border-white/10 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
