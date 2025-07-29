import React, { useState } from 'react';
import { Gift, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export function BonusSection() {
  const [bonusCode, setBonusCode] = useState('');

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gift className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Active Bonuses</h1>
        </div>
        <p className="text-gray-400">
          Discover exclusive rewards and bonuses waiting for you
        </p>
      </motion.div>

      {/* Activate Bonus Code Section */}
      <div className="bg-[#1A243D] rounded-xl p-4 lg:p-6 border border-blue-500/20">
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4">
          Activate Bonus Code
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter bonus code"
            value={bonusCode}
            onChange={(e) => setBonusCode(e.target.value)}
            className="flex-1 bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-sm lg:text-base"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors text-sm lg:text-base">
            Activate
          </button>
        </div>
      </div>

      {/* Rakeback & Earnings Section */}
      <div className="bg-[#1A243D] rounded-xl p-4 lg:p-6 border border-blue-500/20">
        <h2 className="text-lg lg:text-xl font-bold text-white mb-6">
          Rakeback & Earnings
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="text-gray-400 mb-2">Total rakeback earned</div>
            <div className="text-2xl lg:text-3xl font-bold text-white mb-4">₹0.00</div>
            <button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 lg:px-6 py-2 rounded-lg transition-colors border border-blue-500/20 text-sm lg:text-base">
              Get Rakeback
            </button>
          </div>
          <div>
            <div className="text-gray-400 mb-2">Money from referrals</div>
            <div className="text-2xl lg:text-3xl font-bold text-white mb-2">₹0.00</div>
            <div className="text-gray-400 text-sm">
              Share your code to start earning!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
