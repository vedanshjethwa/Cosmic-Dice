import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Wallet,
  Star,
  Users,
  ChevronRight,
  ChevronLeft,
  Play,
} from 'lucide-react';

// Import components
import { Sidebar } from './components/Sidebar';
import { SearchSystem } from './components/SearchSystem';
import { WalletModal } from './components/WalletModal';
import { RedeemModal } from './components/RedeemModal';
import { ScratchCard } from './components/ScratchCard';
import { FeedbackModal } from './components/FeedbackModal';
import ChatWindow from './components/ChatSupport/ChatWindow';
import { ChatButton } from './components/ChatSupport/ChatButton';
import { GuidanceSystem } from './components/GuidanceSystem';
import { GameGrid } from './components/GameGrid';
import { StatsSection } from './components/StatsSection';
import { ProfilePage } from './components/ProfilePage';
import { WithdrawalPage } from './components/WithdrawalPage';
import { Footer } from './components/Footer';
import { useChatStore } from './components/ChatSupport/ChatStore';

// Import page components
import { AllGamesPage } from './components/pages/AllGamesPage';
import { PopularPage } from './components/pages/PopularPage';
import { OffersPage } from './components/pages/OffersPage';
import NewGamesPage from './components/pages/NewGamesPage';
import { UpcomingGamesPage } from './components/pages/UpcomingGamesPage';
import { AboutPage } from './components/pages/AboutPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { TransactionsPage } from './components/pages/TransactionsPage';
import { WalletPage } from './components/pages/WalletPage';
import { DepositPage } from './components/pages/DepositPage';
import { GameDetailPage } from './components/pages/GameDetailPage';
import FeedbackPage from './components/FeedbackPage';

// Import auth components
import { AuthContainer } from './auth/AuthContainer';
import { AuthForm } from './auth/AuthForm';
import { Logo } from './auth/Logo';

// Import HowToPlay modal
import { HowToPlayModal } from '../HowToPlay';

// Import Star component
import { StarComponent } from './Star/star';

// Game data
const gameCards = [
  {
    label: 'Cosmic RPS',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    route: '/game/rps',
    description: 'Rock Paper Scissors with cosmic twists and strategic gameplay',
    category: 'Strategy',
    players: '2.5K',
    rating: 4.8,
    isFeatured: true,
  },
  {
    label: 'Cosmic Dice',
    image:
      'https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    route: '/game/dice',
    description: 'Roll the cosmic dice and test your luck with dynamic betting tiers',
    category: 'Luck',
    players: '3.2K',
    rating: 4.9,
    isFeatured: true,
  },
  {
    label: 'Cosmic Limbo',
    image:
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    route: '/game/limbo',
    description: 'How low can you go in this thrilling multiplier game',
    category: 'Risk',
    players: '1.8K',
    rating: 4.7,
    isNew: true,
  },
  {
    label: 'Cosmic Snakes',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    route: '/game/snakes',
    description: 'Navigate through the cosmic maze and avoid the snakes',
    category: 'Adventure',
    players: '2.1K',
    rating: 4.6,
  },
  {
    label: 'Cosmic Cards',
    image:
      'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    route: '/game/card',
    description: 'Pick your fortune card and reveal cosmic rewards',
    category: 'Luck',
    players: '1.5K',
    rating: 4.4,
  },
  {
    label: 'Prediction Pulse',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    route: '/game/prediction-pulse',
    description: 'Time your predictions perfectly for maximum rewards',
    category: 'Timing',
    players: '1.3K',
    rating: 4.3,
  },
  {
    label: 'Cosmic Balloon',
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    route: '/game/balloon',
    description: 'Pop balloons for cosmic rewards and multipliers',
    category: 'Luck',
    players: '1.9K',
    rating: 4.5,
    isNew: true,
  },
  {
    label: 'Cosmic Minesweeper',
    image:
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    route: '/game/minesweeper',
    description: 'Navigate the cosmic minefield and claim your rewards',
    category: 'Strategy',
    players: '1.1K',
    rating: 4.2,
    isNew: true,
  },
  {
    label: 'Cosmic Heads & Tails',
    image:
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
    route: '/game/toss',
    description: 'Classic coin flip with cosmic rewards and fast-paced action',
    category: 'Luck',
    players: '2.3K',
    rating: 4.7,
    isNew: true,
  },
];

