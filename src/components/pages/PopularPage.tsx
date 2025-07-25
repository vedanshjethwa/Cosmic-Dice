import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Star, Users, ArrowLeft } from 'lucide-react';
import { GameGrid } from '../GameGrid';

export function PopularPage() {
  const navigate = useNavigate();
  
  const popularGames = [
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
  ];

  const handleBackToHome = () => {
    navigate('/');
  };
  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
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
      <GameGrid 
        games={popularGames} 
        title="Most Popular Games"
      />
    </div>
  );
}
