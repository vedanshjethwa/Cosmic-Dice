import React from 'react';
import { ArrowLeft, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NewGamesPage() {
  const navigate = useNavigate();

  const newGames = [
    {
      label: 'Cosmic Balloon',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/balloon',
      description: 'Pop balloons for cosmic rewards',
      category: 'Luck',
      isNew: true,
      releaseDate: '2 days ago'
    },
    {
      label: 'Prediction Pulse',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/prediction-pulse',
      description: 'Time your predictions perfectly',
      category: 'Timing',
      isNew: true,
      releaseDate: '1 week ago'
    },
    {
      label: 'Cosmic Minesweeper',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/minesweeper',
      description: 'Navigate the cosmic minefield',
      category: 'Strategy',
      isNew: true,
      releaseDate: '2 weeks ago'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              New Games
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <p className="text-gray-300 text-lg">
            Discover our latest cosmic gaming experiences! These games have been recently added to our platform.
          </p>
        </div>

        {/* New Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newGames.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-[#132F4C] rounded-xl p-4 relative overflow-hidden group cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
              onClick={() => navigate(game.route)}
            >
              {/* New Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star size={12} />
                  NEW
                </div>
              </div>

              <div className="flex flex-col h-full">
                <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={game.image}
                    alt={game.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-blue-400 font-medium">
                      {game.category}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={12} />
                      {game.releaseDate}
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-lg">
                    {game.label}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {game.description}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(game.route);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 w-full font-medium transform hover:scale-105"
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>
          <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">More Games on the Way!</h3>
            <p className="text-gray-400">
              We're constantly working on new and exciting games. Stay tuned for more cosmic adventures!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}