function HomePage() {
  const navigate = useNavigate();
  const { setIsOpen: setChatOpen } = useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [scratchOpen, setScratchOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState<string>('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [balance, setBalance] = useState(5000);
  const [currentSlide, setCurrentSlide] = useState(0);

  // User behavior tracking for guidance system
  const [userBehavior, setUserBehavior] = useState({
    consecutiveLosses: 0,
    totalBetAmount: 0,
    sessionTime: 0,
    lastBetAmount: 0,
    averageBetSize: 0,
  });

  const gameContext = {
    currentGame: undefined,
    isPlaying: false,
    balance: balance,
  };

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setUserBehavior(prev => ({
        ...prev,
        sessionTime: prev.sessionTime + 1
      }));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setSearchOpen(true);
            break;
          case 'b':
            e.preventDefault();
            setSidebarOpen(!sidebarOpen);
            break;
        }
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setWalletOpen(false);
        setRedeemOpen(false);
        setScratchOpen(false);
        setFeedbackOpen(false);
        setShowHowToPlay(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Handle game navigation
  const handleGameClick = (route: string) => {
    // Direct navigation to game folders
    const gameRoutes: { [key: string]: string } = {
      '/game/rps': '/rps/index.html',
      '/game/dice': '/dice/index.html',
      '/game/limbo': '/limbo/index.html',
      '/game/snakes': '/snakes/index.html',
      '/game/card': '/card/index.html',
      '/game/prediction-pulse': '/prediction-pulse/index.html',
      '/game/balloon': '/game bollon/index.html',
      '/game/minesweeper': '/minesweeper/index.html',
      '/game/toss': '/toss game/index.html'
    };
    
    const actualRoute = gameRoutes[route] || route;
    window.location.href = actualRoute;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredGames.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredGames.length / 4)) % Math.ceil(featuredGames.length / 4));
  };

  const allCategories = ['all', 'Strategy', 'Luck', 'Risk', 'Adventure', 'Timing'];

  // Filter games based on search and category
  const filteredGames = gameCards.filter(game => {
    const matchesSearch = game.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Featured games for carousel
  const featuredGames = gameCards.filter(game => game.isFeatured || game.isNew);

  // Animated banners data
  const banners = [
    {
      id: 1,
      title: "Welcome to Cosmic Gaming",
      subtitle: "Experience the future of online gaming",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1200&h=400",
      cta: "Start Playing",
      action: () => navigate('/all-games')
    },
    {
      id: 2,
      title: "100% Deposit Bonus",
      subtitle: "Double your first deposit up to ₹5000",
      image: "https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=1200&h=400",
      cta: "Claim Bonus",
      action: () => navigate('/offers')
    },
    {
      id: 3,
      title: "New Games Available",
      subtitle: "Discover our latest cosmic adventures",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=400",
      cta: "Explore Now",
      action: () => navigate('/new-games')
    }
  ];

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => setWalletOpen(true)}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
      }`}>
        {/* Top Navigation */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-40 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20"
        >
          <div className="flex items-center justify-between p-4 lg:px-8">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
              >
                <Menu size={24} />
              </button>
              
              <motion.h1
                className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                whileHover={{ scale: 1.05 }}
              >
                COSMIC
              </motion.h1>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full bg-[#132F4C] text-gray-400 rounded-lg px-4 py-2 text-left flex items-center gap-3 hover:bg-[#1A243D] transition-colors border border-blue-500/20"
              >
                <Search size={20} />
                <span>Search games...</span>
                <div className="ml-auto flex gap-1">
                  <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">⌘</kbd>
                  <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">K</kbd>
                </div>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 lg:gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors md:hidden"
              >
                <Search size={20} />
              </button>
              
              <button
                onClick={() => setWalletOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 lg:px-4 py-2 rounded-lg transition-colors border border-blue-500/30"
              >
                <Wallet size={18} />
                <span className="hidden lg:inline">₹{balance.toLocaleString()}</span>
              </button>

              <button
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">

            {/* Animated Hero Banners */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 lg:mb-12"
            >
              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  {banners.map((banner, index) => (
                    index === currentSlide && (
                      <motion.div
                        key={banner.id}
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                        <div className="absolute inset-0 flex items-center">
                          <div className="max-w-2xl mx-auto px-8 lg:px-16">
                            <motion.h2
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="text-3xl lg:text-5xl font-bold text-white mb-4"
                            >
                              {banner.title}
                            </motion.h2>
                            <motion.p
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-lg lg:text-xl text-gray-200 mb-6"
                            >
                              {banner.subtitle}
                            </motion.p>
                            <motion.button
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              onClick={banner.action}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2"
                            >
                              <Play size={20} />
                              {banner.cta}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
                
                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Featured Games Carousel */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 lg:mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  Featured Games
                </h3>
                <button
                  onClick={() => navigate('/all-games')}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              
              {/* Horizontal Scrolling Games */}
              <div className="relative">
                <div className="flex overflow-x-auto gap-4 lg:gap-6 pb-4 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {gameCards.map((game, index) => (
                    <motion.div
                      key={game.route}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="bg-[#132F4C] rounded-xl overflow-hidden cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 flex-shrink-0 w-72"
                      onClick={() => handleGameClick(game.route)}
                    >
                      <div className="relative h-40">
                        <img
                          src={game.image}
                          alt={game.label}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {game.isNew && (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                              NEW
                            </span>
                          )}
                          {game.isFeatured && (
                            <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                              FEATURED
                            </span>
                          )}
                        </div>

                        {/* Stats overlay */}
                        <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-white">
                          <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                            <Star size={10} className="text-yellow-400 fill-current" />
                            <span>{game.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                            <Users size={10} />
                            <span>{game.players}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full font-medium">
                            {game.category}
                          </span>
                        </div>

                        <h4 className="font-bold text-white mb-2 text-lg">
                          {game.label}
                        </h4>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {game.description}
                        </p>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGameClick(game.route);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium cosmic-button"
                        >
                          Play Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Scroll Indicators */}
                <div className="flex justify-center mt-4 gap-2">
                  {Array.from({ length: Math.ceil(gameCards.length / 4) }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === Math.floor(currentSlide) ? 'bg-blue-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.section>

            {/* All Games Section - Removed to avoid duplication */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 lg:mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white">Popular Games</h3>
                <button
                  onClick={() => navigate('/popular')}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {gameCards.slice(0, 8).map((game, index) => (
                  <motion.div
                    key={game.route}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-[#132F4C] rounded-xl overflow-hidden cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                    onClick={() => handleGameClick(game.route)}
                  >
                    <div className="relative h-32 lg:h-40">
                      <img
                        src={game.image}
                        alt={game.label}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {game.isNew && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                            NEW
                          </span>
                        )}
                        {game.isFeatured && (
                          <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 lg:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full font-medium">
                          {game.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Star size={10} className="text-yellow-400 fill-current" />
                          <span>{game.rating}</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-white mb-2 text-sm lg:text-base">
                        {game.label}
                      </h4>
                      
                      <p className="text-gray-400 text-xs lg:text-sm mb-3 line-clamp-2">
                        {game.description}
                      </p>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGameClick(game.route);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium text-sm"
                      >
                        Play Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Quick Stats */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 lg:mb-12"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">9</div>
                  <div className="text-gray-400 text-sm lg:text-base">Total Games</div>
                </div>
                <div className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-2">15K+</div>
                  <div className="text-gray-400 text-sm lg:text-base">Active Players</div>
                </div>
                <div className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-2">₹2.1M+</div>
                  <div className="text-gray-400 text-sm lg:text-base">Total Winnings</div>
                </div>
                <div className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">98.5%</div>
                  <div className="text-gray-400 text-sm lg:text-base">Average RTP</div>
                </div>
              </div>
            </motion.section>


            {/* Additional Sections */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Stats Section */}
              <div className="xl:col-span-2">
                <StatsSection />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Modals and Overlays */}
      <SearchSystem
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <WalletModal
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        onDeposit={() => {
          setWalletOpen(false);
          navigate('/deposit');
        }}
        onWithdraw={() => {
          setWalletOpen(false);
          navigate('/withdrawal');
        }}
      />

      <RedeemModal
        isOpen={redeemOpen}
        onClose={() => setRedeemOpen(false)}
      />

      <ScratchCard
        isOpen={scratchOpen}
        onClose={() => setScratchOpen(false)}
      />

      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />


      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
        gameType={selectedGameType}
      />

      {/* Floating Elements */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        <ChatButton />
        <StarComponent onActivate={(winRate) => console.log('Star activated:', winRate)} />
      </div>

      {/* Guidance System */}
      <GuidanceSystem
        userBehavior={userBehavior}
        gameContext={gameContext}
      />
    </>
  );
}

function App() {
  const [showAuth, setShowAuth] = useState(false);

  // Handle auth
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAuth(false);
  };

  // Auto-advance banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (showAuth) {
    return (
      <AuthContainer onBack={() => setShowAuth(false)}>
        <Logo />
        <AuthForm onSubmit={handleAuthSubmit} />
      </AuthContainer>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      <ChatWindow />
      <Routes>
        {/* Main Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* Page Routes */}
        <Route path="/all-games" element={<AllGamesPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/new-games" element={<NewGamesPage />} />
        <Route path="/upcoming" element={<UpcomingGamesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/withdrawal" element={<WithdrawalPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/game-detail/:gameId" element={<GameDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />


        {/* Game Routes - Direct links to game folders */}
        <Route path="/game/rps" element={<div>Redirecting to RPS game...</div>} />
        <Route path="/game/dice" element={<div>Redirecting to Dice game...</div>} />
        <Route path="/game/limbo" element={<div>Redirecting to Limbo game...</div>} />
        <Route path="/game/snakes" element={<div>Redirecting to Snakes game...</div>} />
        <Route path="/game/card" element={<div>Redirecting to Card game...</div>} />
        <Route path="/game/prediction-pulse" element={<div>Redirecting to Prediction Pulse game...</div>} />
        <Route path="/game/balloon" element={<div>Redirecting to Balloon game...</div>} />
        <Route path="/game/minesweeper" element={<div>Redirecting to Minesweeper game...</div>} />
        <Route path="/game/toss" element={<div>Redirecting to Toss game...</div>} />
      </Routes>
    </div>
  );
}

export default App;