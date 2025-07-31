import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, TrendingUp, AlertTriangle, DollarSign, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';

export function BettingGuidePage() {
  const navigate = useNavigate();

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
              Cosmic - How Much to Bet With
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-12 h-12 text-blue-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Smart Betting Guide
            </h2>
          </div>
          <p className="text-xl text-gray-300">
            Learn how to bet responsibly and maximize your gaming experience
          </p>
        </motion.div>

        {/* Main Advice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Golden Rules of Betting</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Start Small</h4>
                <p className="text-gray-400">
                  Begin with small bets to understand the game mechanics. Don't bet all your funds at once. 
                  This helps you learn without risking too much.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Try Low Min-Bet Games</h4>
                <p className="text-gray-400">
                  Start with games that have lower minimum bet limits. This allows you to play longer 
                  and gain experience without depleting your balance quickly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Adjust Based on Confidence</h4>
                <p className="text-gray-400">
                  Increase your bets gradually as you gain confidence and experience wins. 
                  Reduce bet sizes after losses to preserve your bankroll.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Monitor Your Winnings</h4>
                <p className="text-gray-400">
                  Keep track of your wins and losses. Adjust your betting strategy based on your 
                  performance and current balance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Betting Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Conservative Strategy</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Bet 1-5% of your total balance per game</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Focus on games with higher win rates</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <span>Set daily loss limits</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Aggressive Strategy</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <span>Bet 5-15% of your balance for higher rewards</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <span>Target high-multiplier games</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <span>Have larger bankroll reserves</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Warning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-8 border border-red-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <h3 className="text-2xl font-bold text-white">Important Reminders</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Never Bet More Than You Can Afford</h4>
              <p className="text-gray-300 text-sm">
                Only use money you can afford to lose. Gaming should be entertainment, not a way to make money.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Set Time and Money Limits</h4>
              <p className="text-gray-300 text-sm">
                Decide beforehand how much time and money you'll spend. Stick to these limits.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Take Regular Breaks</h4>
              <p className="text-gray-300 text-sm">
                Step away from gaming regularly. This helps maintain perspective and prevents impulsive decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Don't Chase Losses</h4>
              <p className="text-gray-300 text-sm">
                If you're losing, don't increase bets to try to win back losses. This often leads to bigger losses.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}