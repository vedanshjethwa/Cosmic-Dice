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
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
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

      {/* Game Content */}
      <div className="relative">
        {/* Game Banner */}
        <div className="relative h-64 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1200&h=400"
            alt={gameTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h2 className="text-4xl font-bold text-white mb-2">{gameTitle}</h2>
            <p className="text-gray-300 text-lg">Premium gaming experience with cosmic rewards</p>
          </div>
        </div>

        {/* Game Content */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Game Area */}
            <div className="lg:col-span-3">
              {children}
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Game Info */}
              <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4">Game Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">RTP:</span>
                    <span className="text-green-400 font-bold">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Min Bet:</span>
                    <span className="text-white">₹1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Bet:</span>
                    <span className="text-white">₹100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Players:</span>
                    <span className="text-blue-400">2.5K online</span>
                  </div>
                </div>
              </div>

              {/* Recent Bets */}
              <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4">Recent Bets</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                  {/* Mock recent bets */}
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className="premium-bet-record p-3 rounded-xl border bg-green-500/10 border-green-500/30 hover:bg-green-500/20 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-white font-bold">2.5x</div>
                        <div className="text-green-400 font-bold">+₹250</div>
                      </div>
                      <div className="text-xs text-gray-400">₹100 bet • 2 min ago</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4">Your Stats</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-blue-500/20 text-center">
                    <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                    <div className="text-xl font-bold text-green-400">+₹1,250</div>
                  </div>
                  <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-green-500/20 text-center">
                    <div className="text-sm text-gray-400 mb-1">Games Won</div>
                    <div className="text-xl font-bold text-green-400">24</div>
                  </div>
                  <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-red-500/20 text-center">
                    <div className="text-sm text-gray-400 mb-1">Games Lost</div>
                    <div className="text-xl font-bold text-red-400">18</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}