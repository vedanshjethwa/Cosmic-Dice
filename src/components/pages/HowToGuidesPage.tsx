import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, Wallet, ArrowUpCircle, ArrowDownCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';

export function HowToGuidesPage() {
  const navigate = useNavigate();

  const guides = [
    {
      icon: <Play className="w-8 h-8 text-blue-400" />,
      title: 'How to Start Playing',
      description: 'Complete beginner guide to get started',
      steps: [
        'Create your account with email verification',
        'Add funds to your wallet using UPI or Net Banking',
        'Choose a game from our collection',
        'Place your first bet and start playing',
        'Withdraw your winnings anytime'
      ]
    },
    {
      icon: <ArrowUpCircle className="w-8 h-8 text-green-400" />,
      title: 'How to Recharge',
      description: 'Step-by-step deposit process',
      steps: [
        'Click on "Deposit" in the sidebar or wallet section',
        'Choose your preferred payment method (UPI recommended)',
        'Enter the amount you want to deposit (min ₹100)',
        'Complete the payment through your chosen method',
        'Funds will be added to your wallet instantly'
      ]
    },
    {
      icon: <ArrowDownCircle className="w-8 h-8 text-red-400" />,
      title: 'How to Withdraw',
      description: 'Secure withdrawal process',
      steps: [
        'Go to "Withdrawal" section from the sidebar',
        'Enter your bank account or UPI details',
        'Specify the withdrawal amount (min ₹1000)',
        'Verify your identity if required',
        'Receive funds within 24 hours'
      ]
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
              Cosmic - How-to Guides
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
            <BookOpen className="w-12 h-12 text-blue-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Complete Gaming Guides
            </h2>
          </div>
          <p className="text-xl text-gray-300">
            Everything you need to know to get started and master your gaming experience
          </p>
        </motion.div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                {guide.icon}
                <h3 className="text-xl font-bold text-white">{guide.title}</h3>
              </div>
              <p className="text-gray-400 mb-6">{guide.description}</p>
              <div className="space-y-4">
                {guide.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {stepIndex + 1}
                    </div>
                    <p className="text-gray-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Quick Tips for Success</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Understand the Games</h4>
                  <p className="text-gray-400 text-sm">
                    Read the rules and practice with small bets before playing seriously.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Manage Your Bankroll</h4>
                  <p className="text-gray-400 text-sm">
                    Never bet more than 5-10% of your total balance on a single game.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Set Win/Loss Limits</h4>
                  <p className="text-gray-400 text-sm">
                    Decide beforehand when to stop playing, whether winning or losing.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Take Regular Breaks</h4>
                  <p className="text-gray-400 text-sm">
                    Step away from gaming every 30-60 minutes to maintain focus.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Don't Chase Losses</h4>
                  <p className="text-gray-400 text-sm">
                    Accept losses as part of gaming and don't try to win back immediately.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Use Bonuses Wisely</h4>
                  <p className="text-gray-400 text-sm">
                    Take advantage of promotions and bonuses to extend your gameplay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game-Specific Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Game-Specific Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <h4 className="font-bold text-blue-400 mb-2">Dice & RPS</h4>
              <p className="text-gray-300 text-sm">
                Start with ₹10-50 bets. These games have good win rates for beginners.
              </p>
            </div>
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <h4 className="font-bold text-green-400 mb-2">Balloon & Cards</h4>
              <p className="text-gray-300 text-sm">
                Low-risk games perfect for steady, smaller wins. Bet ₹20-100.
              </p>
            </div>
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <h4 className="font-bold text-purple-400 mb-2">Limbo & Mines</h4>
              <p className="text-gray-300 text-sm">
                Higher risk, higher reward. Start with ₹5-25 until you understand the mechanics.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}