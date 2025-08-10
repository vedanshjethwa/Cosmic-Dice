import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Menu, Sparkles, Calendar, Star } from 'lucide-react';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export default function NewGamesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const newGames = [
    {
      label: 'Cosmic Limbo',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/limbo',
      description: 'How low can you go in this thrilling multiplier game',
      category: 'Risk',
      players: '1.8K',
      rating: 4.7,
      releaseDate: '2024-01-15',
      isNew: true,
    },
    {
      label: 'Cosmic Balloon',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/balloon',
      description: 'Pop balloons for cosmic rewards and multipliers',
      category: 'Luck',
      players: '1.9K',
      rating: 4.5,
      releaseDate: '2024-01-10',
      isNew: true,
    },
    {
      label: 'Cosmic Minesweeper',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/minesweeper',
      description: 'Navigate the cosmic minefield and claim your rewards',
      category: 'Strategy',
      players: '1.1K',
      rating: 4.2,
      releaseDate: '2024-01-05',
      isNew: true,
    },
    {
      label: 'Cosmic Heads & Tails',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/toss',
      description: 'Classic coin flip with cosmic rewards and fast-paced action',
      category: 'Luck',
      players: '2.3K',
      rating: 4.7,
      releaseDate: '2024-01-01',
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/new-games"
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
                className="text-xl sm:text-2xl font-bold text-white transition-all duration-300 flex items-center gap-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <Sparkles className="text-green-400" />
                New Games
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-8 border border-green-500/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-green-400" size={32} />
              <h2 className="text-3xl font-bold text-white">Latest Releases</h2>
            </div>
            <p className="text-gray-300 text-lg mb-4">
              Discover our newest cosmic games with cutting-edge features and exciting gameplay mechanics.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Updated Weekly</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Premium Quality</span>
              </div>
            </div>
          </motion.div>

          {/* New Games Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Recently Added ({newGames.length})</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
              {newGames.map((game, index) => (
                <motion.div
                  key={game.route}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="premium-game-card bg-gradient-to-br from-[#132F4C] to-[#0A1929] rounded-2xl overflow-hidden cursor-pointer border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:shadow-green-500/20 flex flex-col h-full"
                  onClick={() => navigate(game.route)}
                >
                  <div className="relative h-48 flex-shrink-0">
                    <img
                      src={game.image}
                      alt={game.label}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent opacity-80" />
                    
                    {/* NEW Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full animate-pulse shadow-lg">
                        NEW
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-white">
                      <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        <Star size={10} className="text-yellow-400 fill-current" />
                        <span>{game.rating}</span>
                      </div>
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform">
                        <Sparkles size={20} />
                        Play Now
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1 rounded-full font-medium border border-green-500/30">
                        {game.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(game.releaseDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="font-bold text-white mb-2 text-lg group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {game.label}
                    </h4>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                      {game.description}
                    </p>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(game.route);
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl transition-all font-medium shadow-lg hover:shadow-green-500/30 transform hover:scale-105 mt-auto"
                    >
                      Play Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="text-purple-400" />
              Coming Soon
            </h3>
            <p className="text-gray-300 mb-4">
              Stay tuned for more exciting games launching soon! Follow us for updates on new releases.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#132F4C]/50 rounded-xl p-4 border border-purple-500/20">
                <h4 className="font-bold text-purple-400 mb-2">Cosmic Slots</h4>
                <p className="text-gray-400 text-sm">Revolutionary slot machine experience</p>
                <span className="text-xs text-gray-500 mt-2 block">Q2 2024</span>
              </div>
              <div className="bg-[#132F4C]/50 rounded-xl p-4 border border-purple-500/20">
                <h4 className="font-bold text-purple-400 mb-2">Space Poker</h4>
                <p className="text-gray-400 text-sm">Multiplayer cosmic poker tournaments</p>
                <span className="text-xs text-gray-500 mt-2 block">Q3 2024</span>
              </div>
              <div className="bg-[#132F4C]/50 rounded-xl p-4 border border-purple-500/20">
                <h4 className="font-bold text-purple-400 mb-2">Galaxy Roulette</h4>
                <p className="text-gray-400 text-sm">Interstellar roulette with cosmic rewards</p>
                <span className="text-xs text-gray-500 mt-2 block">Q4 2024</span>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}