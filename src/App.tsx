import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Search, Wallet, Bell, Menu, ArrowLeft } from 'lucide-react';
import { RedeemModal } from './components/RedeemModal';
import { WalletModal } from './components/WalletModal';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { StatsSection } from './components/StatsSection';
import { BonusSection } from './components/BonusSection';
import { AffiliateSection } from './components/AffiliateSection';
import { ProfilePage } from './components/ProfilePage';
import { WithdrawalPage } from './components/WithdrawalPage';
import { ChatButton } from './components/ChatSupport/ChatButton';
import { ChatWindow } from './components/ChatSupport/ChatWindow';
import { motion, AnimatePresence } from 'framer-motion';

// Game Pages
import { GameLayout } from './components/GameLayout';
import { HomePage } from './components/pages/HomePage';

function App() {
  const [isNavSidebarOpen, setNavSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isRedeemModalOpen, setRedeemModalOpen] = useState(false);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    'games' | 'bonus' | 'affiliate' | 'profile' | 'withdrawal'
  >('games');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isNavSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavSidebarOpen]);

  const gameCards = [
    {
      label: 'Cosmic RPS',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/rps',
      description: 'Rock Paper Scissors with cosmic twists',
      category: 'Strategy'
    },
    {
      label: 'Cosmic Dice',
      image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/dice',
      description: 'Roll the dice and win big',
      category: 'Luck'
    },
    {
      label: 'Cosmic Limbo',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/limbo',
      description: 'How low can you go?',
      category: 'Risk'
    },
    {
      label: 'Cosmic Snakes',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/snakes',
      description: 'Navigate through the cosmic maze',
      category: 'Adventure'
    },
    {
      label: 'Cosmic Cards',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/card',
      description: 'Pick your fortune card',
      category: 'Luck'
    },
    {
      label: 'Prediction Pulse',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/prediction-pulse',
      description: 'Time your predictions perfectly',
      category: 'Timing'
    },
    {
      label: 'Cosmic Balloon',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/balloon',
      description: 'Pop balloons for cosmic rewards',
      category: 'Luck'
    },
    {
      label: 'Cosmic Minesweeper',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/minesweeper',
      description: 'Navigate the cosmic minefield',
      category: 'Strategy'
    },
    {
      label: 'Cosmic Heads & Tails',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/toss',
      description: 'Classic coin flip with cosmic rewards',
      category: 'Luck'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // Filter gameCards based on searchTerm
  const filteredGameCards = gameCards.filter(card =>
    card.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const isGameRoute = location.pathname.startsWith('/game/');
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      <Sidebar
        isOpen={isNavSidebarOpen}
        onClose={() => setNavSidebarOpen(false)}
        onWalletClick={() => setWalletModalOpen(true)}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => setWalletModalOpen(true)}
        currentPath={location.pathname}
      />

      <div
        className={`transition-all duration-300 ease-in-out ${
          isNavSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
        }`}
      >
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <div className="min-h-screen bg-[#0A1929]">
              {/* Header */}
              <div className={`sticky top-0 z-50 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20 transition-all duration-300 ${
                isNavSidebarOpen ? 'lg:pl-0' : 'lg:pl-0'
              }`}>
                <div className="max-w-7xl mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        className="text-white p-2 hover:bg-blue-900/30 rounded-full transition-colors lg:hidden"
                        onClick={() => setNavSidebarOpen(true)}
                        aria-label="Toggle navigation menu"
                      >
                        <Menu size={25} />
                      </button>
                      <h1
                        className={`text-2xl lg:text-3xl font-bold text-white transition-all duration-300`}
                        style={{
                           fontFamily: "'Orbitron', sans-serif"
                          }}
                      >
                        Cosmic
                      </h1>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative hidden sm:flex">
                        <Search
                          className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                            searchFocused ? 'text-blue-400' : 'text-gray-400'
                          }`}
                          size={20}
                        />
                        <input
                          type="text"
                          placeholder="Search games..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className={`bg-[#132F4C] rounded-lg pl-10 pr-4 py-2.5 w-[200px] lg:w-[300px] focus:outline-none border-2 transition-colors duration-200 text-white ${
                            searchFocused
                              ? 'border-blue-400/50'
                              : 'border-transparent'
                          }`}
                          onFocus={() => setSearchFocused(true)}
                          onBlur={() => setSearchFocused(false)}
                        />
                      </div>
                      <button
                        onClick={() => setWalletModalOpen(true)}
                        className="relative hover:text-blue-400 transition-colors"
                      >
                        <Wallet size={24} />
                        <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                          2
                        </span>
                      </button>
                      <div className="relative">
                        <Bell size={24} />
                        <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                          1
                        </span>
                      </div>
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40"
                          alt="Profile"
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-blue-400/30 cursor-pointer"
                          onClick={() => navigate('/profile')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="max-w-7xl mx-auto p-4">
                {/* Mobile Search */}
                <div className="sm:hidden relative mb-6">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                      searchFocused ? 'text-blue-400' : 'text-gray-400'
                    }`}
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search games..."
                    className={`w-full bg-[#132F4C] rounded-lg pl-10 pr-4 py-2.5 focus:outline-none border-2 transition-colors duration-200 text-white ${
                      searchFocused
                        ? 'border-blue-400/50'
                        : 'border-transparent'
                    }`}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Scrollable Top Section - Featured Offers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Featured Offers</h2>
                    <button 
                      onClick={() => setActiveSection('bonus')}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="relative">
                    <div className="flex overflow-x-auto scroll-smooth snap-x gap-3 sm:gap-6 pb-4" 
                         style={{ 
                           scrollbarWidth: 'thin', 
                           scrollbarColor: '#3B82F6 transparent',
                           scrollBehavior: 'smooth'
                         }}>
                      {offers.map((offer, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-[#132F4C] to-[#1A243D] rounded-xl p-4 sm:p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 snap-start flex-shrink-0 w-80 sm:w-96 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30 animate-pulse">
                                  {offer.tag}
                                </div>
                              </div>
                              <h2 className="text-lg font-bold mb-3 text-white">
                                {offer.title}
                              </h2>
                              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm transform hover:scale-105 shadow-lg">
                                Claim Now
                              </button>
                            </div>
                            <div className="w-16 h-16">
                              <img
                                src={offer.image}
                                alt="Offer"
                                className="w-full h-full object-contain filter drop-shadow-lg"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Scroll indicators */}
                    <div className="flex justify-center mt-4 gap-2">
                      {offers.map((_, index) => (
                        <div
                          key={index}
                          className="w-2 h-2 rounded-full bg-blue-500/30 hover:bg-blue-500/60 transition-colors cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setActiveSection('games')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeSection === 'games'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Games ({filteredGameCards.length})
                  </button>
                  <button
                    onClick={() => setActiveSection('bonus')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeSection === 'bonus'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Bonuses
                  </button>
                  <button
                    onClick={() => setActiveSection('affiliate')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeSection === 'affiliate'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Affiliate
                  </button>
                </div>

                {activeSection === 'games' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredGameCards.map((game, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="bg-[#132F4C] rounded-xl p-4 relative overflow-hidden group cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                            onClick={() => navigate(game.route)}
                          >
                            <div className="flex flex-col h-full">
                              <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                                <img
                                  src={game.image}
                                  alt={game.label}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="text-xs text-blue-400 mb-2 font-medium">
                                  {game.category}
                                </div>
                                <h3 className="font-bold text-white mb-2 text-lg">
                                  {game.label}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                  {game.description}
                                </p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors w-full font-medium">
                                  Play Now
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Show message if no games found */}
                      {filteredGameCards.length === 0 && searchTerm && (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4">🎮</div>
                          <h3 className="text-xl font-bold text-gray-400 mb-2">No games found</h3>
                          <p className="text-gray-500">Try adjusting your search terms</p>
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Clear Search
                          </button>
                        </div>
                      )}
                    </div>

                    <StatsSection />
                  </div>
                )}

                {activeSection === 'bonus' && <BonusSection />}
                {activeSection === 'affiliate' && <AffiliateSection />}
              </div>
              <Footer />
              </div>
          } />

          {/* Game Routes */}
          <Route path="/game/rps" element={<GameLayout gameType="rps" />} />
          <Route path="/game/dice" element={<GameLayout gameType="dice" />} />
          <Route path="/game/limbo" element={<GameLayout gameType="limbo" />} />
          <Route path="/game/snakes" element={<GameLayout gameType="snakes" />} />
          <Route path="/game/card" element={<GameLayout gameType="card" />} />
          <Route path="/game/prediction-pulse" element={<GameLayout gameType="prediction-pulse" />} />
          <Route path="/game/balloon" element={<GameLayout gameType="balloon" />} />
          <Route path="/game/minesweeper" element={<GameLayout gameType="minesweeper" />} />
          <Route path="/game/toss" element={<GameLayout gameType="toss" />} />

          {/* Other Routes */}
          <Route path="/profile" element={<ProfilePage onExit={() => navigate('/')} />} />
          <Route path="/withdrawal" element={<WithdrawalPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>

      <RedeemModal
        isOpen={isRedeemModalOpen}
        onClose={() => setRedeemModalOpen(false)}
      />
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

      {!isGameRoute && (
        <>
          <ChatButton />
          <ChatWindow />
        </>
      )}
    </div>
  );
}

export default App;