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
import { TransactionsPage } from './components/pages/TransactionsPage';
import { UpcomingGamesPage } from './components/pages/UpcomingGamesPage';
import { WalletPage } from './components/pages/WalletPage';

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
                  <div className="relative overflow-hidden">
                    <div className="flex overflow-x-auto scroll-smooth snap-x gap-4 pb-4" 
                         style={{ 
                           scrollbarWidth: 'thin', 
                           scrollbarColor: '#3B82F6 transparent',
                           scrollBehavior: 'smooth'
                         }}>
                      {offers.slice(0, 4).map((offer, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-br from-[#132F4C] to-[#1A243D] rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 flex-shrink-0 w-72 snap-start"
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
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Scroll Indicators */}
                    <div className="flex justify-center mt-4 gap-2">
                      {offers.slice(0, 4).map((_, index) => (
                        <div
                          key={index}
                          className="w-2 h-2 rounded-full bg-blue-500/30 hover:bg-blue-500/60 transition-colors cursor-pointer"
                        />
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
                        {filteredGameCards.map((game, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="bg-gradient-to-br from-[#1A2332] via-[#132F4C] to-[#0F1A2E] rounded-2xl p-6 relative overflow-hidden group cursor-pointer border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm"
                            onClick={() => handleNavigation(game.route)}
                            style={{
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                            }}
                          >
                            {/* Premium Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            
                            {/* Animated Border */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                            
                            <div className="flex flex-col h-full">
                              <div className="w-full h-36 lg:h-44 mb-6 overflow-hidden rounded-xl relative">
                                {/* Image Overlay for Premium Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 rounded-xl" />
                                <img
                                  src={game.image}
                                  alt={game.label}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-110 contrast-110"
                                />
                                {/* Premium Badge */}
                                <div className="absolute top-3 right-3 z-20">
                                  <div className="bg-gradient-to-r from-yellow-400/90 to-amber-500/90 text-black px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-yellow-300/50">
                                    PREMIUM
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1 relative z-20">
                                <div className="text-xs text-blue-300 mb-3 font-semibold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full inline-block border border-blue-500/20">
                                  {game.category}
                                </div>
                                <h3 className="font-bold text-white mb-3 text-lg lg:text-xl leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                  {game.label}
                                </h3>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                  {game.description}
                                </p>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigation(game.route);
                                  }}
                                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white px-6 py-3 rounded-xl transition-all duration-300 w-full font-semibold text-sm tracking-wide shadow-lg hover:shadow-blue-500/30 border border-blue-500/20 hover:border-blue-400/40 transform hover:scale-[1.02] active:scale-[0.98]"
                                  style={{
                                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                  }}
                                >
                                  <span className="flex items-center justify-center gap-2">
                                    <span>Play Now</span>
                                    <span className="text-xs">→</span>
                                  </span>
                                </button>
                              </div>
                            </div>
                            
                            {/* Premium Corner Accent */}
                            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-2xl" />
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
          <Route path="/offers" element={
            <div className="min-h-screen bg-[#0A1929]">
              <OffersPage />
            </div>
          } />
          <Route path="/popular" element={
            <div className="min-h-screen bg-[#0A1929]">
              <PopularPage />
            </div>
          } />
          <Route path="/all-games" element={
            <div className="min-h-screen bg-[#0A1929]">
              <AllGamesPage />
            </div>
          } />
          <Route path="/new-games" element={
            <div className="min-h-screen bg-[#0A1929]">
              <NewGamesPage />
            </div>
          } />
          <Route path="/settings" element={
            <div className="min-h-screen bg-[#0A1929]">
              <SettingsPage />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen bg-[#0A1929]">
              <AboutPage />
            </div>
          } />
          <Route path="/upcoming" element={
            <UpcomingGamesPage />
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
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/upcoming" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1
                      className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
                      style={{
                         fontFamily: "'Orbitron', sans-serif"
                        }}
                    >
                      Cosmic - Upcoming Games
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6 text-white">
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
          <Route path="/transactions" element={
            <TransactionsPage />
          } />
          
          {/* New Pages */}
          <Route path="/slots" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Slot Games
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                  <h2 className="text-2xl font-bold text-white mb-4">Slot Games Coming Soon!</h2>
                  <p className="text-gray-300 text-lg mb-4">
                    We're working on exciting slot games with cosmic themes and amazing rewards.
                  </p>
                  <p className="text-gray-400">
                    Stay tuned for announcements about our upcoming slot collection.
                  </p>
                </div>
              </div>
            </div>
          } />
          <Route path="/roulette" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Roulette
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                  <h2 className="text-2xl font-bold text-white mb-4">Cosmic Roulette Coming Soon!</h2>
                  <p className="text-gray-300 text-lg mb-4">
                    Experience the classic roulette game with a cosmic twist and enhanced graphics.
                  </p>
                  <p className="text-gray-400">
                    Our development team is crafting an immersive roulette experience for you.
                  </p>
                </div>
              </div>
            </div>
          } />
          <Route path="/help-center" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Help Center
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="space-y-6">
                  <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                    <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      <div className="bg-[#0A1929] rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">How do I deposit funds?</h3>
                        <p className="text-gray-300">You can deposit using UPI, Net Banking, or Digital Wallets. Go to Wallet → Deposit to get started.</p>
                      </div>
                      <div className="bg-[#0A1929] rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">How long do withdrawals take?</h3>
                        <p className="text-gray-300">Withdrawals are processed within 24 hours. UPI withdrawals are usually instant.</p>
                      </div>
                      <div className="bg-[#0A1929] rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Are the games fair?</h3>
                        <p className="text-gray-300">Yes, all our games use provably fair algorithms and are regularly audited for fairness.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                    <h2 className="text-2xl font-bold text-white mb-6">Contact Support</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Live Chat</h3>
                        <p className="text-gray-300 mb-4">Get instant help from our support team</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                          Start Live Chat
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Email Support</h3>
                        <p className="text-gray-300 mb-2">support@cosmic777.com</p>
                        <p className="text-gray-400 text-sm">Response within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/gambling-helpline" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Gambling Helpline
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="space-y-6">
                  <div className="bg-red-900/20 rounded-xl p-8 border border-red-500/30">
                    <h2 className="text-2xl font-bold text-red-400 mb-6">Need Help? We're Here for You</h2>
                    <p className="text-gray-300 text-lg mb-6">
                      If gambling is no longer fun or you're concerned about your gaming habits, please reach out for help.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#132F4C] rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Emergency Contacts</h3>
                        <div className="space-y-2 text-gray-300">
                          <p>National Gambling Helpline: 1800-XXX-XXXX</p>
                          <p>Crisis Support: 24/7 Available</p>
                          <p>Email: help@gamblinghelp.org</p>
                        </div>
                      </div>
                      <div className="bg-[#132F4C] rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Self-Help Resources</h3>
                        <div className="space-y-2 text-gray-300">
                          <p>• Set daily/weekly limits</p>
                          <p>• Take regular breaks</p>
                          <p>• Never chase losses</p>
                          <p>• Seek professional help</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/live-support" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Live Support
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                  <h2 className="text-2xl font-bold text-white mb-6">24/7 Live Support</h2>
                  <p className="text-gray-300 text-lg mb-6">
                    Our support team is available around the clock to help you with any questions or issues.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg transition-colors text-left">
                      <h3 className="text-lg font-semibold mb-2">Start Live Chat</h3>
                      <p className="text-blue-100">Get instant help from our support agents</p>
                    </button>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg transition-colors text-left">
                      <h3 className="text-lg font-semibold mb-2">Create Support Ticket</h3>
                      <p className="text-purple-100">Submit a detailed support request</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/self-exclusion" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Self Exclusion
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="space-y-6">
                  <div className="bg-yellow-900/20 rounded-xl p-8 border border-yellow-500/30">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-6">Self-Exclusion Options</h2>
                    <p className="text-gray-300 text-lg mb-6">
                      Take control of your gaming with our self-exclusion tools. Set limits or temporarily block your account.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#132F4C] rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Daily Limits</h3>
                        <p className="text-gray-300 mb-4">Set maximum daily deposit and betting limits</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                          Set Limits
                        </button>
                      </div>
                      <div className="bg-[#132F4C] rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Time Exclusion</h3>
                        <p className="text-gray-300 mb-4">Block your account for 24h, 7 days, or 30 days</p>
                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                          Set Timeout
                        </button>
                      </div>
                      <div className="bg-[#132F4C] rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Permanent Exclusion</h3>
                        <p className="text-gray-300 mb-4">Permanently close your account</p>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                          Close Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/affiliate-program" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Affiliate Program
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="space-y-8">
                  <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                    <h2 className="text-3xl font-bold text-white mb-6">Join Our Affiliate Program</h2>
                    <p className="text-gray-300 text-lg mb-6">
                      Earn lifetime commissions by referring players to Cosmic777. Our affiliate program offers competitive rates and reliable payouts.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#0A1929] rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">25%</div>
                        <div className="text-white font-semibold mb-2">Revenue Share</div>
                        <div className="text-gray-400 text-sm">Lifetime commission on referred players</div>
                      </div>
                      <div className="bg-[#0A1929] rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">₹500</div>
                        <div className="text-white font-semibold mb-2">Minimum Payout</div>
                        <div className="text-gray-400 text-sm">Low threshold for withdrawals</div>
                      </div>
                      <div className="bg-[#0A1929] rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">24h</div>
                        <div className="text-white font-semibold mb-2">Payment Time</div>
                        <div className="text-gray-400 text-sm">Fast and reliable payouts</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                    <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Sign Up</h4>
                          <p className="text-gray-300">Register for our affiliate program and get your unique referral link</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Promote</h4>
                          <p className="text-gray-300">Share your link on social media, websites, or with friends</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Earn</h4>
                          <p className="text-gray-300">Get 25% commission on all revenue generated by your referrals</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                        Join Affiliate Program
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/vault-guide" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - How to Use the Vault
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="space-y-8">
                  <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                    <h2 className="text-3xl font-bold text-white mb-6">Your Cosmic Vault System</h2>
                    <p className="text-gray-300 text-lg mb-8">
                      The Vault is your secure digital wallet for managing funds on Cosmic777. Here's how it works:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-[#0A1929] rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-blue-400 mb-4">1. Adding Funds</h3>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Use UPI, Net Banking, or Digital Wallets</li>
                            <li>• Minimum deposit: ₹100</li>
                            <li>• Instant processing for most methods</li>
                            <li>• Funds appear in your vault immediately</li>
                          </ul>
                        </div>
                        <div className="bg-[#0A1929] rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-green-400 mb-4">2. Playing Games</h3>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Use vault coins to place bets</li>
                            <li>• Winnings are added to your vault</li>
                            <li>• Track all transactions in real-time</li>
                            <li>• Set spending limits for responsible gaming</li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-[#0A1929] rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-purple-400 mb-4">3. Withdrawing Winnings</h3>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Minimum withdrawal: ₹1000</li>
                            <li>• Process within 24 hours</li>
                            <li>• Secure bank transfers</li>
                            <li>• Track withdrawal status</li>
                          </ul>
                        </div>
                        <div className="bg-[#0A1929] rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-yellow-400 mb-4">4. Security Features</h3>
                          <ul className="space-y-2 text-gray-300">
                            <li>• 256-bit SSL encryption</li>
                            <li>• Two-factor authentication</li>
                            <li>• Transaction history tracking</li>
                            <li>• Fraud protection systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/betting-guide" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Betting Guide
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="space-y-8">
                  <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                    <h2 className="text-3xl font-bold text-white mb-6">Smart Betting Strategies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
                          <h3 className="text-xl font-semibold text-green-400 mb-4">Recommended Approach</h3>
                          <ul className="space-y-3 text-gray-300">
                            <li>• Start with small bets (₹10-50)</li>
                            <li>• Never bet more than 5% of your balance</li>
                            <li>• Set daily loss limits</li>
                            <li>• Take breaks between sessions</li>
                            <li>• Celebrate wins, learn from losses</li>
                          </ul>
                        </div>
                        <div className="bg-[#0A1929] rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-blue-400 mb-4">Bet Limits</h3>
                          <div className="space-y-2 text-gray-300">
                            <p>Minimum bet: ₹1 - ₹10 (varies by game)</p>
                            <p>Maximum bet: ₹100,000</p>
                            <p>Daily limit: ₹2,00,000</p>
                            <p>Monthly limit: ₹50,00,000</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-red-900/20 rounded-lg p-6 border border-red-500/30">
                          <h3 className="text-xl font-semibold text-red-400 mb-4">What to Avoid</h3>
                          <ul className="space-y-3 text-gray-300">
                            <li>• Don't chase losses with bigger bets</li>
                            <li>• Avoid betting when emotional</li>
                            <li>• Don't borrow money to gamble</li>
                            <li>• Never bet money you can't afford to lose</li>
                            <li>• Don't play for extended periods</li>
                          </ul>
                        </div>
                        <div className="bg-[#0A1929] rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Risk Management</h3>
                          <div className="space-y-2 text-gray-300">
                            <p>Low Risk: 1-2% of balance per bet</p>
                            <p>Medium Risk: 3-5% of balance per bet</p>
                            <p>High Risk: 5-10% of balance per bet</p>
                            <p className="text-red-400">Never exceed 10% per bet</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/how-to-guides" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - How-to Guides
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">How to Deposit</h3>
                    <p className="text-gray-300 mb-4">Step-by-step guide to add funds to your account</p>
                    <button onClick={() => navigate('/deposit')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      View Guide
                    </button>
                  </div>
                  <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-bold text-green-400 mb-4">How to Withdraw</h3>
                    <p className="text-gray-300 mb-4">Learn how to withdraw your winnings safely</p>
                    <button onClick={() => navigate('/withdrawal')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      View Guide
                    </button>
                  </div>
                  <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Game Tutorials</h3>
                    <p className="text-gray-300 mb-4">Learn how to play each game effectively</p>
                    <button onClick={() => navigate('/all-games')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                      View Games
                    </button>
                  </div>
                  <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-bold text-yellow-400 mb-4">Claim Bonuses</h3>
                    <p className="text-gray-300 mb-4">How to claim and use promotional bonuses</p>
                    <button onClick={() => navigate('/offers')} className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                      View Offers
                    </button>
                  </div>
                  <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">Contact Support</h3>
                    <p className="text-gray-300 mb-4">Get help when you need it most</p>
                    <button onClick={() => navigate('/help-center')} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Get Help
                    </button>
                  </div>
                  <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-bold text-orange-400 mb-4">Account Security</h3>
                    <p className="text-gray-300 mb-4">Keep your account safe and secure</p>
                    <button onClick={() => navigate('/security-tips')} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Security Tips
                    </button>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/casino-guide" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Online Casino Guide
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="space-y-8">
                  <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                    <h2 className="text-3xl font-bold text-white mb-6">What is an Online Casino?</h2>
                    <p className="text-gray-300 text-lg mb-6">
                      An online casino is a digital platform where you can play casino games using real money. 
                      Cosmic777 offers a secure, fair, and entertaining gaming experience from the comfort of your home.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-[#0A1929] rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-400 mb-4">Available Games</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Dice Games - Test your luck</li>
                          <li>• Card Games - Strategy meets chance</li>
                          <li>• Rock Paper Scissors - Classic with a twist</li>
                          <li>• Balloon Pop - Fun and rewarding</li>
                          <li>• Minesweeper - Strategic gameplay</li>
                          <li>• Coin Toss - Simple yet exciting</li>
                        </ul>
                      </div>
                      <div className="bg-[#0A1929] rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">How Winnings Work</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Win multipliers based on game outcomes</li>
                          <li>• Instant credit to your vault</li>
                          <li>• Withdraw winnings anytime</li>
                          <li>• Transparent and fair payouts</li>
                          <li>• No hidden fees or charges</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                    <h3 className="text-2xl font-bold text-white mb-6">Safe Gaming Practices</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-900/20 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Set Limits</h4>
                        <p className="text-gray-300">Always set time and money limits before you start playing</p>
                      </div>
                      <div className="bg-green-900/20 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-green-400 mb-3">Play for Fun</h4>
                        <p className="text-gray-300">Gaming should be entertainment, not a way to make money</p>
                      </div>
                      <div className="bg-purple-900/20 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-purple-400 mb-3">Stay in Control</h4>
                        <p className="text-gray-300">If gaming stops being fun, take a break or seek help</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/responsible-gaming" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Responsible Gaming
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="space-y-8">
                  <div className="bg-green-900/20 rounded-xl p-8 border border-green-500/30">
                    <h2 className="text-3xl font-bold text-green-400 mb-6">Gaming Should Be Fun</h2>
                    <p className="text-gray-300 text-lg mb-6">
                      At Cosmic777, we believe gaming should always be enjoyable and within your means. 
                      We're committed to promoting responsible gaming practices.
                    </p>
                    <div className="bg-[#132F4C] rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">⚠️ Important Reminders</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• You must be 18+ to play</li>
                        <li>• Gaming is for entertainment, not income</li>
                        <li>• Never gamble under the influence</li>
                        <li>• Set time and money limits</li>
                        <li>• Take regular breaks</li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                      <h3 className="text-2xl font-bold text-blue-400 mb-6">Time Management Tips</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Set a timer for gaming sessions</li>
                        <li>• Take 15-minute breaks every hour</li>
                        <li>• Don't play when tired or stressed</li>
                        <li>• Have other hobbies and activities</li>
                        <li>• Spend time with family and friends</li>
                      </ul>
                    </div>
                    <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                      <h3 className="text-2xl font-bold text-red-400 mb-6">When to Seek Help</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Gaming affects your relationships</li>
                        <li>• You're spending more than planned</li>
                        <li>• You feel anxious when not playing</li>
                        <li>• You're borrowing money to play</li>
                        <li>• Gaming interferes with work/school</li>
                      </ul>
                      <button onClick={() => navigate('/gambling-helpline')} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
                        Get Help Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/security-tips" element={
            <div className="min-h-screen bg-[#0A1929] text-white">
              <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate('/')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft size={20} />
                      <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Cosmic - Security Tips
                    </h1>
                  </div>
                </div>
              </div>
              <div className="max-w-6xl mx-auto p-6">
                <div className="space-y-8">
                  <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
                    <h2 className="text-3xl font-bold text-white mb-6">Keep Your Account Secure</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
                          <h3 className="text-xl font-semibold text-green-400 mb-4">✅ Do This</h3>
                          <ul className="space-y-3 text-gray-300">
                            <li>• Use strong, unique passwords</li>
                            <li>• Enable two-factor authentication</li>
                            <li>• Only play on HTTPS secure sites</li>
                            <li>• Log out after each session</li>
                            <li>• Keep your browser updated</li>
                            <li>• Use trusted payment methods</li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-red-900/20 rounded-lg p-6 border border-red-500/30">
                          <h3 className="text-xl font-semibold text-red-400 mb-4">❌ Never Do This</h3>
                          <ul className="space-y-3 text-gray-300">
                            <li>• Share your login credentials</li>
                            <li>• Use public WiFi for gaming</li>
                            <li>• Download suspicious files</li>
                            <li>• Click on unknown links</li>
                            <li>• Save passwords in browsers</li>
                            <li>• Ignore security warnings</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-900/20 rounded-xl p-8 border border-yellow-500/30">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-6">Password Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#132F4C] rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Strong Password</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• At least 12 characters</li>
                          <li>• Mix of letters, numbers, symbols</li>
                          <li>• No personal information</li>
                          <li>• Unique for each account</li>
                        </ul>
                      </div>
                      <div className="bg-[#132F4C] rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Two-Factor Auth</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Extra layer of security</li>
                          <li>• SMS or app-based codes</li>
                          <li>• Protects against hacking</li>
                          <li>• Enable in account settings</li>
                        </ul>
                      </div>
                      <div className="bg-[#132F4C] rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Regular Updates</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Change passwords regularly</li>
                          <li>• Update browser and OS</li>
                          <li>• Monitor account activity</li>
                          <li>• Report suspicious activity</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Route path="/vault-guide" element={<VaultGuidePage />} />
            <Route path="/betting-guide" element={<BettingGuidePage />} />
            <Route path="/how-to-guides" element={<HowToGuidesPage />} />
            <Route path="/casino-guide" element={<CasinoGuidePage />} />
            <Route path="/responsible-gaming" element={<ResponsibleGamingPage />} />
            <Route path="/security-tips" element={<SecurityTipsPage />} />
          } />
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