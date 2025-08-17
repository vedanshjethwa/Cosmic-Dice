import React from 'react';
import { motion } from 'framer-motion';
import { Block as BlockType } from '../types';

interface BlockProps {
  block: BlockType;
  onClick: () => void;
  disabled: boolean;
}

const Block: React.FC<BlockProps> = ({ block, onClick, disabled }) => {
  const getBlockColor = () => {
    if (!block.isRevealed) return 'bg-gray-800 hover:bg-gray-700';
    return block.isTrap ? 'bg-red-600' : 'bg-green-600';
  };

  return (
    <motion.button
      className={`w-full h-16 rounded-lg ${getBlockColor()} transition-colors relative overflow-hidden ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${block.isActive ? 'ring-2 ring-amber-400' : ''}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {block.isRevealed && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {block.isTrap ? '💥' : '✨'}
        </motion.div>
      )}
    </motion.button>
  );
};

export default Block;