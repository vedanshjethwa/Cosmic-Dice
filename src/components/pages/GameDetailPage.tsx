import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Info, 
  Clock,
  Target,
  Zap,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

interface GameDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  route: string;
  category: string;
  image: string;
  rating: number;
  players: string;
  rtp: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  minBet: number;
  maxBet: number;
  features: string[];
  rules: string[];
  tips: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export function GameDetailPage() {
  const navigate = useNavigate();
  const { gameId } = useParams();

  const gameDetails: Record<string, GameDetail> = {
    'cosmic-rps': {
      id: 'cosmic-rps',
      title: 'Cosmic RPS',
      description: 'Rock Paper Scissors with cosmic twists',
      longDescription: 'Experience the classic Rock Paper Scissors game with a cosmic twist. Strategic gameplay meets luck in this exciting multiplayer experience where timing and psychology matter.',
      route: '/game/rps',
      category: 'Strategy',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=400',
      rating: 4.8,
      players: '2.5K',
      rtp: '98.5%',
      riskLevel: 'Medium',
      minBet: 10,
      maxBet: 10000,
      features: [
        'Real-time multiplayer',
        'Advanced AI opponents',
        'Multiple betting strategies',
        'Cosmic power-ups',
        'Tournament mode'
      ],
      rules: [
        'Choose Rock, Paper, or Scissors',
        'Rock beats Scissors',
        'Paper beats Rock',
        'Scissors beats Paper',
        'Win double your bet on victory',
        'Draw returns your bet'
      ],
      tips: [
        'Study opponent patterns',
        'Use psychological tactics',
        'Manage your bankroll wisely',
        'Take advantage of power-ups',
        'Practice in free mode first'
      ],
      isFeatured: true,
    },
    'cosmic-balloon': {
      id: 'cosmic-balloon',
      title: 'Cosmic Balloon',
      description: 'Pop balloons for cosmic rewards',
      longDescription: 'A thrilling game of chance where you pop colorful balloons to reveal hidden multipliers. Each balloon contains a different reward, making every pop an exciting surprise.',
      route: '/game/balloon',
      category: 'Luck',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=800&h=400',
      rating: 4.5,
      players: '1.9K',
      rtp: '96.8%',
      riskLevel: 'Low',
      minBet: 1,
      maxBet: 5000,
      features: [
        'Multiple balloon types',
        'Hidden multipliers',
        'Bonus rounds',
        'Progressive jackpots',
        'Auto-pop feature'
      ],
      rules: [
        'Select your bet amount',
        'Choose a balloon to pop',
        'Reveal the hidden multiplier',
        'Win bet × multiplier',
        'Multipliers range from 0.1x to 100x'
      ],
      tips: [
        'Start with smaller bets',
        'Look for pattern recognition',
        'Use the auto-pop strategically',
        'Take advantage of bonus rounds',
        'Set win/loss limits'
      ],
      isNew: true,
    },
    // Add more game details as needed
  };

  const game = gameDetails[gameId || ''];

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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-500/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'High': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen text-white">
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
              <h1
                className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
                style={{
                   fontFamily: "'Orbitron', sans-serif"
                  }}
              >
                Cosmic - {game.title}
              </h1>
            </div>
            <button
              onClick={() => navigate(game.route)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Play size={20} />
              Play Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#132F4C] rounded-2xl overflow-hidden border border-blue-500/20 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-64 lg:h-80">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] to-transparent" />
              {game.isNew && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                    NEW
                  </span>
                </div>
              )}
              {game.isFeatured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                    FEATURED
                  </span>
                </div>
              )}
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                  {game.category}
                </span>
                <span className={`px-3 py-1 text-sm rounded-full ${getRiskColor(game.riskLevel)}`}>
                  {game.riskLevel} Risk
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">{game.title}</h1>
              <p className="text-gray-300 text-lg mb-6">{game.longDescription}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">{game.rating}</span>
                  <span className="text-gray-400">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">{game.players}</span>
                  <span className="text-gray-400">Players</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">{game.rtp}</span>
                  <span className="text-gray-400">RTP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">₹{game.minBet}-₹{game.maxBet.toLocaleString()}</span>
                  <span className="text-gray-400">Bet Range</span>
                </div>
              </div>

              <button
                onClick={() => navigate(game.route)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Play size={24} />
                Start Playing
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Features</h2>
            </div>
            <ul className="space-y-3">
              {game.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Game Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white">How to Play</h2>
            </div>
            <ol className="space-y-3">
              {game.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{rule}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Pro Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Pro Tips</h2>
            </div>
            <ul className="space-y-3">
              {game.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Fair Play & Security</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Provably Fair</h3>
              <p className="text-gray-300 text-sm">
                All game outcomes are cryptographically verifiable, ensuring complete fairness and transparency.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Responsible Gaming</h3>
              <p className="text-gray-300 text-sm">
                Set limits, take breaks, and play responsibly. Gaming should always be fun and within your means.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}