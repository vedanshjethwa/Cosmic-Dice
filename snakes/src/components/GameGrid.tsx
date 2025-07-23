import React from 'react';
import { motion } from 'framer-motion';
import GridCell from './GridCell';
import DiceSpinner from './DiceSpinner';
import { useGameStore } from '../store/gameStore';

const GameGrid: React.FC = () => {
  const { grid, gameStatus, currentPosition, diceValue, isRolling } = useGameStore();

  return (
    <div className="bg-gradient-to-br from-[#1a2332]/50 to-[#0B0F1A]/50 backdrop-blur-sm rounded-3xl p-8 border border-[#00C3FF]/30 shadow-2xl shadow-[#00C3FF]/10 relative">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#00C3FF] mb-3 tracking-wide">GAME PATH</h3>
        <div className="flex items-center gap-4 text-sm text-slate-300 font-medium">
          <span className="bg-[#00C3FF]/20 px-3 py-1 rounded-full">
            Position: {currentPosition + 1}/25
          </span>
          <span>•</span>
          <span>Roll dice to move forward</span>
        </div>
      </div>
      
      <motion.div
        className="grid grid-cols-5 gap-4 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {grid.map((cell) => (
          <GridCell
            key={cell.id}
            cell={cell}
            isCurrentPosition={cell.isPlayerPosition}
          />
        ))}
        
        {/* Dice Spinner - positioned over the grid */}
        {(gameStatus === 'playing' || gameStatus === 'rolling') && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <DiceSpinner 
              isRolling={isRolling}
              value={diceValue}
              onRoll={() => {}}
            />
          </div>
        )}
      </motion.div>
      
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-6 text-sm text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-[#00C3FF] to-[#0080ff] rounded-full shadow-lg"></div>
            <span>Current Position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full shadow-lg"></div>
            <span>Safe Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-lg"></div>
            <span>Snake</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameGrid;