import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ArrowLeft, Menu, Settings, Trophy, Star, Clock } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export function ProfilePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userStats = [
    { label: 'Games Played', value: '247', icon: Trophy },
    { label: 'Total Winnings', value: '₹12,450', icon: Star },
    { label: 'Play Time', value: '48h 32m', icon: Clock },
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
        currentPath="/profile"
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
                Cosmic - Profile
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Profile Header */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2">Cosmic Player</h2>
                  <p className="text-gray-400 mb-4">Member since January 2024</p>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <Settings size={16} />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <stat.icon size={24} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { game: 'Cosmic Dice', result: 'Won ₹250', time: '2 hours ago' },
                  { game: 'Cosmic RPS', result: 'Won ₹180', time: '5 hours ago' },
                  { game: 'Cosmic Limbo', result: 'Lost ₹100', time: '1 day ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-medium">{activity.game}</p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                    <p className={`font-bold ${activity.result.includes('Won') ? 'text-green-400' : 'text-red-400'}`}>
                      {activity.result}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}