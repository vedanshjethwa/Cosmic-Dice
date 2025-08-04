import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  ArrowLeft, 
  Menu, 
  Settings, 
  Trophy, 
  Star, 
  Clock, 
  Gamepad2,
  TrendingUp,
  Award,
  Calendar,
  Wallet,
  Target,
  Zap,
  Edit3,
  Camera
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export function ProfilePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userProfile = {
    username: 'CosmicPlayer777',
    email: 'player@cosmic777.com',
    level: 15,
    experience: 2450,
    nextLevelExp: 3000,
    totalCoins: 12450,
    joinDate: 'January 2024',
    avatar: null,
    rank: 'Gold',
    country: 'India',
    preferredCurrency: 'INR',
    achievements: [
      { name: 'First Win', icon: '🏆', unlocked: true, description: 'Won your first game' },
      { name: 'High Roller', icon: '💎', unlocked: true, description: 'Bet over ₹10,000 in a session' },
      { name: 'Lucky Streak', icon: '🍀', unlocked: false, description: 'Win 10 games in a row' },
      { name: 'Master Player', icon: '👑', unlocked: false, description: 'Reach level 25' },
    ]
  };

  const userStats = [
    { label: 'Games Played', value: '247', icon: Gamepad2, color: 'text-blue-400' },
    { label: 'Total Winnings', value: '₹12,450', icon: Trophy, color: 'text-green-400' },
    { label: 'Win Rate', value: '68%', icon: Target, color: 'text-purple-400' },
    { label: 'Play Time', value: '48h 32m', icon: Clock, color: 'text-yellow-400' },
    { label: 'Best Streak', value: '12 wins', icon: Zap, color: 'text-orange-400' },
    { label: 'Favorite Game', value: 'Cosmic Dice', icon: Star, color: 'text-pink-400' },
  ];

  const recentActivity = [
    { game: 'Cosmic Dice', result: 'Won ₹250', time: '2 hours ago', type: 'win' },
    { game: 'Cosmic RPS', result: 'Won ₹180', time: '5 hours ago', type: 'win' },
    { game: 'Cosmic Limbo', result: 'Lost ₹100', time: '1 day ago', type: 'loss' },
    { game: 'Cosmic Balloon', result: 'Won ₹320', time: '2 days ago', type: 'win' },
    { game: 'Cosmic Cards', result: 'Lost ₹75', time: '3 days ago', type: 'loss' },
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
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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
                Cosmic - My Profile
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
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl border border-blue-500/20 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="relative flex flex-col lg:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <User size={60} className="text-white" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                    <Camera size={16} />
                  </button>
                  <div className="absolute -bottom-2 -left-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    LVL {userProfile.level}
                  </div>
                </div>
                <div className="text-center lg:text-left flex-1">
                  <div className="flex items-center gap-3 mb-2 justify-center lg:justify-start">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {userProfile.username}
                    </h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit3 size={16} className="text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 justify-center lg:justify-start flex-wrap">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                      {userProfile.rank} Member
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Calendar size={16} />
                      Member since {userProfile.joinDate}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {userProfile.email}
                    </span>
                  </div>
                  
                  {/* Experience Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Experience</span>
                      <span>{userProfile.experience}/{userProfile.nextLevelExp} XP</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(userProfile.experience / userProfile.nextLevelExp) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {userProfile.nextLevelExp - userProfile.experience} XP to next level
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-center lg:justify-start">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">₹{userProfile.totalCoins.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Total Earnings</div>
                    </div>
                    <button 
                      onClick={() => navigate('/settings')}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                    >
                      <Settings size={16} />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#132F4C] rounded-2xl border border-blue-500/20 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="text-yellow-400" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userProfile.achievements.map((achievement, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-4 rounded-xl border text-center transition-all hover:scale-105 ${
                      achievement.unlocked 
                        ? 'bg-yellow-500/10 border-yellow-500/30 cursor-pointer' 
                        : 'bg-gray-500/10 border-gray-500/30 opacity-50'
                    }`}
                    title={achievement.description}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className={`font-medium text-sm ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {achievement.name}
                    </div>
                    {achievement.unlocked && (
                      <div className="text-xs text-green-400 mt-1">Unlocked!</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-[#132F4C] rounded-2xl border border-blue-500/20 p-6 hover:bg-[#1A243D] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <stat.icon size={24} className={stat.color} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#132F4C] rounded-2xl border border-blue-500/20 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="text-blue-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-[#0A1929] rounded-xl hover:bg-[#1A243D] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Gamepad2 size={16} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{activity.game}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${activity.type === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                      {activity.result}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <button 
                onClick={() => navigate('/wallet')}
                className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-6 hover:from-green-600/30 hover:to-green-800/30 transition-all group text-left"
              >
                <Wallet className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-white mb-2">Manage Wallet</h4>
                <p className="text-gray-400 text-sm">Deposit, withdraw, and view transactions</p>
              </button>

              <button 
                onClick={() => navigate('/all-games')}
                className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 hover:from-blue-600/30 hover:to-blue-800/30 transition-all group text-left"
              >
                <Gamepad2 className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-white mb-2">Play Games</h4>
                <p className="text-gray-400 text-sm">Explore our cosmic game collection</p>
              </button>

              <button 
                onClick={() => navigate('/settings')}
                className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 hover:from-purple-600/30 hover:to-purple-800/30 transition-all group text-left"
              >
                <Settings className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-white mb-2">Account Settings</h4>
                <p className="text-gray-400 text-sm">Customize your gaming experience</p>
              </button>
            </motion.div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}