import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  Star,
  Users,
  ChevronRight,
  Play,
  Menu,
  TrendingUp,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Sparkles
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
import { GameGrid } from './components/GameGrid';
import { StatsSection } from './components/StatsSection';
import { ProfilePage } from './components/ProfilePage';
import { WithdrawalPage } from './components/WithdrawalPage';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { GameLayout } from './components/GameLayout';

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
import { AffiliateProgramPage } from './components/pages/AffiliateProgramPage';
import { VaultGuidePage } from './components/pages/VaultGuidePage';
import { BettingGuidePage } from './components/pages/BettingGuidePage';
import { HowToGuidesPage } from './components/pages/HowToGuidesPage';
import { CasinoGuidePage } from './components/pages/CasinoGuidePage';
import { ResponsibleGamingPage } from './components/pages/ResponsibleGamingPage';
import { SecurityTipsPage } from './components/pages/SecurityTipsPage';
import { PaymentMethodsPage } from './components/pages/PaymentMethodsPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/pages/TermsOfServicePage';
import { SupportPage } from './components/pages/SupportPage';

// Import game components
import RPSApp from '../rps/src/App';
import DiceApp from '../dice/src/App';
import LimboApp from '../limbo/src/App';
import SnakesApp from '../snakes/src/App';
import CardApp from '../card/src/App';
import BalloonApp from '../game bollon/src/App';
import MinesweeperApp from '../minesweeper/src/App';
import TossApp from '../toss game/src/App';
import PredictionPulseApp from '../prediction-pulse/src/App';

import { useChatStore } from './components/ChatSupport/ChatStore';

// Game data with proper routing
const gameCards = [
  {
    label: 'Cosmic RPS',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=225',
    route: '/game/rps',
    description: 'Rock Paper Scissors with cosmic twists and strategic gameplay',
    category: 'Strategy',
    players: '2.5K',
    rating: 4.8,
    isFeatured: true,
  },
  {
    label: 'Cosmic Dice',
    image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=400&h=225',
    route: '/game/dice',
    description: 'Roll the cosmic dice and test your luck with dynamic betting tiers',
    category: 'Luck',
    players: '3.2K',
    rating: 4.9,
    isFeatured: true,
  },
  {
    label: 'Cosmic Limbo',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=225',
    route: '/game/limbo',
    description: 'How low can you go in this thrilling multiplier game',
    category: 'Risk',
    players: '1.8K',
    rating: 4.7,
    isNew: true,
  },
  {
    label: 'Cosmic Snakes',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=225',
    route: '/game/snakes',
    description: 'Navigate through the cosmic maze and avoid the snakes',
    category: 'Adventure',
    players: '2.1K',
    rating: 4.6,
  },
  {
    label: 'Cosmic Cards',
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
    route: '/game/card',
    description: 'Pick your fortune card and reveal cosmic rewards',
    category: 'Luck',
    players: '1.5K',
    rating: 4.4,
  },
  {
    label: 'Prediction Pulse',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
    route: '/game/prediction-pulse',
    description: 'Time your predictions perfectly for maximum rewards',
    category: 'Timing',
    players: '1.3K',
    rating: 4.3,
  },
  {
    label: 'Cosmic Balloon',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
    route: '/game/balloon',
    description: 'Pop balloons for cosmic rewards and multipliers',
    category: 'Luck',
    players: '1.9K',
    rating: 4.5,
    isNew: true,
  },
  {
    label: 'Cosmic Minesweeper',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
    route: '/game/minesweeper',
    description: 'Navigate the cosmic minefield and claim your rewards',
    category: 'Strategy',
    players: '1.1K',
    rating: 4.2,
    isNew: true,
  },
  {
    label: 'Cosmic Heads & Tails',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400&h=225',
    route: '/game/toss',
    description: 'Classic coin flip with cosmic rewards and fast-paced action',
    category: 'Luck',
    players: '2.3K',
    rating: 4.7,
    isNew: true,
  },
];

