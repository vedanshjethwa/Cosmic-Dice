import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, RotateCcw, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameNavigationProps {
  gameTitle: string;
  onRestart?: () => void;
  showRestart?: boolean;
}

export function GameNavigation({ gameTitle, onRestart, showRestart = false }: GameNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${gameTitle} - Cosmic Gaming`,
          text: `Check out this amazing ${gameTitle} game!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Back</span>
        </button>
        
        <h1 className="text-lg sm:text-xl font-bold text-white">
          {gameTitle}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {showRestart && onRestart && (
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-3 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-colors"
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline">Restart</span>
          </button>
        )}
        
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-colors"
        >
          <Share2 size={18} />
          <span className="hidden sm:inline">Share</span>
        </button>
        
        <button
          onClick={handleHome}
          className="flex items-center gap-2 px-3 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 rounded-lg transition-colors"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Home</span>
        </button>
      </div>
    </motion.div>
  );
}