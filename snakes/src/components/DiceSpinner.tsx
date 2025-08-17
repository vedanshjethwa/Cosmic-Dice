import React from 'react';
import { motion } from 'framer-motion';

interface DiceSpinnerProps {
  isRolling: boolean;
  value: number | null;
  onRoll: () => void;
}

const DiceSpinner: React.FC<DiceSpinnerProps> = ({ isRolling, value }) => {
  const getDiceDisplay = () => {
    if (isRolling) {
      return (
        <motion.div
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 0.15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="text-7xl filter drop-shadow-lg"
        >
          🎲
        </motion.div>
      );
    }
    
    if (value) {
      const diceEmojis = ['', '⚀', '⚁', '⚂'];
      return (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.6, 
            type: "spring",
            bounce: 0.4
          }}
          className="text-7xl filter drop-shadow-lg"
        >
          {diceEmojis[value]}
        </motion.div>
      );
    }
    
    return (
      <div className="text-7xl opacity-60 filter drop-shadow-lg">
        🎲
      </div>
    );
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-[#0B0F1A] via-[#1a2332] to-[#0B0F1A] border-2 border-[#00C3FF] rounded-3xl p-8 shadow-2xl shadow-[#00C3FF]/30 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      style={{
        boxShadow: `
          0 0 30px rgba(0, 195, 255, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.2)
        `
      }}
    >
      <div className="flex flex-col items-center gap-3">
        {getDiceDisplay()}
        
        {isRolling && (
          <motion.div
            className="text-[#00C3FF] text-lg font-bold tracking-wide"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ROLLING...
          </motion.div>
        )}
        
        {value && !isRolling && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#00C3FF] text-lg font-bold tracking-wide"
          >
            MOVE {value} STEP{value > 1 ? 'S' : ''}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DiceSpinner;