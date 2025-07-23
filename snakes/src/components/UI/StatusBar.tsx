import React from 'react';
import { useGame } from '../../context/GameContext';
import { Heart, Brain, Coins } from 'lucide-react';

const StatusBar: React.FC = () => {
  const { state } = useGame();
  const { health, sanity, coins } = state.player;
  
  return (
    <div className="bg-gray-900 border-b border-amber-600 p-2 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6 flex items-center justify-center">
          <Heart
            className={`h-6 w-6 ${health < 30 ? 'text-red-600 animate-pulse' : 'text-red-500'}`}
            fill={health < 50 ? "#ef4444" : "#f87171"}
          />
        </div>
        <div className="text-red-500 font-medium">{health}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6 flex items-center justify-center">
          <Brain
            className={`h-6 w-6 ${sanity < 30 ? 'text-purple-600 animate-pulse' : 'text-purple-500'}`}
            fill={sanity < 50 ? "#9333ea" : "#a855f7"}
          />
        </div>
        <div className="text-purple-500 font-medium">{sanity}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6 flex items-center justify-center">
          <Coins
            className="h-6 w-6 text-amber-400"
          />
        </div>
        <div className="text-amber-400 font-medium">{coins}</div>
      </div>
    </div>
  );
};

export default StatusBar;