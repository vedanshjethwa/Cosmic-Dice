import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Clock, Star, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function ActiveBonusesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeBonuses = [
    {
      id: 1,
      title: '100% First Deposit Bonus',
      description: 'Double your first deposit up to ₹5000! Limited time offer for new players.',
      type: 'Deposit Bonus',
      timeLeft: '2h 40m',
      value: '₹5,000',
      requirements: 'Minimum deposit ₹500',
      isVip: true,
      image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 2,
      title: 'Triple Rewards Bundle',
      description: 'Get 3 rewards in 1: Deposit Bonus + Cashback + Free Spin. Ultimate gaming package.',
      type: 'Bundle Deal',
      timeLeft: '5h',
      value: '₹3,000',
      requirements: 'Play 5 different games',
      isHot: true,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 3,
      title: '10% Cashback Bonus',
      description: 'Win 3 games to unlock your cashback reward! Perfect for regular players.',
      type: 'Cashback',
      timeLeft: '12h',
      value: '10%',
      requirements: 'Win 3 games in a row',
      isLocked: true,
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 4,
      title: 'VIP Weekend Special',
      description: 'Exclusive 200% bonus for VIP members only. Premium gaming experience awaits.',
      type: 'VIP Bonus',
      timeLeft: '1d 5h',
      value: '₹10,000',
      requirements: 'VIP membership required',
      isVip: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 5,
      title: 'Daily Login Streak',
      description: 'Login daily for 7 days and earn increasing rewards each day.',
      type: 'Daily Bonus',
      timeLeft: '24h',
      value: '₹700',
      requirements: 'Login 7 consecutive days',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 6,
      title: 'High Roller Exclusive',
      description: 'Special bonus for players who bet big. Exclusive high-stakes rewards.',
      type: 'High Roller',
      timeLeft: '2d 12h',
      value: '₹25,000',
      requirements: 'Bet minimum ₹10,000 total',
      isVip: true,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=200',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/active-bonuses"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
              >
                <Menu size={24} />
              </button>
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
                Cosmic - Active Bonuses
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-12 h-12 text-blue-400" />
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Active Bonuses & Rewards
              </h2>
            </div>
            <p className="text-lg lg:text-xl text-gray-300">
              Claim exclusive bonuses and boost your gaming experience
            </p>
          </motion.div>

          {/* Bonuses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBonuses.map((bonus, index) => (
              <motion.div
                key={bonus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#132F4C] rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group"
              >
                {/* Bonus Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={bonus.image}
                    alt={bonus.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {bonus.isVip && (
                      <span className="px-3 py-1 bg-purple-500/90 text-white rounded-lg text-sm font-medium backdrop-blur-sm">
                        VIP
                      </span>
                    )}
                    {bonus.isHot && (
                      <span className="px-3 py-1 bg-red-500/90 text-white rounded-lg text-sm font-medium backdrop-blur-sm">
                        HOT
                      </span>
                    )}
                  </div>

                  {/* Time Left */}
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 text-white bg-black/50 px-2 py-1 rounded-lg text-sm backdrop-blur-sm">
                      <Clock size={14} />
                      <span>{bonus.timeLeft}</span>
                    </div>
                  </div>

                  {/* Value Badge */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-lg text-sm font-bold">
                      {bonus.value}
                    </div>
                  </div>
                </div>

                {/* Bonus Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                      {bonus.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {bonus.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {bonus.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">Requirements</span>
                    </div>
                    <p className="text-gray-300 text-sm">{bonus.requirements}</p>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      bonus.isLocked
                        ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105'
                    }`}
                    disabled={bonus.isLocked}
                  >
                    {bonus.isLocked ? 'Requirements Not Met' : 'Claim Bonus'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bonus Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-4">Have a Bonus Code?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter bonus code"
                className="flex-1 bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Activate Code
              </button>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}