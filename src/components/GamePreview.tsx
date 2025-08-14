import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Info, 
  Target,
  Award,
  Wallet,
  Clock,
  Trophy
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface GamePreviewProps {
  gameId: string;
}

export function GamePreview({ gameId }: GamePreviewProps) {
  const navigate = useNavigate();
  const { wallet } = useAuth();
  const [recentBets] = useState([
    { id: 1, amount: 100, multiplier: 2.5, result: 'win', profit: 150, time: '2 min ago' },
    { id: 2, amount: 50, multiplier: 0, result: 'loss', profit: -50, time: '5 min ago' },
    { id: 3, amount: 200, multiplier: 1.8, result: 'win', profit: 160, time: '8 min ago' },
    { id: 4, amount: 75, multiplier: 0, result: 'loss', profit: -75, time: '12 min ago' },
    { id: 5, amount: 150, multiplier: 3.2, result: 'win', profit: 330, time: '15 min ago' },
  ]);

  const gameData = {
    'rps': {
      title: 'Cosmic RPS',
      description: 'Strategic Rock Paper Scissors with cosmic rewards',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=400',
      category: 'Strategy',
      rating: 4.8,
      players: '2.5K',
      rtp: '98.5%',
      minBet: 1,
      maxBet: 100000,
    },
    'dice': {
      title: 'Cosmic Dice',
      description: 'Roll the cosmic dice for instant wins',
      image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=800&h=400',
      category: 'Luck',
      rating: 4.9,
      players: '3.2K',
      rtp: '97.8%',
      minBet: 1,
      maxBet: 100000,
    },
    'balloon': {
      title: 'Cosmic Balloon',
      description: 'Pop balloons for surprise multipliers',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=800&h=400',
      category: 'Luck',
      rating: 4.5,
      players: '1.9K',
      rtp: '96.8%',
      minBet: 1,
      maxBet: 50000,
    },
    'limbo': {
      title: 'Cosmic Limbo',
      description: 'How low can you go?',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800&h=400',
      category: 'Risk',
      rating: 4.7,
      players: '1.8K',
      rtp: '97.2%',
      minBet: 1,
      maxBet: 100000,
    },
    'card': {
      title: 'Cosmic Cards',
      description: 'Pick your fortune card',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=800&h=400',
      category: 'Luck',
      rating: 4.4,
      players: '1.5K',
      rtp: '96.5%',
      minBet: 1,
      maxBet: 50000,
    },
    'snakes': {
      title: 'Cosmic Snakes',
      description: 'Navigate the cosmic maze',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=400',
      category: 'Adventure',
      rating: 4.6,
      players: '2.1K',
      rtp: '97.0%',
      minBet: 1,
      maxBet: 75000,
    },
    'minesweeper': {
      title: 'Cosmic Minesweeper',
      description: 'Navigate the cosmic minefield',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=800&h=400',
      category: 'Strategy',
      rating: 4.2,
      players: '1.1K',
      rtp: '96.2%',
      minBet: 1,
      maxBet: 25000,
    },
    'toss': {
      title: 'Cosmic Heads & Tails',
      description: 'Classic coin flip with cosmic rewards',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800&h=400',
      category: 'Luck',
      rating: 4.7,
      players: '2.3K',
      rtp: '98.0%',
      minBet: 1,
      maxBet: 100000,
    },
    'prediction-pulse': {
      title: 'Prediction Pulse',
      description: 'Time your predictions perfectly',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=800&h=400',
      category: 'Timing',
      rating: 4.3,
      players: '1.3K',
      rtp: '96.8%',
      minBet: 1,
      maxBet: 50000,
    },
  };

  const game = gameData[gameId as keyof typeof gameData];

  if (!game) {
    return (
      <div className="min-h-screen bg-[#0A1929] flex items-center justify-center">
        <div className="cosmic-panel p-8 text-center max-w-md">
          <h1 className="cosmic-heading-secondary text-white mb-4">Game Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="cosmic-button-primary text-white px-6 py-3 rounded-xl transition-colors"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  const totalBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="cosmic-button-primary p-3 rounded-xl transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <h1 className="cosmic-heading-secondary text-white">
                {game.title}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="cosmic-panel px-4 py-2 flex items-center gap-2">
                <Wallet size={16} className="text-blue-400" />
                <span className="cosmic-text-accent font-medium">
                  ₹{totalBalance.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => navigate(`/game/${gameId}`)}
                className="cosmic-button-primary text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <Play size={20} />
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Game Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-64 lg:h-80 rounded-2xl overflow-hidden mb-8 cosmic-game-card"
        >
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="cosmic-category-tag">{game.category}</span>
              <span className="cosmic-category-tag bg-green-500/20 text-green-400 border-green-500/30">
                {game.rtp} RTP
              </span>
            </div>
            <h2 className="cosmic-heading-primary text-white mb-2">{game.title}</h2>
            <p className="text-gray-300 text-lg mb-4">{game.description}</p>
            <button
              onClick={() => navigate(`/game/${gameId}`)}
              className="cosmic-play-button shadow-lg hover:shadow-blue-500/30"
            >
              <Play size={24} />
              Start Playing
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="cosmic-panel p-6"
          >
            <h3 className="cosmic-heading-secondary text-white mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-400" />
              Game Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-400">Rating</span>
                </div>
                <span className="text-white font-bold">{game.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">Players</span>
                </div>
                <span className="text-white font-bold">{game.players}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400">RTP</span>
                </div>
                <span className="text-green-400 font-bold">{game.rtp}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-400">Bet Range</span>
                </div>
                <span className="text-white font-bold">₹{game.minBet}-₹{game.maxBet.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Bets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cosmic-panel p-6"
          >
            <h3 className="cosmic-heading-secondary text-white mb-6 flex items-center gap-2">
              <Clock className="text-blue-400" />
              Recent Bets
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto cosmic-scrollbar">
              {recentBets.map((bet) => (
                <div
                  key={bet.id}
                  className={`p-4 rounded-xl border transition-all hover:scale-102 ${
                    bet.result === 'win'
                      ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
                      : 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className={`font-bold ${
                      bet.result === 'win' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {bet.result === 'win' ? 'Won' : 'Lost'}
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">₹{bet.amount}</div>
                      <div className={`text-sm font-bold ${
                        bet.profit > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {bet.profit >= 0 ? '+' : ''}₹{bet.profit}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{bet.time}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Your Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="cosmic-panel p-6"
          >
            <h3 className="cosmic-heading-secondary text-white mb-6 flex items-center gap-2">
              <Award className="text-purple-400" />
              Your Stats
            </h3>
            <div className="space-y-4">
              <div className="cosmic-panel p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                <div className="text-xl font-bold text-green-400">+₹1,250</div>
              </div>
              <div className="cosmic-panel p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Games Won</div>
                <div className="text-xl font-bold text-green-400">24</div>
              </div>
              <div className="cosmic-panel p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Games Lost</div>
                <div className="text-xl font-bold text-red-400">18</div>
              </div>
              <div className="cosmic-panel p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Win Rate</div>
                <div className="text-xl font-bold text-purple-400">57%</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Game Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 cosmic-panel p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="cosmic-heading-secondary text-white">Game Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="cosmic-panel p-4">
              <h4 className="font-bold text-blue-400 mb-3">Game Rules</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Easy to learn, fun to master</li>
                <li>• Provably fair algorithms</li>
                <li>• Instant results</li>
                <li>• Multiple betting options</li>
                <li>• Real-time statistics</li>
              </ul>
            </div>
            <div className="cosmic-panel p-4">
              <h4 className="font-bold text-green-400 mb-3">Strategy Tips</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Start with small bets</li>
                <li>• Understand the odds</li>
                <li>• Set win/loss limits</li>
                <li>• Take regular breaks</li>
                <li>• Play responsibly</li>
              </ul>
            </div>
            <div className="cosmic-panel p-4">
              <h4 className="font-bold text-purple-400 mb-3">Game Features</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• High RTP: {game.rtp}</li>
                <li>• Min bet: ₹{game.minBet}</li>
                <li>• Max bet: ₹{game.maxBet.toLocaleString()}</li>
                <li>• Instant payouts</li>
                <li>• Mobile optimized</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}