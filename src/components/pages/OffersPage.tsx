import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Search, Filter, Clock, Star, ChevronDown, ChevronUp, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function OffersPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [showClaimedOffers, setShowClaimedOffers] = useState(false);

  const allOffers = [
    {
      id: 1,
      title: '100% First Deposit Bonus',
      description: 'Double your first deposit up to ₹5000! Limited time offer for new players.',
      type: 'Deposit Bonus',
      timeLeft: '2h 40m',
      isVip: true,
      isLocked: false,
      image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 2,
      title: 'Triple Rewards Bundle',
      description: 'Get 3 rewards in 1: Deposit Bonus + Cashback + Free Spin. Ultimate gaming package.',
      type: 'Bundle Deal',
      timeLeft: '5h',
      isHot: true,
      isLocked: false,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 3,
      title: '10% Cashback Bonus',
      description: 'Win 3 games to unlock your cashback reward! Perfect for regular players.',
      type: 'Cashback',
      timeLeft: '12h',
      isLocked: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 4,
      title: 'VIP Weekend Special',
      description: 'Exclusive 200% bonus for VIP members only. Premium gaming experience awaits.',
      type: 'VIP Bonus',
      timeLeft: '1d 5h',
      isVip: true,
      isLocked: false,
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 5,
      title: 'Lucky Friday Bonus',
      description: 'Get lucky with our Friday special offers. Weekly excitement guaranteed.',
      type: 'Weekly Bonus',
      timeLeft: '3d',
      isHot: true,
      isLocked: false,
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 6,
      title: 'Referral Mega Bonus',
      description: 'Invite friends and earn massive rewards. Share the cosmic experience.',
      type: 'Referral',
      timeLeft: '7d',
      isLocked: false,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 7,
      title: 'Daily Login Streak',
      description: 'Login daily for 7 days and earn increasing rewards each day.',
      type: 'Daily Bonus',
      timeLeft: '24h',
      isLocked: false,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 8,
      title: 'High Roller Exclusive',
      description: 'Special bonus for players who bet big. Exclusive high-stakes rewards.',
      type: 'High Roller',
      timeLeft: '2d 12h',
      isVip: true,
      isLocked: false,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=200',
    },
  ];

  const expiredOffers = [
    {
      id: 9,
      title: 'Weekend Warrior Bonus',
      description: '150% bonus for weekend gaming sessions',
      type: 'Weekend Bonus',
      expiredDate: '2 days ago',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=200',
    },
    {
      id: 10,
      title: 'New Player Welcome',
      description: '50% bonus on first three deposits',
      type: 'Welcome Bonus',
      expiredDate: '1 week ago',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=200',
    },
  ];

  const claimedOffers = [
    {
      id: 11,
      title: 'Daily Login Bonus',
      description: '₹100 bonus for 7-day login streak',
      type: 'Daily Bonus',
      status: 'Claimed',
      claimedDate: '3 days ago',
    },
    {
      id: 12,
      title: 'First Win Celebration',
      description: '₹500 bonus for your first game win',
      type: 'Achievement',
      status: 'Used',
      claimedDate: '1 week ago',
    },
  ];

  const filteredOffers = (activeTab === 'active' ? allOffers : expiredOffers).filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/offers"
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
                Cosmic - All Offers & Promotions
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="cosmic-panel p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Tab Filters */}
              <div className="flex gap-2 cosmic-panel rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-6 py-3 rounded-lg transition-colors font-bold ${
                    activeTab === 'active'
                      ? 'cosmic-button-primary text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Active Offers ({allOffers.length})
                </button>
                <button
                  onClick={() => setActiveTab('expired')}
                  className={`px-6 py-3 rounded-lg transition-colors font-bold ${
                    activeTab === 'expired'
                      ? 'cosmic-button-primary text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Expired Offers ({expiredOffers.length})
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
                  className="w-full lg:w-64 cosmic-input pl-10 pr-4 py-3"
                />
              </div>
            </div>
          </motion.div>

          {/* Offers Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeTab === 'active' ? 'All Active Offers' : 'Expired Offers'}
              </h2>
              <span className="text-gray-400 text-sm">
                {filteredOffers.length} offer{filteredOffers.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="cosmic-game-card flex flex-col h-full"
                >
                  {/* Offer Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {offer.isVip && (
                        <span className="px-3 py-1 bg-purple-500/90 text-white rounded-lg text-sm font-medium backdrop-blur-sm">
                          VIP
                        </span>
                      )}
                      {offer.isHot && (
                        <span className="px-3 py-1 bg-red-500/90 text-white rounded-lg text-sm font-medium backdrop-blur-sm">
                          HOT
                        </span>
                      )}
                    </div>

                    {/* Time/Status */}
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1 text-white bg-black/50 px-2 py-1 rounded-lg text-sm backdrop-blur-sm">
                        <Clock size={14} />
                        <span>
                          {activeTab === 'active' ? offer.timeLeft : `Expired ${offer.expiredDate}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Offer Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-3">
                      <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                        {offer.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      {offer.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-grow">
                      Exclusive offer with premium rewards
                    </p>

                    {/* Action Button */}
                    <div>
                      {activeTab === 'active' && (
                        <button
                          className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                            offer.isLocked
                              ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105'
                          }`}
                          disabled={offer.isLocked}
                        >
                          {offer.isLocked ? 'Requirements Not Met' : 'Claim Now'}
                        </button>
                      )}
                      {activeTab === 'expired' && (
                        <div className="w-full py-3 bg-gray-600/20 text-gray-400 rounded-lg text-center font-medium">
                          Expired
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* No Results */}
          {filteredOffers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">No offers found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search terms</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          )}

          {/* My Claimed Offers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <button
              onClick={() => setShowClaimedOffers(!showClaimedOffers)}
              className="flex items-center justify-between w-full bg-[#132F4C] p-6 rounded-xl text-left border border-blue-500/20 hover:bg-[#1A243D] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Star className="text-yellow-400" size={24} />
                <span className="font-semibold text-white text-xl">My Claimed Offers</span>
              </div>
              {showClaimedOffers ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>

            <AnimatePresence>
              {showClaimedOffers && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {claimedOffers.map((offer) => (
                      <div
                        key={offer.id}
                        className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2 text-white text-lg">{offer.title}</h4>
                            <p className="text-sm text-gray-400 mb-3">{offer.description}</p>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                                {offer.type}
                              </span>
                              <span className="text-sm text-gray-400">
                                {offer.status} • {offer.claimedDate}
                              </span>
                            </div>
                          </div>
                          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
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
        
        <Footer />
      </div>
    </div>
  );
}