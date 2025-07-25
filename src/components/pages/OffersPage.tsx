import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Search, Filter, Clock, Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export function OffersPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [showClaimedOffers, setShowClaimedOffers] = useState(false);

  const offers = [
    {
      title: 'Get 10% free on your first recharge',
      image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/crown.png',
      tag: 'COSMIC',
    },
    {
      title: 'Earn 2x points this weekend',
      image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/crown.png',
      tag: 'SPECIAL',
    },
    {
      title: 'Exclusive 50% off on all games',
      image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/discount.png',
      tag: 'LIMITED',
    },
    {
      title: 'Win a free game every week',
      image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/gift.png',
      tag: 'GIVEAWAY',
    },
  ];

  const activeOffers = [
    {
      id: 1,
      title: '100% First Deposit Bonus',
      description: 'Double your first deposit up to ₹5000! Limited time offer.',
      type: 'Deposit Bonus',
      timeLeft: '2h 40m',
      isVip: true,
    },
    {
      id: 2,
      title: 'Triple Rewards Bundle',
      description: 'Get 3 rewards in 1: Deposit Bonus + Cashback + Free Spin',
      type: 'Bundle Deal',
      timeLeft: '5h',
      isHot: true,
    },
    {
      id: 3,
      title: '10% Cashback Bonus',
      description: 'Win 3 games to unlock your cashback reward!',
      type: 'Cashback',
      timeLeft: '12h',
      isLocked: true,
    },
  ];

  const claimedOffers = [
    {
      id: 4,
      title: 'Weekend Bonus',
      description: '50% bonus up to ₹1000',
      type: 'Deposit Bonus',
      status: 'Used',
    },
    {
      id: 5,
      title: 'Daily Cashback',
      description: '10% cashback on losses',
      type: 'Cashback',
      status: 'Claimed',
    },
  ];

  const filteredOffers = activeOffers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Offers & Promotions
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Discover exclusive rewards and bonuses waiting for you
        </p>
      </motion.div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-2 bg-[#132F4C] rounded-lg p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'active'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Active Offers
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'expired'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Expired Offers
          </button>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 bg-[#132F4C] text-white rounded-lg pl-10 pr-4 py-2 border border-blue-500/20 focus:outline-none focus:border-blue-400"
            />
          </div>
          <button className="bg-[#132F4C] p-2 rounded-lg border border-blue-500/20 hover:bg-blue-600/20 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Active Offers */}
      {activeTab === 'active' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredOffers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {offer.isVip && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium">
                      VIP
                    </span>
                  )}
                  {offer.isHot && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-medium">
                      HOT
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={16} />
                  <span className="text-sm">{offer.timeLeft}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-white">{offer.title}</h3>
              <p className="text-gray-400 mb-4">{offer.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  {offer.type}
                </span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  offer.isLocked
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={offer.isLocked}
              >
                {offer.isLocked ? 'Locked' : 'Claim Now'}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Claimed Offers */}
      <div className="mt-8">
        <button
          onClick={() => setShowClaimedOffers(!showClaimedOffers)}
          className="flex items-center justify-between w-full bg-[#132F4C] p-4 rounded-lg text-left border border-blue-500/20 hover:bg-[#1A243D] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" size={20} />
            <span className="font-semibold text-white">My Claimed Offers</span>
          </div>
          {showClaimedOffers ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <AnimatePresence>
          {showClaimedOffers && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {claimedOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-[#0A1929] rounded-lg p-4 border border-blue-500/10"
                  >
                    <h4 className="font-medium mb-1 text-white">{offer.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{offer.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                        {offer.type}
                      </span>
                      <span className="text-sm text-gray-400">{offer.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}