import React from 'react';
import { motion } from 'framer-motion';
import { GridCell as GridCellType } from '../types';

interface GridCellProps {
  cell: GridCellType;
  isCurrentPosition: boolean;
}

const GridCell: React.FC<GridCellProps> = ({ cell, isCurrentPosition }) => {
  const getCellStyle = () => {
    if (isCurrentPosition) {
      return `
        bg-gradient-to-br from-[#00C3FF] to-[#0080ff] 
        border-[#00C3FF] shadow-2xl shadow-[#00C3FF]/50 
        ring-2 ring-[#00C3FF]/60
      `;
    }
    
    if (!cell.isRevealed) {
      return `
        bg-gradient-to-br from-[#1a2332] to-[#0B0F1A] 
        border-slate-600/50 hover:border-[#00C3FF]/50
        hover:shadow-lg hover:shadow-[#00C3FF]/20
        transition-all duration-300
      `;
    }
    
    if (cell.isSnake) {
      return `
        bg-gradient-to-br from-red-600 to-red-800 
        border-red-400 shadow-2xl shadow-red-500/50
        ring-2 ring-red-400/60
      `;
    }
    
    return `
      bg-gradient-to-br from-emerald-500 to-emerald-700 
      border-emerald-400 shadow-2xl shadow-emerald-500/50
      ring-2 ring-emerald-400/60
    `;
  };

  const getMultiplierColor = () => {
    if (cell.multiplier >= 10) return 'text-yellow-300 drop-shadow-lg';
    if (cell.multiplier >= 5) return 'text-orange-300 drop-shadow-lg';
    if (cell.multiplier >= 2) return 'text-green-300 drop-shadow-lg';
    return 'text-white drop-shadow-lg';
  };

  return (
    <motion.div
      className={`
        aspect-square rounded-2xl border-2 
        flex flex-col items-center justify-center font-bold text-sm relative
        ${getCellStyle()}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: cell.id * 0.02 }}
      whileHover={{ scale: 1.05, y: -2 }}
      style={{
        background: isCurrentPosition 
          ? 'linear-gradient(135deg, #00C3FF 0%, #0080ff 100%)'
          : cell.isRevealed && cell.isSnake
          ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
          : cell.isRevealed
          ? 'linear-gradient(135deg, #10b981 0%, #047857 100%)'
          : 'linear-gradient(135deg, #1a2332 0%, #0B0F1A 100%)',
        boxShadow: isCurrentPosition
          ? '0 0 30px rgba(0, 195, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          : cell.isRevealed && cell.isSnake
          ? '0 0 20px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : cell.isRevealed
          ? '0 0 20px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Position number for unrevealed tiles */}
      {!cell.isRevealed && !isCurrentPosition && (
        <div className="text-slate-400 text-sm font-bold tracking-wide">
          {cell.position}
        </div>
      )}

      {/* Current position indicator */}
      {isCurrentPosition && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        >
          <motion.div 
            className="text-3xl mb-1 filter drop-shadow-lg"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            👤
          </motion.div>
          <div className="text-xs text-white font-bold tracking-wider drop-shadow-lg">
            YOU
          </div>
        </motion.div>
      )}
      
      {/* Revealed content */}
      {cell.isRevealed && !isCurrentPosition && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        >
          {cell.isSnake ? (
            <div className="text-center">
              <motion.div 
                className="text-3xl mb-1 filter drop-shadow-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🐍
              </motion.div>
              <div className="text-xs text-red-200 font-bold tracking-wider drop-shadow-lg">
                SNAKE!
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className={`text-xl font-black tracking-wide ${getMultiplierColor()}`}>
                {cell.multiplier.toFixed(2)}x
              </div>
              <div className="text-xs text-white/90 font-bold tracking-wider drop-shadow-lg">
                SAFE
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Multiplier preview for unrevealed safe tiles */}
      {!cell.isRevealed && !isCurrentPosition && !cell.isSnake && (
        <div className={`absolute bottom-1 right-1 text-xs ${getMultiplierColor()} opacity-70 font-bold`}>
          {cell.multiplier.toFixed(1)}x
        </div>
      )}

      {/* Glowing border effect for special tiles */}
      {(isCurrentPosition || (cell.isRevealed && !cell.isSnake)) && (
        <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
          style={{
            background: isCurrentPosition
              ? 'radial-gradient(circle at center, rgba(0, 195, 255, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(16, 185, 129, 0.3) 0%, transparent 70%)'
          }}
        />
      )}
    </motion.div>
  );
};

export default GridCell;