import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Menu, Clock, Calendar, Star, Users, Zap } from 'lucide-react';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function UpcomingGamesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const upcomingGames = [
    {
      label: 'Cosmic Slots',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
      description: 'Revolutionary slot machine experience with cosmic themes and massive jackpots',
      category: 'Slots',
      expectedPlayers: '10K+',
      rating: 'TBA',
      releaseDate: '2024-04-15',
      status: 'In Development',
      features: ['Progressive Jackpots', 'Bonus Rounds', 'Free Spins'],
    },
    {
      label: 'Space Poker',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=225',
      description: 'Multiplayer cosmic poker tournaments with interstellar prizes',
      category: 'Card Games',
      expectedPlayers: '5K+',
      rating: 'TBA',
      releaseDate: '2024-06-20',
      status: 'Beta Testing',
      features: ['Multiplayer', 'Tournaments', 'Live Chat'],
    },
    {
      label: 'Galaxy Roulette',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
      description: 'Interstellar roulette with cosmic rewards and special betting options',
      category: 'Table Games',
      expectedPlayers: '8K+',
      rating: 'TBA',
      releaseDate: '2024-08-10',
      status: 'Concept',
      features: ['Live Dealers', 'Special Bets', 'VIP Tables'],
    },
    {
      label: 'Nebula Blackjack',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      description: 'Classic blackjack with a cosmic twist and side bet options',
      category: 'Card Games',
      expectedPlayers: '6K+',
      rating: 'TBA',
      releaseDate: '2024-09-05',
      status: 'Planning',
      features: ['Side Bets', 'Insurance', 'Double Down'],
    },
    {
      label: 'Asteroid Crash',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=225',
      description: 'High-risk, high-reward crash game set in an asteroid field',
      category: 'Crash Games',
      expectedPlayers: '12K+',
      rating: 'TBA',
      releaseDate: '2024-10-15',
      status: 'Early Development',
      features: ['Auto Cashout', 'Statistics', 'Chat'],
    },
    {
      label: 'Cosmic Bingo',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=225',
      description: 'Space-themed bingo with multiple rooms and special patterns',
      category: 'Bingo',
      expectedPlayers: '4K+',
      rating: 'TBA',
      releaseDate: '2024-11-20',
      status: 'Concept',
      features: ['Multiple Rooms', 'Special Patterns', 'Jackpots'],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beta Testing': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'In Development': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Planning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Early Development': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getDaysUntilRelease = (releaseDate: string) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const diffTime = release.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/upcoming"
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
                <Clock className="text-orange-400" />
                Upcoming Games
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-8 border border-orange-500/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-orange-400" size={32} />
              <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
            </div>
            <p className="text-gray-300 text-lg mb-4">
              Get ready for the next generation of cosmic gaming experiences. These exciting new games are currently in development and will be launching soon!
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Regular Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} />
                <span>Cutting-edge Features</span>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Games Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">In Development ({upcomingGames.length})</h3>
            </div>
            
            <div className="cosmic-game-grid">
              {upcomingGames.map((game, index) => (
                <motion.div
                  key={game.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="cosmic-game-card border-orange-500/30 hover:border-orange-400/50 hover:shadow-orange-500/20 flex flex-col h-full"
                >
                  <div className="relative h-48 flex-shrink-0">
                    <img
                      src={game.image}
                      alt={game.label}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-75"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent opacity-90" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(game.status)}`}>
                        {game.status}
                      </span>
                    </div>

                    {/* Days Until Release */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm text-xs text-white">
                        {getDaysUntilRelease(game.releaseDate)} days
                      </div>
                    </div>

                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-gradient-to-r from-orange-600/80 to-red-600/80 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 backdrop-blur-sm">
                        <Clock size={20} />
                        Coming Soon
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-orange-400 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-3 py-1 rounded-full font-medium border border-orange-500/30">
                        {game.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(game.releaseDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="font-bold text-white mb-2 text-lg">
                      {game.label}
                    </h4>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                      {game.description}
                    </p>

                    <button 
                      disabled
                      className="w-full bg-gray-600/50 text-gray-400 py-3 rounded-xl font-medium cursor-not-allowed mt-auto"
                    >
                      Coming Soon
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Be the first to know when new games launch! Get exclusive early access and special bonuses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#132F4C] text-white rounded-lg px-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}