// Simple authentication state
interface User {
  id: string;
  email: string;
  username: string;
  balance: number;
}

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsOpen: setChatOpen } = useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [scratchOpen, setScratchOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showBalance, setShowBalance] = useState(true);
  const [currentBannerSlide, setCurrentBannerSlide] = useState(0);
  
  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showGameInfo, setShowGameInfo] = useState<string | null>(null);

  // Auto-advance banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
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
        setShowGameInfo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Authentication functions
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      if (authMode === 'login') {
        // Simulate login - replace with actual API call
        if (authData.email && authData.password) {
          const mockUser = {
            id: '1',
            email: authData.email,
            username: authData.email.split('@')[0],
            balance: 5000
          };
          setUser(mockUser);
          localStorage.setItem('cosmic_user', JSON.stringify(mockUser));
        } else {
          throw new Error('Please enter email and password');
        }
      } else {
        // Simulate registration
        if (authData.password !== authData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (authData.password.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }
        if (!authData.username) {
          throw new Error('Username is required');
        }
        
        const mockUser = {
          id: '1',
          email: authData.email,
          username: authData.username,
          balance: 1000
        };
        setUser(mockUser);
        localStorage.setItem('cosmic_user', JSON.stringify(mockUser));
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setAuthError('');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cosmic_user');
  };

  // Check for existing user on load
  useEffect(() => {
    const savedUser = localStorage.getItem('cosmic_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('cosmic_user');
      }
    }
  }, []);

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
  const popularGames = gameCards.filter(game => game.isFeatured);

  const banners = [
    {
      title: "Welcome to Cosmic Gaming",
      subtitle: "Experience the future of online gaming",
      image: "/Screenshot (483).png",
      cta: "Start Playing",
      action: () => navigate('/all-games')
    },
    {
      title: "24/7 Live Support",
      subtitle: "Get help anytime, anywhere",
      image: "https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=1200&h=400",
      cta: "Contact Support",
      action: () => setChatOpen(true)
    },
    {
      title: "Exclusive VIP Rewards",
      subtitle: "Unlock premium benefits",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&h=400",
      cta: "View Offers",
      action: () => navigate('/offers')
    }
  ];

  // If not logged in, show login form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-[#132F4C]/95 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 max-w-md w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Sparkles className="w-8 h-8 text-blue-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                COSMIC
              </h1>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Join the Universe'}
            </h2>
            <p className="text-gray-400">
              {authMode === 'login' 
                ? 'Sign in to your cosmic gaming account' 
                : 'Create your cosmic gaming account'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-6">
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
              >
                <p className="text-red-400 text-sm">{authError}</p>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={authData.email}
                  onChange={handleAuthChange}
                  className="w-full bg-[#0A1929] text-white rounded-lg pl-10 pr-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="username"
                    value={authData.username}
                    onChange={handleAuthChange}
                    className="w-full bg-[#0A1929] text-white rounded-lg pl-10 pr-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={authData.password}
                  onChange={handleAuthChange}
                  className="w-full bg-[#0A1929] text-white rounded-lg pl-10 pr-12 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder={authMode === 'login' ? 'Enter your password' : 'Create a password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={authData.confirmPassword}
                    onChange={handleAuthChange}
                    className="w-full bg-[#0A1929] text-white rounded-lg pl-10 pr-12 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  {authMode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setAuthError('');
                  setAuthData({ email: '', password: '', username: '', confirmPassword: '' });
                }}
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                {authMode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }
  return (
    <>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => setWalletOpen(true)}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath={location.pathname}
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
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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
              
              <div className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg transition-colors border border-blue-500/30 flex items-center gap-2">
                <span className="font-medium">
                  {showBalance ? `₹${user.balance.toLocaleString()}` : '₹••••••'}
                </span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <button
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <User size={20} />
              </button>
              
              <button
                onClick={logout}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                title="Logout"
              >
                <LogIn size={20} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">

            {/* Hero Banner Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out h-full"
                     style={{ transform: `translateX(-${currentBannerSlide * 100}%)` }}>
                  {banners.map((banner, index) => (
                    <div key={index} className="min-w-full h-full relative">
                      <img 
                        src={banner.image} 
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-start p-8">
                        <div className="text-white max-w-lg">
                          <h2 className="text-3xl lg:text-4xl font-bold mb-2">{banner.title}</h2>
                          <p className="text-lg mb-6 text-gray-200">{banner.subtitle}</p>
                          <button
                            onClick={banner.action}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
                          >
                            {banner.cta}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Banner indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBannerSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentBannerSlide === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Popular Games Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-blue-400" />
                  Popular Games
                </h3>
                <button
                  onClick={() => navigate('/popular')}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {popularGames.slice(0, 4).map((game, index) => (
                  <GameCard key={game.route} game={game} index={index} />
                ))}
              </div>
            </motion.section>

            {/* Featured Games Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  Featured Games
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredGames.map((game, index) => (
                  <GameCard key={game.route} game={game} index={index} />
                ))}
              </div>
            </motion.section>

            {/* All Games Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-white">All Games ({gameCards.length})</h3>
                <button
                  onClick={() => navigate('/all-games')}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 games-scroll">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#132F4C] text-gray-300 hover:bg-blue-600/20'
                    }`}
                  >
                    {category === 'all' ? 'All Games' : category}
                  </button>
                ))}
              </div>
              
              {/* Horizontal Scrolling Games */}
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 games-scroll">
                  {filteredGames.map((game, index) => (
                    <div key={game.route} className="flex-shrink-0 w-80">
                      <GameCard game={game} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Analytics & Trending Section */}
            <StatsSection />

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

      {/* Chat Support */}
      <ChatButton />
      <ChatWindow />
    </>
  );
}

