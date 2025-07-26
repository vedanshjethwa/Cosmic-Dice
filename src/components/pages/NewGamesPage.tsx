import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Star, Users, Clock } from 'lucide-react';
import { GameGrid } from '../GameGrid';

const NewGamesPage: React.FC = () => {
  const navigate = useNavigate();
  
  const newGames = [
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
      label: 'Cosmic Heads & Tails',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/toss',
      description: 'Classic coin flip with cosmic rewards',
      category: 'Luck',
      players: '2.3K',
      rating: 4.7,
      isNew: true,
    },
    {
      label: 'Cosmic Minesweeper',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/minesweeper',
      description: 'Navigate the cosmic minefield with precision',
      category: 'Strategy',
      players: '1.5K',
      rating: 4.4,
      isNew: true,
    },
    {
      label: 'Prediction Pulse',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/prediction-pulse',
      description: 'Time your predictions perfectly for maximum rewards',
      category: 'Timing',
      players: '1.7K',
      rating: 4.6,
      isNew: true,
    },
  ];

  const upcomingFeatures = [
    {
      title: 'Multiplayer Tournaments',
      description: 'Compete against other players in real-time tournaments',
      eta: 'Coming Soon',
      icon: '🏆'
    },
    {
      title: 'Daily Challenges',
      description: 'Complete daily challenges for exclusive rewards',
      eta: 'Next Update',
      icon: '🎯'
    },
    {
      title: 'Cosmic Leaderboards',
      description: 'Climb the ranks and earn prestigious titles',
      eta: 'In Development',
      icon: '👑'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            New Games
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Discover the latest additions to our cosmic gaming universe
        </p>
      </motion.div>

      {/* New Games Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <GameGrid 
          games={newGames} 
          title="Recently Added Games"
        />
      </motion.div>

      {/* Upcoming Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-purple-400" />
          Coming Soon
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-[#132F4C] rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                  {feature.eta}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20"
      >
        <h3 className="text-xl font-bold mb-4 text-white">New Games Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">4</div>
            <div className="text-gray-400">New Games Added</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">7.4K</div>
            <div className="text-gray-400">Total Players</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">4.6</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewGamesPage;