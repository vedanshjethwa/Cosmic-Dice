import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Search, Wallet, Bell, Menu, ArrowLeft, X } from 'lucide-react';
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
import { DepositPage } from './components/pages/DepositPage';
import { GameDetailPage } from './components/pages/GameDetailPage';
import { GuidanceSystem } from './components/GuidanceSystem';
import { SearchSystem } from './components/SearchSystem';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { ArrowLeft } from 'lucide-react';

// Game Pages
import { GameLayout } from './components/GameLayout';
import { HomePage } from './components/pages/HomePage';
import { OffersPage } from './components/pages/OffersPage';
import { PopularPage } from './components/pages/PopularPage';
import { AllGamesPage } from './components/pages/AllGamesPage';
import NewGamesPage from './components/pages/NewGamesPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { AboutPage } from './components/pages/AboutPage';
import FeedbackPage from './components/FeedbackPage';

function App() {
  const [isNavSidebarOpen, setNavSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isRedeemModalOpen, setRedeemModalOpen] = useState(false);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    'games' | 'bonus' | 'affiliate' | 'profile' | 'withdrawal'
  >('games');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome Bonus Available!', message: 'Claim your 100% first deposit bonus', time: '2 min ago', unread: false },
    { id: 2, title: 'New Game Released', message: 'Cosmic Balloon is now live!', time: '1 hour ago', unread: false },
    { id: 3, title: 'Withdrawal Processed', message: 'Your withdrawal of ₹5000 has been completed', time: '2 hours ago', unread: false }
  ]);
  const [userBehavior] = useState({
    consecutiveLosses: 2,
    totalBetAmount: 1500,
    sessionTime: 20 * 60 * 1000, // 20 minutes
    lastBetAmount: 500,
    averageBetSize: 150,
  });
  const [gameContext] = useState({
    currentGame: 'cosmic-dice',
    isPlaying: false,
    balance: 2500,
  });
  const [isLoading, setIsLoading] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowNotifications]);

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

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleWalletAction = (action: 'deposit' | 'withdraw') => {
    setWalletModalOpen(false);
    setIsLoading(true);
    if (action === 'deposit') {
      setTimeout(() => {
        navigate('/deposit');
        setIsLoading(false);
      }, 800);
    } else {
      setTimeout(() => {
        navigate('/withdrawal');
        setIsLoading(false);
      }, 800);
    }
  };

  // Enhanced navigation with loading
  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      setIsLoading(true);
      setTimeout(() => {
        navigate(path);
        setIsLoading(false);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen message="Preparing your cosmic experience..." />}
      </AnimatePresence>
      
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
                ''
              }`}>
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
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
                        className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
                        style={{
                           fontFamily: "'Orbitron', sans-serif"
                          }}
                      >
                        Cosmic
                      </h1>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative hidden md:flex">
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
                          onFocus={() => setShowSearchModal(true)}
                          className={`bg-[#132F4C] rounded-lg pl-10 pr-4 py-2.5 w-[200px] lg:w-[300px] focus:outline-none border-2 transition-colors duration-200 text-white ${
                            searchFocused
                              ? 'border-blue-400/50'
                              : 'border-transparent'
                          }`}
                          onFocus={() => {
                            setSearchFocused(true);
                            setShowSearchModal(true);
                          }}
                          onBlur={() => setSearchFocused(false)}
                        />
                      </div>
                      <button
                        onClick={() => setWalletModalOpen(true)}
                        className="relative hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10"
                      >
                        <Wallet size={24} />
                      </button>
                      <div className="relative" ref={notificationRef}>
                        <button
                          onClick={handleNotificationClick}
                          className="relative hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10"
                        >
                          <Bell size={24} />
                          {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center text-white font-bold">
                              {unreadCount}
                            </span>
                          )}
                        </button>
                        
                        {/* Notifications Dropdown */}
                        {showNotifications && (
                          <div className="absolute right-0 top-full mt-2 w-80 bg-[#132F4C] rounded-xl border border-blue-500/20 shadow-2xl z-50 max-h-96 overflow-y-auto">
                            <div className="p-4 border-b border-blue-500/20">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                                <button
                                  onClick={() => setShowNotifications(false)}
                                  className="text-gray-400 hover:text-white transition-colors"
                                >
                                  <X size={20} />
                                </button>
                              </div>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                              {notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`p-4 border-b border-blue-500/10 hover:bg-blue-500/5 transition-colors cursor-pointer ${
                                    notification.unread ? 'bg-blue-500/5' : ''
                                  }`}
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="text-white font-medium mb-1">{notification.title}</h4>
                                      <p className="text-gray-400 text-sm mb-2">{notification.message}</p>
                                      <span className="text-blue-400 text-xs">{notification.time}</span>
                                    </div>
                                    {notification.unread && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="p-4 border-t border-blue-500/20">
                              <button className="w-full text-center text-blue-400 hover:text-blue-300 transition-colors text-sm">
                                View All Notifications
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => navigate('/profile')}
                          className="hover:scale-105 transition-transform"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40"
                            alt="Profile"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-blue-400/30 cursor-pointer"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="max-w-7xl mx-auto p-4 lg:p-6">
                {/* Mobile Search */}
                <div className="md:hidden relative mb-6">
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
                    onFocus={() => {
                      setSearchFocused(true);
                      setShowSearchModal(true);
                    }}
                    onBlur={() => setSearchFocused(false)}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Compact Featured Offers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Featured Offers</h2>
                    <button 
                      onClick={() => navigate('/offers')}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="relative">
                    <div className="flex overflow-x-auto scroll-smooth snap-x gap-4 pb-4" 
                         style={{ 
                           scrollbarWidth: 'thin', 
                           scrollbarColor: '#3B82F6 transparent',
                           scrollBehavior: 'smooth'
                         }}>
                      {offers.slice(0, 3).map((offer, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-[#132F4C] to-[#1A243D] rounded-lg p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 snap-start flex-shrink-0 w-64 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-2 py-1 rounded-full text-xs font-bold border border-blue-500/30">
                                  {offer.tag}
                                </div>
                              </div>
                              <h2 className="text-sm font-bold mb-2 text-white">
                                {offer.title}
                              </h2>
                              <button 
                                onClick={() => handleNavigation('/offers')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 rounded-lg transition-all duration-300 font-medium text-xs transform hover:scale-105"
                              >
                                Claim Now
                              </button>
                            </div>
                            <div className="w-10 h-10">
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
                  </div>
                </motion.div>

                <div className="flex flex-wrap gap-2 lg:gap-4 mb-6">
                  <button
                    onClick={() => setActiveSection('games')}
                    className={`px-3 lg:px-4 py-2 rounded-lg transition-colors text-sm lg:text-base ${
                      activeSection === 'games'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Games ({filteredGameCards.length})
                  </button>
                  <button
                    onClick={() => setActiveSection('bonus')}
                    className={`px-3 lg:px-4 py-2 rounded-lg transition-colors text-sm lg:text-base ${
                      activeSection === 'bonus'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Bonuses
                  </button>
                  <button
                    onClick={() => setActiveSection('affiliate')}
                    className={`px-3 lg:px-4 py-2 rounded-lg transition-colors text-sm lg:text-base ${
                      activeSection === 'affiliate'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Affiliate
                  </button>
                </div>

                {activeSection === 'games' && (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
                        {filteredGameCards.map((game, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="bg-[#132F4C] rounded-xl p-4 relative overflow-hidden group cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                            onClick={() => handleNavigation(game.route)}
                          >
                            <div className="flex flex-col h-full">
                              <div className="w-full h-32 lg:h-40 mb-4 overflow-hidden rounded-lg">
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
                                <h3 className="font-bold text-white mb-2 text-base lg:text-lg">
                                  {game.label}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                  {game.description}
                                </p>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigation(game.route);
                                  }}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors w-full font-medium"
                                >
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

          {/* Offers Page Route */}
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/all-games" element={<AllGamesPage />} />
          <Route path="/new-games" element={<NewGamesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/upcoming" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="max-w-6xl mx-auto p-6">
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft size={20} />
                    <span className="hidden sm:inline">Back</span>
                  </button>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Upcoming Games
                  </h1>
                </div>
                <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                  <p className="text-gray-300 text-lg mb-4">
                    Exciting new games are coming soon to our platform!
                  </p>
                  <p className="text-gray-400">
                    Stay tuned for announcements about upcoming releases.
                  </p>
                </div>
              </div>
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
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/game-detail/:gameId" element={<GameDetailPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </div>

      <RedeemModal
        isOpen={isRedeemModalOpen}
        onClose={() => setRedeemModalOpen(false)}
      />
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onDeposit={() => handleWalletAction('deposit')}
        onWithdraw={() => handleWalletAction('withdraw')}
      />

      <SearchSystem
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />

      {!isGameRoute && (
        <GuidanceSystem
          userBehavior={userBehavior}
          gameContext={gameContext}
        />
      )}

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