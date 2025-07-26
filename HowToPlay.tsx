import React from 'react';
import { X, Gamepad2, Target, Zap, Trophy } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameType?: string;
}

export function HowToPlayModal({ isOpen, onClose, gameType = 'general' }: HowToPlayModalProps) {
  if (!isOpen) return null;

  const getGameInstructions = () => {
    switch (gameType) {
      case 'dice':
        return {
          title: 'How to Play Cosmic Dice',
          icon: <Gamepad2 className="w-6 h-6" />,
          instructions: [
            'Choose your bet amount and select a number (1-6)',
            'Click "Roll Dice" to start the game',
            'Win chances vary based on your bet amount',
            'Higher bets = lower win chances but bigger rewards'
          ]
        };
      case 'rps':
        return {
          title: 'How to Play Cosmic RPS',
          icon: <Target className="w-6 h-6" />,
          instructions: [
            'Choose Rock, Paper, or Scissors',
            'Place your bet amount',
            'Win double your bet if you beat the computer',
            'Rock beats Scissors, Paper beats Rock, Scissors beats Paper'
          ]
        };
      case 'balloon':
        return {
          title: 'How to Play Cosmic Balloon',
          icon: <Zap className="w-6 h-6" />,
          instructions: [
            'Set your bet amount',
            'Click "Start Game" to begin',
            'Click on any balloon to reveal its multiplier',
            'Your winnings = bet amount × revealed multiplier'
          ]
        };
      case 'toss':
        return {
          title: 'How to Play Heads & Tails',
          icon: <Trophy className="w-6 h-6" />,
          instructions: [
            'Choose Heads or Tails',
            'Place your bet amount',
            'Click "Flip" to toss the coin',
            'Win double your bet if you guess correctly'
          ]
        };
      default:
        return {
          title: 'How to Play Cosmic Games',
          icon: <Gamepad2 className="w-6 h-6" />,
          instructions: [
            'Choose your game from the available options',
            'Set your bet amount within your balance',
            'Follow the specific game rules',
            'Win rewards based on game outcomes'
          ]
        };
    }
  };

  const gameInfo = getGameInstructions();

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
          <span className="text-xs text-gray-400 mt-1">Close</span>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 flex items-center gap-2">
          {gameInfo.icon}
          {gameInfo.title}
        </h2>

        <div className="space-y-4 text-gray-300">
          {gameInfo.instructions.map((instruction, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                {index + 1}
              </div>
              <p>{instruction}</p>
            </div>
          ))}

          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Pro Tips</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Start with smaller bets to learn the game</li>
              <li>• Set a budget and stick to it</li>
              <li>• Take breaks between gaming sessions</li>
              <li>• Remember: gaming should be fun!</li>
            </ul>
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