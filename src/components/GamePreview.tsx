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
  Wallet
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
    // Add more games as needed
  };

  const game = gameData[gameId as keyof typeof gameData];

  if (!game) {
    return (
      <div className="min-h-screen bg-[#0A1929] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Game Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
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
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {game.title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
                <Wallet size={16} className="text-blue-400" />
                <span className="text-blue-400 font-medium">
                  ₹{totalBalance.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => navigate(`/game/${gameId}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
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
          className="relative h-64 lg:h-80 rounded-2xl overflow-hidden mb-8"
        >
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h2 className="text-4xl font-bold text-white mb-2">{game.title}</h2>
            <p className="text-gray-300 text-lg">{game.description}</p>
            <button
              onClick={() => navigate(`/game/${gameId}`)}
              className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
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
            className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-6">Game Stats</h3>
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
            className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-6">Recent Bets</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {recentBets.map((bet) => (
                <div
                  key={bet.id}
                  className={`premium-bet-record p-3 rounded-xl border transition-all ${
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
            className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl"
          >
            <h3 className="text-xl font-bold text-white mb-6">Your Stats</h3>
            <div className="space-y-4">
              <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-blue-500/20 text-center">
                <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                <div className="text-xl font-bold text-green-400">+₹1,250</div>
              </div>
              <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-green-500/20 text-center">
                <div className="text-sm text-gray-400 mb-1">Games Won</div>
                <div className="text-xl font-bold text-green-400">24</div>
              </div>
              <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-red-500/20 text-center">
                <div className="text-sm text-gray-400 mb-1">Games Lost</div>
                <div className="text-xl font-bold text-red-400">18</div>
              </div>
              <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-purple-500/20 text-center">
                <div className="text-sm text-gray-400 mb-1">Win Rate</div>
                <div className="text-xl font-bold text-purple-400">57%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}