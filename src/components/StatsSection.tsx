import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Trophy, BarChart3, Target } from 'lucide-react';

export function StatsSection() {
  // Mock data for demonstration
  const stats = {
    totalPlayers: 15420,
    totalWinnings: 2450000,
    gamesPlayed: 89650,
    averageWin: 1580,
    topGame: 'Cosmic Dice',
    winRate: 68.5
  };

  const recentWins = [
    { player: 'Player***', game: 'Cosmic Dice', amount: 2500, time: '2 min ago' },
    { player: 'User***', game: 'Cosmic RPS', amount: 1800, time: '5 min ago' },
    { player: 'Gamer***', game: 'Cosmic Balloon', amount: 3200, time: '8 min ago' },
    { player: 'Winner***', game: 'Cosmic Limbo', amount: 4500, time: '12 min ago' },
    { player: 'Lucky***', game: 'Cosmic Cards', amount: 1200, time: '15 min ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Platform Statistics</h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalPlayers.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Total Players</div>
          </div>
          
          <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10 text-center">
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">
              ₹{(stats.totalWinnings / 100000).toFixed(1)}L
            </div>
            <div className="text-gray-400 text-sm">Total Winnings</div>
          </div>
          
          <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">
              {stats.gamesPlayed.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Games Played</div>
          </div>
          
          <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10 text-center">
            <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">
              ₹{stats.averageWin.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Average Win</div>
          </div>
          
          <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10 text-center">
            <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">
              {stats.winRate}%
            </div>
            <div className="text-gray-400 text-sm">Win Rate</div>
          </div>
          
          <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10 text-center">
            <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">
              {stats.topGame}
            </div>
            <div className="text-gray-400 text-sm">Most Popular</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Big Wins */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Recent Big Wins</h2>
        </div>
        
        <div className="space-y-4">
          {recentWins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between p-4 bg-[#0A1929] rounded-xl border border-green-500/20 hover:bg-green-500/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-white">{win.player}</div>
                  <div className="text-sm text-gray-400">{win.game} • {win.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-400">
                  +₹{win.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Big Win!</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Live Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20"
      >
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">Live Gaming Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {Math.floor(Math.random() * 500) + 1200}
              </div>
              <div className="text-gray-400 text-sm">Players Online</div>
            </div>
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <div className="text-2xl font-bold text-green-400 mb-1">
                ₹{(Math.floor(Math.random() * 50000) + 100000).toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Hourly Winnings</div>
            </div>
            <div className="bg-[#0A1929] rounded-xl p-4 border border-blue-500/10">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {Math.floor(Math.random() * 100) + 250}
              </div>
              <div className="text-gray-400 text-sm">Games This Hour</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}