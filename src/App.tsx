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
  Sparkles,
  Zap,
  Crown,
  Gift,
  Gamepad2
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
import { GameCard } from './components/GameCard';

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
import { CalculatorPage } from './components/pages/CalculatorPage';

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

// Enhanced game data with proper routing
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
    isHot: true,
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
    isHot: true,
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
    isNew: true,
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
    isHot: true,
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
  const featuredGames = gameCards.filter(game => game.isFeatured);
  const popularGames = gameCards.filter(game => game.isHot);
  const newGames = gameCards.filter(game => game.isNew);

  const banners = [
    {
      title: "🚀 Welcome to the Future of Gaming",
      subtitle: "Experience next-generation cosmic games with stunning graphics and fair play",
      gradient: "from-blue-600 via-purple-600 to-pink-600",
      cta: "Start Your Journey",
      action: () => navigate('/all-games'),
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      title: "💎 VIP Rewards & Bonuses",
      subtitle: "Unlock exclusive rewards, daily bonuses, and premium gaming experiences",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      cta: "Claim Rewards",
      action: () => navigate('/offers'),
      icon: <Crown className="w-8 h-8" />
    },
    {
      title: "🎯 24/7 Live Support",
      subtitle: "Get instant help from our expert support team anytime, anywhere",
      gradient: "from-green-500 via-teal-500 to-blue-500",
      cta: "Get Support",
      action: () => setChatOpen(true),
      icon: <Zap className="w-8 h-8" />
    }
  ];

  // If not logged in, show enhanced login form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A23] via-[#1a1a3e] to-[#0A0A23] text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1a1a3e]/95 via-[#2a2a5e]/95 to-[#1a1a3e]/95 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 max-w-md w-full relative z-10 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="relative">
                <Sparkles className="w-12 h-12 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full animate-ping" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                COSMIC
              </h1>
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-3">
              {authMode === 'login' ? 'Welcome Back, Gamer!' : 'Join the Cosmic Universe'}
            </h2>
            <p className="text-gray-300 text-lg">
              {authMode === 'login' 
                ? 'Ready for another cosmic adventure?' 
                : 'Create your account and start winning today!'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-6">
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm"
              >
                <p className="text-red-400 text-sm">{authError}</p>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={authData.email}
                  onChange={handleAuthChange}
                  className="w-full bg-[#0A0A23]/50 text-white rounded-xl pl-12 pr-4 py-4 border border-blue-500/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all backdrop-blur-sm"
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
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="username"
                    value={authData.username}
                    onChange={handleAuthChange}
                    className="w-full bg-[#0A0A23]/50 text-white rounded-xl pl-12 pr-4 py-4 border border-blue-500/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all backdrop-blur-sm"
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
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={authData.password}
                  onChange={handleAuthChange}
                  className="w-full bg-[#0A0A23]/50 text-white rounded-xl pl-12 pr-12 py-4 border border-blue-500/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all backdrop-blur-sm"
                  placeholder={authMode === 'login' ? 'Enter your password' : 'Create a password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={authData.confirmPassword}
                    onChange={handleAuthChange}
                    className="w-full bg-[#0A0A23]/50 text-white rounded-xl pl-12 pr-12 py-4 border border-blue-500/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all backdrop-blur-sm"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-500/25"
            >
              {isLoading ? (
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  {authMode === 'login' ? <LogIn size={24} /> : <UserPlus size={24} />}
                  {authMode === 'login' ? 'Enter the Cosmos' : 'Join the Adventure'}
                </>
              )}
            </motion.button>
          </form>

          {/* Switch Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              {authMode === 'login' ? "New to Cosmic Gaming?" : 'Already have an account?'}{' '}
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setAuthError('');
                  setAuthData({ email: '', password: '', username: '', confirmPassword: '' });
                }}
                className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
              >
                {authMode === 'login' ? 'Create Account' : 'Sign In'}
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
        {/* Enhanced Top Navigation */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-40 bg-gradient-to-r from-[#0A0A23]/95 via-[#1a1a3e]/95 to-[#0A0A23]/95 backdrop-blur-xl border-b border-blue-500/30 shadow-lg"
        >
          <div className="flex items-center justify-between p-4 lg:px-8">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-3 hover:bg-white/10 rounded-xl transition-all hover:scale-105"
              >
                <Menu size={24} />
              </button>
              
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
                  <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full animate-ping" />
                </div>
                <h1
                  className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  COSMIC
                </h1>
              </motion.div>
            </div>

            {/* Center - Enhanced Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full bg-gradient-to-r from-[#1a1a3e]/80 to-[#2a2a5e]/80 text-gray-300 rounded-xl px-6 py-3 text-left flex items-center gap-4 hover:from-[#2a2a5e]/80 hover:to-[#3a3a7e]/80 transition-all border border-blue-500/30 backdrop-blur-sm"
              >
                <Search size={20} className="text-blue-400" />
                <span>Search cosmic games...</span>
                <div className="ml-auto flex gap-1">
                  <kbd className="px-2 py-1 bg-blue-500/20 rounded text-xs border border-blue-500/30">⌘</kbd>
                  <kbd className="px-2 py-1 bg-blue-500/20 rounded text-xs border border-blue-500/30">K</kbd>
                </div>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-3 hover:bg-white/10 rounded-xl transition-all md:hidden hover:scale-105"
              >
                <Search size={20} />
              </button>
              
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-400 px-6 py-3 rounded-xl transition-all border border-blue-500/30 flex items-center gap-3 backdrop-blur-sm">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-lg">
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
                className="p-3 hover:bg-white/10 rounded-xl transition-all hover:scale-105"
              >
                <User size={20} />
              </button>
              
              <button
                onClick={logout}
                className="p-3 hover:bg-red-500/20 rounded-xl transition-all text-red-400 hover:scale-105"
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

            {/* Enhanced Hero Banner Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                <div className="flex transition-transform duration-700 ease-in-out h-full"
                     style={{ transform: `translateX(-${currentBannerSlide * 100}%)` }}>
                  {banners.map((banner, index) => (
                    <div key={index} className="min-w-full h-full relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} opacity-90`} />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-between p-8 lg:p-12">
                        <div className="text-white max-w-2xl">
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-4 mb-4"
                          >
                            {banner.icon}
                            <h2 className="text-3xl lg:text-5xl font-bold">{banner.title}</h2>
                          </motion.div>
                          <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl lg:text-2xl mb-8 text-gray-100"
                          >
                            {banner.subtitle}
                          </motion.p>
                          <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            onClick={banner.action}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-white/30 hover:border-white/50 shadow-lg"
                          >
                            {banner.cta}
                          </motion.button>
                        </div>
                        <div className="hidden lg:block">
                          <motion.div
                            animate={{ 
                              rotate: [0, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              duration: 10, 
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                          >
                            <Gamepad2 className="w-16 h-16 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Enhanced Banner indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBannerSlide(index)}
                      className={`w-4 h-4 rounded-full transition-all ${
                        currentBannerSlide === index 
                          ? 'bg-white shadow-lg scale-125' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Hot Games Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Zap className="w-8 h-8 text-orange-400" />
                    <div className="absolute inset-0 bg-orange-400/20 blur-lg rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    🔥 Hot Games
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/popular')}
                  className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2 font-semibold"
                >
                  View All
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {popularGames.map((game, index) => (
                  <EnhancedGameCard key={game.route} game={game} index={index} />
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
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    <div className="absolute inset-0 bg-yellow-400/20 blur-lg rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    ⭐ Featured Games
                  </h3>
                </div>
              </div>
              
              {/* Mobile: 3 games side by side with horizontal scroll */}
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                  {featuredGames.map((game, index) => (
                    <div key={game.route} className="flex-shrink-0 w-80 sm:w-72 md:w-80 snap-start">
                      <EnhancedGameCard game={game} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* All Games Section - Single Horizontal Row */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Gamepad2 className="w-8 h-8 text-blue-400" />
                    <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    🎮 All Games ({gameCards.length})
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/all-games')}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 font-semibold"
                >
                  View All
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Category Filters */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-[#132F4C] text-gray-300 hover:bg-blue-600/20 border border-blue-500/20'
                    }`}
                  >
                    {category === 'all' ? 'All Games' : category}
                  </button>
                ))}
              </div>
              
              {/* Single Horizontal Row with Scroll */}
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory cosmic-games-scroll">
                  {filteredGames.map((game, index) => (
                    <div key={game.route} className="flex-shrink-0 w-80 snap-start">
                      <EnhancedGameCard game={game} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* New Games Section */}
            {newGames.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Gift className="w-8 h-8 text-green-400" />
                      <div className="absolute inset-0 bg-green-400/20 blur-lg rounded-full animate-pulse" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                      🆕 New Games
                    </h3>
                  </div>
                  <button
                    onClick={() => navigate('/new-games')}
                    className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-2 font-semibold"
                  >
                    View All
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {newGames.map((game, index) => (
                    <EnhancedGameCard key={game.route} game={game} index={index} />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Enhanced Stats Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl p-6 border border-blue-500/30 text-center backdrop-blur-sm">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">9</div>
                  <div className="text-gray-300 font-medium">Total Games</div>
                </div>
                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl p-6 border border-green-500/30 text-center backdrop-blur-sm">
                  <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">25K+</div>
                  <div className="text-gray-300 font-medium">Active Players</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-6 border border-purple-500/30 text-center backdrop-blur-sm">
                  <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">₹5.2M+</div>
                  <div className="text-gray-300 font-medium">Total Winnings</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/30 text-center backdrop-blur-sm">
                  <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">98.5%</div>
                  <div className="text-gray-300 font-medium">Average RTP</div>
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

      {/* Enhanced Chat Support */}
      <ChatButton />
      <ChatWindow />
    </>
  );
}

// Enhanced Game Card Component with Premium Design
function EnhancedGameCard({ game, index }: { game: any; index: number }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-gradient-to-br from-[#1a1a3e]/80 to-[#2a2a5e]/80 rounded-2xl overflow-hidden cursor-pointer border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 group backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 h-full"
      onClick={() => navigate(game.route)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.image}
          alt={game.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a3e] via-transparent to-transparent" />
        
        {/* Enhanced Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {game.isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse"
            >
              ✨ NEW
            </motion.span>
          )}
          {game.isFeatured && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold rounded-full shadow-lg"
            >
              ⭐ FEATURED
            </motion.span>
          )}
          {game.isHot && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-bounce"
            >
              🔥 HOT
            </motion.span>
          )}
        </div>

        {/* Enhanced Stats overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="flex items-center gap-1 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
            <Star size={12} className="text-yellow-400 fill-current" />
            <span className="text-white text-xs font-bold">{game.rating}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
            <Users size={12} className="text-blue-400" />
            <span className="text-white text-xs font-bold">{game.players}</span>
          </div>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-purple-600/40 to-transparent flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30"
              >
                <Play className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full font-semibold border border-blue-500/30">
            {game.category}
          </span>
        </div>

        <h4 className="font-bold text-white mb-3 text-xl group-hover:text-blue-400 transition-colors">
          {game.label}
        </h4>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
          {game.description}
        </p>

        <motion.button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(game.route);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-3 rounded-xl transition-all font-bold text-lg shadow-lg hover:shadow-blue-500/25 mt-auto"
        >
          Play Now
        </motion.button>
      </div>
    </motion.div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading with cosmic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen message="Initializing Cosmic Gaming Universe..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A23] via-[#1a1a3e] to-[#0A0A23] text-white">
      <Routes>
        {/* Public Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/responsible-gaming" element={<ResponsibleGamingPage />} />
        <Route path="/security-tips" element={<SecurityTipsPage />} />
        <Route path="/casino-guide" element={<CasinoGuidePage />} />
        <Route path="/how-to-guides" element={<HowToGuidesPage />} />

        {/* Main Route */}
        <Route path="/" element={<HomePage />} />

        {/* Game Routes - Direct Component Integration */}
        <Route path="/game/rps" element={<RPSApp />} />
        <Route path="/game/dice" element={<DiceApp />} />
        <Route path="/game/limbo" element={<LimboApp />} />
        <Route path="/game/snakes" element={<SnakesApp />} />
        <Route path="/game/card" element={<CardApp />} />
        <Route path="/game/prediction-pulse" element={<PredictionPulseApp />} />
        <Route path="/game/balloon" element={<BalloonApp />} />
        <Route path="/game/minesweeper" element={<MinesweeperApp />} />
        <Route path="/game/toss" element={<TossApp />} />

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
        
        {/* Support Routes */}
        <Route path="/support" element={<SupportPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Routes>
    </div>
  );
}

export default App;