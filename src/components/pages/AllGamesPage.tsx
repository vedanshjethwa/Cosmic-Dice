import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad, Search, Filter, Star, Users, Clock, TrendingUp } from 'lucide-react';
import { GameGrid } from '../GameGrid';

export function AllGamesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const allGames = [
    {
      label: 'Cosmic RPS',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/rps',
      description: 'Rock Paper Scissors with cosmic twists and strategic gameplay',
      category: 'Strategy',
      players: '2.5K',
      rating: 4.8,
      isFeatured: true,
      isNew: false,
    },
    {
      label: 'Cosmic Dice',
      image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/dice',
      description: 'Roll the cosmic dice and test your luck with various betting strategies',
      category: 'Luck',
      players: '3.2K',
      rating: 4.9,
      isFeatured: true,
      isNew: false,
    },
    {
      label: 'Cosmic Limbo',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/limbo',
      description: 'How low can you go in this thrilling multiplier game',
      category: 'Risk',
      players: '1.8K',
      rating: 4.7,
      isNew: false,
    },
    {
      label: 'Cosmic Snakes',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/snakes',
      description: 'Navigate through the cosmic maze and avoid the snakes',
      category: 'Adventure',
      players: '2.1K',
      rating: 4.6,
      isNew: false,
    },
    {
      label: 'Cosmic Cards',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/card',
      description: 'Pick your fortune card and reveal cosmic rewards',
      category: 'Luck',
      players: '1.7K',
      rating: 4.5,
      isNew: false,
    },
    {
      label: 'Prediction Pulse',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/prediction-pulse',
      description: 'Time your predictions perfectly for maximum rewards',
      category: 'Timing',
      players: '1.5K',
      rating: 4.4,
      isNew: false,
    },
    {
      label: 'Cosmic Balloon',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/balloon',
      description: 'Pop balloons for cosmic rewards and multipliers',
      category: 'Luck',
      players: '1.9K',
      rating: 4.5,
      isNew: true,
    },
    {
      label: 'Cosmic Minesweeper',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/minesweeper',
      description: 'Navigate the cosmic minefield with precision and strategy',
      category: 'Strategy',
      players: '1.3K',
      rating: 4.3,
      isNew: true,
    },
    {
      label: 'Cosmic Heads & Tails',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/toss',
      description: 'Classic coin flip with cosmic rewards and fast gameplay',
      category: 'Luck',
      players: '2.3K',
      rating: 4.7,
      isNew: true,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Games', count: allGames.length },
    { id: 'Strategy', name: 'Strategy', count: allGames.filter(g => g.category === 'Strategy').length },
    { id: 'Luck', name: 'Luck', count: allGames.filter(g => g.category === 'Luck').length },
    { id: 'Risk', name: 'Risk', count: allGames.filter(g => g.category === 'Risk').length },
    { id: 'Adventure', name: 'Adventure', count: allGames.filter(g => g.category === 'Adventure').length },
    { id: 'Timing', name: 'Timing', count: allGames.filter(g => g.category === 'Timing').length },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular', icon: <TrendingUp size={16} /> },
    { id: 'rating', name: 'Highest Rated', icon: <Star size={16} /> },
    { id: 'players', name: 'Most Players', icon: <Users size={16} /> },
    { id: 'newest', name: 'Newest First', icon: <Clock size={16} /> },
  ];

  // Filter and sort games
  let filteredGames = allGames.filter(game => {
    const matchesSearch = game.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort games
  filteredGames = filteredGames.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'players':
        return parseFloat(b.players?.replace('K', '') || '0') - parseFloat(a.players?.replace('K', '') || '0');
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: // popular
        return parseFloat(b.players?.replace('K', '') || '0') - parseFloat(a.players?.replace('K', '') || '0');
    }
  });

  const gameStats = {
    totalGames: allGames.length,
    totalPlayers: allGames.reduce((sum, game) => sum + parseFloat(game.players?.replace('K', '') || '0'), 0),
    averageRating: allGames.reduce((sum, game) => sum + (game.rating || 0), 0) / allGames.length,
    newGames: allGames.filter(game => game.isNew).length
  };

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Gamepad className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            All Games
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Explore our complete collection of cosmic gaming experiences
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 mb-8"
      >
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A1929] text-white rounded-lg pl-10 pr-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#0A1929] text-gray-400 hover:text-white hover:bg-blue-600/20'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Sort By</h3>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  sortBy === option.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#0A1929] text-gray-400 hover:text-white hover:bg-purple-600/20'
                }`}
              >
                {option.icon}
                {option.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Games Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {filteredGames.length > 0 ? (
          <GameGrid 
            games={filteredGames} 
            title={`${filteredGames.length} Game${filteredGames.length !== 1 ? 's' : ''} Found`}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">No games found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('popular');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Featured Categories */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold mb-2">Strategy Games</h3>
              <p className="text-gray-400 mb-4">Test your skills and outsmart the competition</p>
              <button 
                onClick={() => setSelectedCategory('Strategy')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Explore Strategy
              </button>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/20">
              <h3 className="text-xl font-bold mb-2">Luck Games</h3>
              <p className="text-gray-400 mb-4">Trust your fortune and win big rewards</p>
              <button 
                onClick={() => setSelectedCategory('Luck')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Your Luck
              </button>
            </div>
            <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-xl p-6 border border-red-500/20">
              <h3 className="text-xl font-bold mb-2">High Risk</h3>
              <p className="text-gray-400 mb-4">High stakes, high rewards for the brave</p>
              <button 
                onClick={() => setSelectedCategory('Risk')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Take the Risk
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}