// Enhanced Game Card Component
function GameCard({ game, index }: { game: any; index: number }) {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-[#132F4C] rounded-xl overflow-hidden cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group game-card-arcade h-full"
      onClick={() => window.location.href = game.route}
    >
      <div className="relative h-48">
        <img
          src={game.image}
          alt={game.label}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {game.isNew && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
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

      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full font-medium">
            {game.category}
          </span>
        </div>

        <h4 className="font-bold text-white mb-2 text-lg group-hover:text-blue-400 transition-colors">
          {game.label}
        </h4>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {game.description}
        </p>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = game.route;
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium cosmic-button mt-auto"
        >
          Play Now
        </button>
      </div>
    </motion.div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen message="Loading Cosmic Casino..." />;
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
        <Routes>
          {/* Public Routes - No Auth Required */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/responsible-gaming" element={<ResponsibleGamingPage />} />
          <Route path="/security-tips" element={<SecurityTipsPage />} />
          <Route path="/casino-guide" element={<CasinoGuidePage />} />
          <Route path="/how-to-guides" element={<HowToGuidesPage />} />

          {/* Main Route */}
          <Route path="/" element={<HomePage />} />

          {/* Game Routes */}
          <Route path="/game/rps" element={
            <GameLayout gameType="RPS" sidebarOpen={false} setSidebarOpen={() => {}}>
              <RPSApp />
            </GameLayout>
          } />
          <Route path="/game/dice" element={
            <GameLayout gameType="Dice" sidebarOpen={false} setSidebarOpen={() => {}}>
              <DiceApp />
            </GameLayout>
          } />
          <Route path="/game/limbo" element={
            <GameLayout gameType="Limbo" sidebarOpen={false} setSidebarOpen={() => {}}>
              <LimboApp />
            </GameLayout>
          } />
          <Route path="/game/snakes" element={
            <GameLayout gameType="Snakes" sidebarOpen={false} setSidebarOpen={() => {}}>
              <SnakesApp />
            </GameLayout>
          } />
          <Route path="/game/card" element={
            <GameLayout gameType="Cards" sidebarOpen={false} setSidebarOpen={() => {}}>
              <CardApp />
            </GameLayout>
          } />
          <Route path="/game/prediction-pulse" element={
            <GameLayout gameType="Prediction Pulse" sidebarOpen={false} setSidebarOpen={() => {}}>
              <PredictionPulseApp />
            </GameLayout>
          } />
          <Route path="/game/balloon" element={
            <GameLayout gameType="Balloon" sidebarOpen={false} setSidebarOpen={() => {}}>
              <BalloonApp />
            </GameLayout>
          } />
          <Route path="/game/minesweeper" element={
            <GameLayout gameType="Minesweeper" sidebarOpen={false} setSidebarOpen={() => {}}>
              <MinesweeperApp />
            </GameLayout>
          } />
          <Route path="/game/toss" element={
            <GameLayout gameType="Heads & Tails" sidebarOpen={false} setSidebarOpen={() => {}}>
              <TossApp />
            </GameLayout>
          } />

          {/* User Dashboard Routes */}
          <Route path="/all-games" element={<AllGamesPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/new-games" element={<NewGamesPage />} />
          <Route path="/upcoming" element={<UpcomingGamesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/withdrawal" element={<WithdrawalPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/game-detail/:gameId" element={<GameDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Info Pages */}
          <Route path="/affiliate-program" element={<AffiliateProgramPage />} />
          <Route path="/vault-guide" element={<VaultGuidePage />} />
          <Route path="/betting-guide" element={<BettingGuidePage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="/deposit-withdrawals" element={<DepositPage />} />
          
          {/* Support Routes */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/help-center" element={<HowToGuidesPage />} />
          <Route path="/gambling-helpline" element={<ResponsibleGamingPage />} />
          <Route path="/live-support" element={<SupportPage />} />
          <Route path="/self-exclusion" element={<ResponsibleGamingPage />} />
        </Routes>
      </div>
  );
}

export default App;