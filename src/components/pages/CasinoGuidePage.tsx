import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2, TrendingUp, Target, Info, Star, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';

export function CasinoGuidePage() {
  const navigate = useNavigate();

  const gameTypes = [
    {
      icon: <Target className="w-8 h-8 text-blue-400" />,
      title: 'Strategy Games',
      description: 'Games that require skill and decision-making',
      examples: ['Cosmic RPS', 'Cosmic Cards'],
      rtp: '96-98%',
      difficulty: 'Medium',
      tips: 'Learn patterns, practice timing, use psychological tactics'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-400" />,
      title: 'Luck-Based Games',
      description: 'Pure chance games with instant results',
      examples: ['Cosmic Dice', 'Heads & Tails', 'Balloon'],
      rtp: '95-97%',
      difficulty: 'Easy',
      tips: 'Start small, set limits, enjoy the excitement'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      title: 'High-Risk Games',
      description: 'Higher stakes with bigger potential rewards',
      examples: ['Cosmic Limbo', 'Minesweeper'],
      rtp: '94-99%',
      difficulty: 'Hard',
      tips: 'Use conservative betting, understand volatility'
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
            <h1
              className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Cosmic - Online Casino Guide
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-12 h-12 text-blue-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Complete Casino Guide
            </h2>
          </div>
          <p className="text-xl text-gray-300">
            Master the fundamentals of online gaming with our comprehensive guide
          </p>
        </motion.div>

        {/* Game Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Understanding Game Types</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {gameTypes.map((type, index) => (
              <div key={index} className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  {type.icon}
                  <h4 className="text-xl font-bold text-white">{type.title}</h4>
                </div>
                <p className="text-gray-400 mb-4">{type.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">RTP Range:</span>
                    <span className="text-green-400 font-medium">{type.rtp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Difficulty:</span>
                    <span className="text-blue-400 font-medium">{type.difficulty}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-white font-semibold mb-2">Examples:</h5>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((game, gameIndex) => (
                      <span key={gameIndex} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        {game}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-500/20">
                  <h5 className="text-blue-400 font-semibold mb-1">Pro Tip:</h5>
                  <p className="text-gray-300 text-sm">{type.tips}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Understanding Odds & RTP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Understanding Odds & RTP</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-blue-400 mb-4">What is RTP?</h4>
              <p className="text-gray-300 mb-4">
                RTP (Return to Player) is the percentage of all wagered money that a game will pay back 
                to players over time. For example, a 96% RTP means that for every ₹100 wagered, 
                the game will return ₹96 to players on average.
              </p>
              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                <h5 className="text-blue-400 font-semibold mb-2">RTP Examples:</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• 95%+ = Excellent</li>
                  <li>• 90-95% = Good</li>
                  <li>• 85-90% = Average</li>
                  <li>• Below 85% = Poor</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-green-400 mb-4">How Odds Work</h4>
              <p className="text-gray-300 mb-4">
                Odds represent the probability of winning and determine your potential payout. 
                Higher odds mean lower chance of winning but bigger rewards when you do win.
              </p>
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/20">
                <h5 className="text-green-400 font-semibold mb-2">Betting Strategy:</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Low odds = Higher win chance, smaller payouts</li>
                  <li>• High odds = Lower win chance, bigger payouts</li>
                  <li>• Balance risk vs reward based on your goals</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Mechanics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Essential Gaming Concepts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <h4 className="font-bold text-blue-400 mb-2">Volatility</h4>
              <p className="text-gray-300 text-sm">
                How often and how much a game pays out. High volatility = bigger wins but less frequent.
              </p>
            </div>
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <h4 className="font-bold text-green-400 mb-2">House Edge</h4>
              <p className="text-gray-300 text-sm">
                The mathematical advantage the casino has. Lower house edge = better for players.
              </p>
            </div>
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <h4 className="font-bold text-purple-400 mb-2">Multipliers</h4>
              <p className="text-gray-300 text-sm">
                Multiply your bet amount. A 5x multiplier on a ₹100 bet wins you ₹500.
              </p>
            </div>
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <h4 className="font-bold text-yellow-400 mb-2">Bankroll</h4>
              <p className="text-gray-300 text-sm">
                The total amount of money you have available for gaming. Manage it wisely.
              </p>
            </div>
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <h4 className="font-bold text-red-400 mb-2">Variance</h4>
              <p className="text-gray-300 text-sm">
                The ups and downs in your balance. High variance = bigger swings in wins/losses.
              </p>
            </div>
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <h4 className="font-bold text-cyan-400 mb-2">Progressive</h4>
              <p className="text-gray-300 text-sm">
                Jackpots or bonuses that increase over time until someone wins them.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}