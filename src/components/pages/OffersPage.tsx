import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Search, Filter, Clock, Star, ChevronDown, ChevronUp } from 'lucide-react';

export function OffersPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [showClaimedOffers, setShowClaimedOffers] = useState(false);

  const activeOffers = [
    {
      id: 1,
      title: '100% First Deposit Bonus',
      description: 'Double your first deposit up to ₹5000! Limited time offer for new players.',
      type: 'Deposit Bonus',
      timeLeft: '2h 40m',
      isVip: true,
      isLocked: false,
    },
    {
      id: 2,
      title: 'Triple Rewards Bundle',
      description: 'Get 3 rewards in 1: Deposit Bonus + Cashback + Free Spin. Ultimate gaming package.',
      type: 'Bundle Deal',
      timeLeft: '5h',
      isHot: true,
      isLocked: false,
    },
    {
      id: 3,
      title: '10% Cashback Bonus',
      description: 'Win 3 games to unlock your cashback reward! Perfect for regular players.',
      type: 'Cashback',
      timeLeft: '12h',
      isLocked: true,
    },
    {
      id: 4,
      title: 'VIP Weekend Special',
      description: 'Exclusive 200% bonus for VIP members only. Premium gaming experience awaits.',
      type: 'VIP Bonus',
      timeLeft: '1d 5h',
      isVip: true,
      isLocked: false,
    },
    {
      id: 5,
      title: 'Lucky Friday Bonus',
      description: 'Get lucky with our Friday special offers. Weekly excitement guaranteed.',
      type: 'Weekly Bonus',
      timeLeft: '3d',
      isHot: true,
      isLocked: false,
    },
    {
      id: 6,
      title: 'Referral Mega Bonus',
      description: 'Invite friends and earn massive rewards. Share the cosmic experience.',
      type: 'Referral',
      timeLeft: '7d',
      isLocked: false,
    },
  ];

  const expiredOffers = [
    {
      id: 7,
      title: 'Weekend Warrior Bonus',
      description: '150% bonus for weekend gaming sessions',
      type: 'Weekend Bonus',
      expiredDate: '2 days ago',
    },
    {
      id: 8,
      title: 'New Player Welcome',
      description: '50% bonus on first three deposits',
      type: 'Welcome Bonus',
      expiredDate: '1 week ago',
    },
  ];

  const claimedOffers = [
    {
      id: 9,
      title: 'Daily Login Bonus',
      description: '₹100 bonus for 7-day login streak',
      type: 'Daily Bonus',
      status: 'Claimed',
      claimedDate: '3 days ago',
    },
    {
      id: 10,
      title: 'First Win Celebration',
      description: '₹500 bonus for your first game win',
      type: 'Achievement',
      status: 'Used',
      claimedDate: '1 week ago',
    },
  ];

  const filteredOffers = (activeTab === 'active' ? activeOffers : expiredOffers).filter(offer =>
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

      {/* Top Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Tab Filters */}
          <div className="flex gap-2 bg-[#0A1929] rounded-lg p-1">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                activeTab === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Active Offers
            </button>
            <button
              onClick={() => setActiveTab('expired')}
              className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                activeTab === 'expired'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Expired Offers
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-64 bg-[#0A1929] text-white rounded-lg pl-10 pr-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </motion.div>

      {/* Offer Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-8"
      >
        {filteredOffers.map((offer) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {offer.isVip && (
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium">
                      VIP
                    </span>
                  )}
                  {offer.isHot && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                      HOT
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock size={16} />
                    <span className="text-sm">
                      {activeTab === 'active' ? offer.timeLeft : `Expired ${offer.expiredDate}`}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">{offer.title}</h3>
                <p className="text-gray-400 mb-3 text-lg">{offer.description}</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    ➤ [{offer.type}]
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 lg:w-auto w-full">
                {activeTab === 'active' && (
                  <button
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      offer.isLocked
                        ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={offer.isLocked}
                  >
                    {offer.isLocked ? 'Locked' : 'Claim Now'}
                  </button>
                )}
                {activeTab === 'expired' && (
                  <span className="px-8 py-3 bg-gray-600/20 text-gray-400 rounded-lg text-center">
                    Expired
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">No offers found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </motion.div>

      {/* My Claimed Offers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
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
              <div className="space-y-3 mt-4">
                {claimedOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-[#0A1929] rounded-lg p-4 border border-blue-500/10"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1 text-white">{offer.title}</h4>
                        <p className="text-sm text-gray-400 mb-2">{offer.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                            {offer.type}
                          </span>
                          <span className="text-sm text-gray-400">
                            {offer.status} • {offer.claimedDate}
                          </span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-sm ${
                        offer.status === 'Claimed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {offer.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}