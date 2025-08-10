import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, RotateCcw, Share2, HelpCircle, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

interface GameLayoutProps {
  gameTitle: string;
  children: React.ReactNode;
  onRestart?: () => void;
  showRestart?: boolean;
  onHelp?: () => void;
}

export function GameLayout({ 
  gameTitle, 
  children, 
  onRestart, 
  showRestart = false,
  onHelp 
}: GameLayoutProps) {
  const navigate = useNavigate();
  const { user, wallet } = useAuth();

  const handleBack = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white flex">
      {/* Game Content */}
      <div className="flex-1 flex flex-col">
      {/* Game Navigation Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20"
      >
        <div className="flex items-center justify-between p-4">
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
            {/* Wallet Balance */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
              <Wallet size={16} className="text-blue-400" />
              <span className="text-blue-400 font-medium">
                ₹{((wallet?.real_balance || 0) + (wallet?.bonus_balance || 0)).toLocaleString()}
              </span>
            </div>

            {onHelp && (
              <button
                onClick={onHelp}
                className="flex items-center gap-2 px-3 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg transition-colors"
              >
                <HelpCircle size={18} />
                <span className="hidden sm:inline">Help</span>
              </button>
            )}

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
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 rounded-lg transition-colors"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </motion.div>
        {/* Main Game Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
      </div>
    </div>
  );
}