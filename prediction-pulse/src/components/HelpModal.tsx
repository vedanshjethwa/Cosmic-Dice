import React from 'react';
import { Sparkles } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#182838] rounded-xl max-w-lg w-full p-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#3b82f6] flex items-center gap-2">
          <Sparkles className="w-6 h-6" /> How to Play
        </h2>
        <div className="space-y-4">
          <div className="bg-[#0f1923] rounded-lg p-4 text-gray-200 space-y-4">
            <div>
              <span className="font-semibold text-[#3b82f6]">Game Rules:</span>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>Watch the blue pulse move across the bar</li>
                <li>Tap when it enters the colored zones to win</li>
                <li>Green zone gives maximum rewards</li>
                <li>Yellow zones give partial rewards</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-[#3b82f6]">Difficulty Levels:</span>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>Low (2x): Wider zones, easier to hit</li>
                <li>Mid (5x): Balanced difficulty and rewards</li>
                <li>High (10x): Narrow zones, highest rewards</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-[#3b82f6]">Rewards:</span>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>Green Zone: 2x–10x your bet (based on difficulty)</li>
                <li>Yellow Zone: 0.5x your bet (partial win)</li>
                <li>Miss: Lose your bet</li>
              </ul>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-semibold hover:bg-[#60a5fa] transition-colors"
        >
          Got It
        </button>
      </div>
    </div>
  );
};

export default HelpModal;