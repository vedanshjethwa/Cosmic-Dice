import React from 'react';
import { useGame } from '../../context/GameContext';
import { Skull, RefreshCw } from 'lucide-react';

const GameOver: React.FC = () => {
  const { state, resetGame } = useGame();
  
  if (!state.isGameOver) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fadeIn">
      <div className="max-w-md p-8 bg-gray-900 border-2 border-red-800 rounded-lg text-center">
        <div className="mb-6 flex justify-center">
          <Skull className="h-20 w-20 text-red-600" />
        </div>
        
        <h2 className="text-4xl font-serif text-red-600 mb-4">GAME OVER</h2>
        
        <p className="text-gray-300 mb-6">
          The horrors of the mansion have claimed another victim. You have perished in the darkness.
        </p>
        
        <div className="mb-4">
          <p className="text-gray-400">Rooms explored: {state.player.visitedRooms.length}</p>
          <p className="text-gray-400">Floors reached: {state.currentFloor + 1}</p>
        </div>
        
        <button
          className="px-6 py-3 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
          onClick={resetGame}
        >
          <RefreshCw className="h-5 w-5" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;