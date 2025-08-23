import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft, Menu, Play, Star, Users } from 'lucide-react';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function PopularPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const popularGames = [
    {
      label: 'Cosmic RPS',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/rps',
      description: 'Rock Paper Scissors with cosmic twists and strategic gameplay',
      category: 'Strategy',
      players: '2.5K',
      rating: 4.8,
      isFeatured: true,
    },
    {
      label: 'Cosmic Dice',
      image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/dice',
      description: 'Roll the cosmic dice and test your luck',
      category: 'Luck',
      players: '3.2K',
      rating: 4.9,
      isFeatured: true,
    },
    {
      label: 'Cosmic Limbo',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/limbo',
      description: 'How low can you go in this thrilling game',
      category: 'Risk',
      players: '1.8K',
      rating: 4.7,
      isNew: true,
    },
    {
      label: 'Cosmic Snakes',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/snakes',
      description: 'Navigate through the cosmic maze adventure',
      category: 'Adventure',
      players: '2.1K',
      rating: 4.6,
    },
    {
      label: 'Cosmic Cards',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/card',
      description: 'Pick your fortune card and reveal cosmic rewards',
      category: 'Luck',
      players: '1.5K',
      rating: 4.4,
    },
    {
      label: 'Cosmic Balloon',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/balloon',
      description: 'Pop balloons for cosmic rewards',
      category: 'Luck',
      players: '1.9K',
      rating: 4.5,
    },
    {
      label: 'Cosmic Heads & Tails',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/toss',
      description: 'Classic coin flip with cosmic rewards',
      category: 'Luck',
      players: '2.3K',
      rating: 4.7,
    },
    {
      label: 'Cosmic Minesweeper',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/minesweeper',
      description: 'Navigate the cosmic minefield',
      category: 'Strategy',
      players: '1.1K',
      rating: 4.2,
    },
    {
      label: 'Prediction Pulse',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/prediction-pulse',
      description: 'Time your predictions perfectly',
      category: 'Timing',
      players: '1.3K',
      rating: 4.3,
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/popular"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <h1
                className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Cosmic - Popular Games
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <p className="text-gray-400 text-lg">
              Discover the most played and highest-rated games on our platform
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Most Popular Games</h2>
                <span className="text-gray-400 text-sm">
                  {popularGames.length} games
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
                {popularGames.map((game, index) => (
                  <motion.div
                    key={game.route}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="game-card-bordered bg-gradient-to-br from-[#132F4C] to-[#0A1929] rounded-2xl overflow-hidden group cursor-pointer border-2 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col h-full"
                    onClick={() => navigate(game.route)}
                  >
                    {/* Image Container */}
                    <div className="relative h-40 lg:h-48 overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent opacity-80" />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {game.isNew && (
                          <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold animate-pulse shadow-lg rounded-full">
                            NEW
                          </span>
                        )}
                        {game.isFeatured && (
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold shadow-lg rounded-full">
                            FEATURED
                           </span>
                         )}
                       </div>
                       
                       {/* Play button overlay on hover */}
                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
                           <Play size={20} />
                           Play Now
                         </div>
                       </div>
                     </div>
                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-full font-medium border border-blue-500/30">
                          {game.category}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span>{game.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={12} />
                            <span>{game.players}</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {game.label}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 flex-1">
                        {game.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Section Footer */}
              <div className="mt-8 pt-6 border-t border-blue-500/20">
                <div className="text-center text-gray-400 text-sm">
                  <p>Popular games are ranked by player activity and community ratings</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}