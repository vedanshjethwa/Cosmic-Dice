import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export default function SnakesGame() {
  const { user, wallet } = useAuth();

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 shadow-2xl text-center"
        >
          <div className="text-6xl mb-6">🐍</div>
          <h2 className="text-3xl font-bold text-white mb-4">Cosmic Snakes</h2>
          <p className="text-gray-300 text-lg mb-8">
            Navigate through the cosmic maze and avoid the snakes to win big rewards!
          </p>
          
          <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/20 mb-8">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Game Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-semibold text-white mb-2">🎲 Dice Movement</h4>
                <p className="text-gray-400 text-sm">Roll dice to move 1-3 steps forward</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">🐍 Snake Positions</h4>
                <p className="text-gray-400 text-sm">Fixed snake placement for strategic gameplay</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">💎 Progressive Multipliers</h4>
                <p className="text-gray-400 text-sm">Higher rewards for passing more snakes</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">💰 Cash Out Anytime</h4>
                <p className="text-gray-400 text-sm">Secure your winnings before hitting a snake</p>
              </div>
            </div>
          </div>

          <div className="text-yellow-400 font-semibold mb-4">
            Current Balance: ₹{((wallet?.real_balance || 0) + (wallet?.bonus_balance || 0)).toLocaleString()}
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30">
            Start Adventure
          </button>
        </motion.div>
      </div>
    </div>
  );
}