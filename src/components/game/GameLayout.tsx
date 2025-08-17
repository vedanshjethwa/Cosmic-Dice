import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, RotateCcw, Share2, HelpCircle, Wallet, Trophy, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const totalBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar - Only in Game Pages */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath={window.location.pathname}
      />

      {/* Game Navigation Header */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20"
      >
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu in Empty Space */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <button
              onClick={handleBack}
              className="cosmic-button-primary px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <h1 className="cosmic-heading-secondary text-white">
              {gameTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Wallet Balance */}
            <div className="cosmic-panel px-4 py-2 flex items-center gap-2">
              <Wallet size={16} className="text-blue-400" />
              <span className="cosmic-text-accent font-bold">
                ₹{totalBalance.toLocaleString()}
              </span>
            </div>

            {onHelp && (
              <button
                onClick={onHelp}
                className="cosmic-button-primary px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
              >
                <HelpCircle size={18} />
                <span className="hidden sm:inline">Help</span>
              </button>
            )}

            {showRestart && onRestart && (
              <button
                onClick={onRestart}
                className="cosmic-button-primary px-4 py-3 rounded-xl transition-colors flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <RotateCcw size={18} />
                <span className="hidden sm:inline">Restart</span>
              </button>
            )}
            
            <button
              onClick={handleShare}
              className="cosmic-button-primary px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </button>
            
            <button
              onClick={handleBack}
              className="cosmic-button-primary px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Game Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 p-6">
            {/* Main Game Area */}
            <div className="xl:col-span-3">
              <div className="cosmic-panel p-6 mb-6">
                {children}
              </div>
              
              {/* Footer under game section */}
              <Footer />
            </div>

            {/* Side Panel */}
            <div className="xl:col-span-1 space-y-6">
              {/* Game Info Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="cosmic-panel p-6"
              >
                <h3 className="cosmic-heading-secondary text-white mb-4 flex items-center gap-2">
                  <Trophy className="text-yellow-400" />
                  Game Info
                </h3>
                <div className="space-y-4">
                  <div className="cosmic-panel p-4">
                    <div className="text-sm text-gray-400 mb-1">Min Bet</div>
                    <div className="text-lg font-bold text-green-400">₹1</div>
                  </div>
                  <div className="cosmic-panel p-4">
                    <div className="text-sm text-gray-400 mb-1">Max Bet</div>
                    <div className="text-lg font-bold text-red-400">₹100,000</div>
                  </div>
                  <div className="cosmic-panel p-4">
                    <div className="text-sm text-gray-400 mb-1">RTP</div>
                    <div className="text-lg font-bold text-blue-400">98.5%</div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Bets Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="cosmic-panel p-6"
              >
                <h3 className="cosmic-heading-secondary text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="text-blue-400" />
                  Recent Bets
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto cosmic-scrollbar">
                  {[1, 2, 3, 4, 5].map((bet) => (
                    <div
                      key={bet}
                      className="cosmic-panel p-3 hover:bg-blue-500/10 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-green-400 font-bold">Won</div>
                        <div className="text-right">
                          <div className="text-white font-medium">₹{bet * 50}</div>
                          <div className="text-green-400 text-sm font-bold">+₹{bet * 25}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{bet} min ago</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="cosmic-panel p-6"
              >
                <h3 className="cosmic-heading-secondary text-white mb-4">Your Stats</h3>
                <div className="space-y-3">
                  <div className="cosmic-panel p-3 text-center">
                    <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                    <div className="text-lg font-bold text-green-400">+₹1,250</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="cosmic-panel p-3 text-center">
                      <div className="text-sm text-gray-400 mb-1">Wins</div>
                      <div className="text-lg font-bold text-green-400">24</div>
                    </div>
                    <div className="cosmic-panel p-3 text-center">
                      <div className="text-sm text-gray-400 mb-1">Losses</div>
                      <div className="text-lg font-bold text-red-400">18</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}