import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid, ArrowLeft, Menu, Search, Filter } from 'lucide-react';
import { GameGrid } from '../GameGrid';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function AllGamesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const allGames = [
    {
      label: 'Cosmic RPS',
      image:
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      route: '/game/rps',
      description: 'Rock Paper Scissors with cosmic twists and strategic gameplay',
      category: 'Strategy',
      players: '2.5K',
      rating: 4.8,
      isFeatured: true,
    },
    {
      label: 'Cosmic Dice',
      image:
        'https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      route: '/game/dice',
      description: 'Roll the cosmic dice and test your luck',
      category: 'Luck',
      players: '3.2K',
      rating: 4.9,
      isFeatured: true,
    },
    {
      label: 'Cosmic Limbo',
      image:
        'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      route: '/game/limbo',
      description: 'How low can you go in this thrilling game',
      category: 'Risk',
      players: '1.8K',
      rating: 4.7,
      isNew: true,
    },
    {
      label: 'Cosmic Snakes',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      route: '/game/snakes',
      description: 'Navigate through the cosmic maze adventure',
      category: 'Adventure',
      players: '2.1K',
      rating: 4.6,
    },
    {
      label: 'Cosmic Balloon',
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      route: '/game/balloon',
      description: 'Pop balloons for cosmic rewards',
      category: 'Luck',
      players: '1.9K',
      rating: 4.5,
    },
    {
      label: 'Cosmic Heads & Tails',
      image:
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      route: '/game/toss',
      description: 'Classic coin flip with cosmic rewards',
      category: 'Luck',
      players: '2.3K',
      rating: 4.7,
    },
    {
      label: 'Cosmic Minesweeper',
      image:
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      route: '/game/minesweeper',
      description: 'Navigate through the cosmic minefield',
      category: 'Strategy',
      players: '1.5K',
      rating: 4.4,
    },
    {
      label: 'Cosmic Cards',
      image:
        'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      route: '/game/cards',
      description: 'Strategic card game with cosmic elements',
      category: 'Strategy',
      players: '1.7K',
      rating: 4.3,
    },
    {
      label: 'Prediction Pulse',
      image:
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      route: '/game/prediction',
      description: 'Predict the future and win cosmic rewards',
      category: 'Prediction',
      players: '2.0K',
      rating: 4.6,
      isNew: true,
    },
  ];

  const categories = ['all', 'Strategy', 'Luck', 'Risk', 'Adventure', 'Timing'];

  const filteredGames = allGames.filter(game => {
    const matchesSearch = game.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/all-games"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
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
                Cosmic - All Games
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full lg:w-64 bg-[#0A1929] text-white rounded-lg pl-10 pr-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#0A1929] text-gray-300 hover:bg-blue-600/20'
                    }`}
                  >
                    {category === 'all' ? 'All Games' : category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="mb-8">
            <p className="text-gray-400 text-lg mb-6">
              Explore our complete collection of cosmic games ({filteredGames.length} games)
            </p>
            
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GameGrid 
              games={filteredGames} 
              title="All Available Games"
              searchTerm={searchTerm}
            />
          </motion.div>
        </div>

        <Footer />
      </div>
    );
  }
}
  )
}