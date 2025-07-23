import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Bell,
  Upload,
  Trophy,
  Copy,
  ArrowUpCircle,
  ArrowDownCircle,
  Edit2,
  LogOut,
  Moon,
  Sun,
  X,
  ArrowLeft,
} from 'lucide-react';

interface ProfilePageProps {
  onExit?: () => void;
}

export function ProfilePage({ onExit }: ProfilePageProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const user = {
    name: 'John Doe',
    id: 'JD123456',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120',
    balance: 1234.56,
    stats: {
      totalGames: 6,
      biggestWin: 500,
      successRate: 65,
    },
    referral: {
      code: 'JOHNDOE123',
      rewards: 250,
      referrals: 5,
    },
    badges: [
      { name: 'First Win', description: 'Won your first game', unlocked: true, icon: '🏆' },
      { name: 'High Roller', description: 'Bet over $1000', unlocked: true, icon: '💰' },
      { name: 'Lucky Streak', description: 'Win 5 games in a row', unlocked: false, icon: '🎲' },
      { name: 'Social Butterfly', description: 'Refer 10 friends', unlocked: false, icon: '🦋' },
    ],
    transactions: [
      { type: 'deposit', amount: 100, date: '2024-03-10', status: 'completed' },
      { type: 'bet', amount: -50, date: '2024-03-09', status: 'completed' },
      { type: 'withdrawal', amount: -200, date: '2024-03-08', status: 'pending' },
    ],
  };

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(user.referral.code);
      // Show success toast
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Header with Exit Button */}
      <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleExit}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <h1 className="text-2xl font-bold">Profile</h1>
            </div>
            <button
              onClick={handleExit}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#132F4C] rounded-2xl p-6 mb-8 border border-blue-500/20"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative group">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/30"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload size={14} />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Edit2 size={16} />
                  </button>
                </div>
                <p className="text-gray-400">ID: {user.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Settings size={20} />
              </button>
              <button className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2">
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Wallet Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
            >
              <h3 className="text-xl font-bold mb-4">Wallet Balance</h3>
              <div className="text-3xl font-bold text-blue-400 mb-6">
                ${user.balance.toLocaleString()}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition-colors">
                  <ArrowUpCircle size={20} />
                  <span>Deposit</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg py-3 transition-colors">
                  <ArrowDownCircle size={20} />
                  <span>Withdraw</span>
                </button>
              </div>
            </motion.div>

            {/* Game Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
            >
              <h3 className="text-xl font-bold mb-4">Game Statistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-900/30 rounded-xl p-4">
                  <div className="text-gray-400 mb-1">Total Games</div>
                  <div className="text-2xl font-bold">{user.stats.totalGames}</div>
                </div>
                <div className="bg-blue-900/30 rounded-xl p-4">
                  <div className="text-gray-400 mb-1">Biggest Win</div>
                  <div className="text-2xl font-bold text-green-400">
                    ${user.stats.biggestWin}
                  </div>
                </div>
                <div className="bg-blue-900/30 rounded-xl p-4">
                  <div className="text-gray-400 mb-1">Success Rate</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {user.stats.successRate}%
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
            >
              <h3 className="text-xl font-bold mb-4">Transaction History</h3>
              <div className="space-y-4">
                {user.transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-blue-900/20 rounded-xl"
                  >
                    <div>
                      <div className="font-medium capitalize">{tx.type}</div>
                      <div className="text-sm text-gray-400">{tx.date}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={
                          tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }
                      >
                        {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount)}
                      </div>
                      <div
                        className={`text-sm ${
                          tx.status === 'completed'
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-8">
            {/* Referral */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
            >
              <h3 className="text-xl font-bold mb-4">Refer & Earn</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 mb-1">Total Rewards</div>
                  <div className="text-2xl font-bold text-green-400">
                    ${user.referral.rewards}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Referrals</div>
                  <div className="text-2xl font-bold">{user.referral.referrals}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-2">Your Referral Code</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={user.referral.code}
                      readOnly
                      className="bg-blue-900/30 rounded-lg px-4 py-2 flex-1 text-sm"
                    />
                    <button
                      onClick={copyReferralCode}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 transition-colors"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-yellow-400" size={24} />
                <h3 className="text-xl font-bold">Badges</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl text-center ${
                      badge.unlocked
                        ? 'bg-blue-900/30'
                        : 'bg-gray-900/30 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <div className="font-medium mb-1">{badge.name}</div>
                    <div className="text-sm text-gray-400">
                      {badge.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}