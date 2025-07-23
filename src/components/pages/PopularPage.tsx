import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Users, ArrowLeft } from 'lucide-react';

export function PopularPage() {
  const popularGames = [
    {
      id: 1,
      title: 'Cosmic RPS',
      image:
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      players: '2.5K',
      rating: 4.8,
      category: 'Strategy',
      trending: true,
    },
    {
      id: 2,
      title: 'Space Slots',
      image:
        'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      players: '3.2K',
      rating: 4.9,
      category: 'Slots',
      trending: true,
    },
    {
      id: 3,
      title: 'Cyber Poker',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      players: '1.8K',
      rating: 4.7,
      category: 'Card Games',
      trending: false,
    },
    {
      id: 4,
      title: 'Neon Roulette',
      image:
        'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      players: '2.1K',
      rating: 4.6,
      category: 'Table Games',
      trending: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A1929] p-2 sm:p-4 lg:p-6 text-white">
      <div className='transition-all duration-300 ease-in-out'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <button className="mr-2 text-gray-400 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <TrendingUp className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Popular Games
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Discover the most played and highest-rated games on our platform
        </p>
      </motion.div>

      {/* Popular Games Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {popularGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#132F4C] rounded-xl overflow-hidden cursor-pointer"
          >
            <div className="relative h-48">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              {game.trending && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                  🔥 Trending
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] to-transparent" />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{game.title}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-gray-300 text-sm">{game.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-400 text-sm bg-blue-500/20 px-2 py-1 rounded-full">
                  {game.category}
                </span>
                <div className="flex items-center gap-1 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{game.players}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-colors">
                Play Now
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </div>
  );
}
