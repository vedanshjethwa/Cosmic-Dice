import React from 'react';
import { useGame } from '../../context/GameContext';
import { Award, RefreshCw } from 'lucide-react';

const GameWin: React.FC = () => {
  const { state, resetGame } = useGame();
  
  if (!state.isGameWon) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fadeIn">
      <div className="max-w-md p-8 bg-gray-900 border-2 border-amber-600 rounded-lg text-center">
        <div className="mb-6 flex justify-center">
          <Award className="h-20 w-20 text-amber-400" />
        </div>
        
        <h2 className="text-4xl font-serif text-amber-400 mb-4">YOU ESCAPED</h2>
        
        <p className="text-gray-300 mb-6">
          Against all odds, you have survived the horrors of the mansion and escaped with your life and sanity intact.
        </p>
        
        <div className="mb-4">
          <p className="text-gray-400">Rooms explored: {state.player.visitedRooms.length}</p>
          <p className="text-gray-400">Health remaining: {state.player.health}</p>
          <p className="text-gray-400">Sanity remaining: {state.player.sanity}</p>
        </div>
        
        <button
          className="px-6 py-3 bg-amber-900 hover:bg-amber-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
          onClick={resetGame}
        >
          <RefreshCw className="h-5 w-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameWin;