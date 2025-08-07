import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Gamepad2, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Ban,
  CheckCircle,
  X
} from 'lucide-react';

interface DashboardStats {
  users: {
    total: number;
    active: number;
    banned: number;
  };
  financials: {
    totalDeposits: number;
    totalWithdrawals: number;
    totalWagered: number;
    totalWon: number;
    houseProfit: number;
    netRevenue: number;
  };
  games: {
    totalSessions: number;
    averageBet: number;
    houseEdge: number;
  };
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // This would call your admin API endpoint
      // const response = await api.getAdminDashboard();
      // setStats(response);
      
      // Mock data for demo
      setStats({
        users: { total: 1250, active: 1180, banned: 15 },
        financials: {
          totalDeposits: 2500000,
          totalWithdrawals: 1800000,
          totalWagered: 5200000,
          totalWon: 4950000,
          houseProfit: 250000,
          netRevenue: 700000
        },
        games: {
          totalSessions: 15420,
          averageBet: 337.5,
          houseEdge: 4.8
        }
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center p-8">
        <p className="text-red-400">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-400">Cosmic777 Management Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Users</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Total</span>
              <span className="text-white font-bold">{stats.users.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Active</span>
              <span className="text-green-400 font-bold">{stats.users.active.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Banned</span>
              <span className="text-red-400 font-bold">{stats.users.banned}</span>
            </div>
          </div>
        </motion.div>

        {/* Financial Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <h3 className="text-lg font-bold text-white">Revenue</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Net Revenue</span>
              <span className="text-green-400 font-bold">₹{stats.financials.netRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">House Profit</span>
              <span className="text-blue-400 font-bold">₹{stats.financials.houseProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Deposits</span>
              <span className="text-white font-bold">₹{stats.financials.totalDeposits.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Games</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Sessions</span>
              <span className="text-white font-bold">{stats.games.totalSessions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Average Bet</span>
              <span className="text-blue-400 font-bold">₹{stats.games.averageBet.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">House Edge</span>
              <span className="text-purple-400 font-bold">{stats.games.houseEdge.toFixed(2)}%</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm">
              View Users
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors text-sm">
              Withdrawals
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors text-sm">
              Game Control
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
      >
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {/* Mock recent activity */}
          {[
            { type: 'deposit', user: 'User***', amount: 5000, time: '2 minutes ago' },
            { type: 'withdrawal', user: 'Player***', amount: 2500, time: '5 minutes ago' },
            { type: 'big_win', user: 'Gamer***', amount: 15000, time: '8 minutes ago' },
            { type: 'new_user', user: 'Cosmic***', amount: 0, time: '12 minutes ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-[#0A1929] rounded-lg">
              <div className="flex items-center gap-3">
                {activity.type === 'deposit' && <ArrowUpCircle className="w-5 h-5 text-green-400" />}
                {activity.type === 'withdrawal' && <ArrowDownCircle className="w-5 h-5 text-red-400" />}
                {activity.type === 'big_win' && <TrendingUp className="w-5 h-5 text-yellow-400" />}
                {activity.type === 'new_user' && <Users className="w-5 h-5 text-blue-400" />}
                <div>
                  <div className="text-white font-medium">
                    {activity.type === 'deposit' && 'Deposit'}
                    {activity.type === 'withdrawal' && 'Withdrawal'}
                    {activity.type === 'big_win' && 'Big Win'}
                    {activity.type === 'new_user' && 'New User'}
                  </div>
                  <div className="text-gray-400 text-sm">{activity.user} • {activity.time}</div>
                </div>
              </div>
              {activity.amount > 0 && (
                <div className="text-white font-bold">
                  ₹{activity.amount.toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}