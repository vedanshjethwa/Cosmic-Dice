import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, TrendingUp, Users, Star, ArrowLeft } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  
  const stats = [
    { label: 'Active Players', value: '12,543', icon: <Users className="w-6 h-6" /> },
    { label: 'Games Played Today', value: '8,921', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Total Winnings', value: '$2.1M', icon: <Star className="w-6 h-6" /> },
    { label: 'Online Now', value: '1,234', icon: <Home className="w-6 h-6" /> },
  ];

  const recentActivity = [
    { user: 'Player123', action: 'won $500 in Cosmic RPS', time: '2 minutes ago' },
    { user: 'GamerPro', action: 'completed daily challenge', time: '5 minutes ago' },
    { user: 'LuckyWinner', action: 'hit jackpot of $1,200', time: '8 minutes ago' },
    { user: 'NewPlayer', action: 'joined the platform', time: '12 minutes ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome to Cosmic Gaming
          </h1>
          <p className="text-gray-400 text-lg">
            Your ultimate destination for online gaming and entertainment
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-blue-400">{stat.icon}</div>
              <h3 className="text-gray-400 text-sm">{stat.label}</h3>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
      >
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-blue-900/20 rounded-lg"
            >
              <div>
                <span className="font-medium text-blue-400">{activity.user}</span>
                <span className="text-gray-300 ml-2">{activity.action}</span>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 transition-colors"
        >
          <h3 className="text-xl font-bold mb-2">Play Now</h3>
          <p className="text-blue-100">Jump into your favorite games</p>
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-6 transition-colors">
          <h3 className="text-xl font-bold mb-2">Claim Bonus</h3>
          <p className="text-green-100">Get your daily rewards</p>
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-6 transition-colors">
          <h3 className="text-xl font-bold mb-2">Invite Friends</h3>
          <p className="text-purple-100">Earn referral bonuses</p>
        </button>
      </motion.div>
    </div>
  );
}