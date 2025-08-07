import React, { useState, useEffect } from 'react';
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
  Menu,
  Headphones,
  MessageCircle,
  TrendingUp,
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

// Game wrapper components for each game
function RPSGamePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    // Load the RPS game
    const iframe = document.createElement('iframe');
    iframe.src = '/rps/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    return () => {
      if (container && iframe.parentNode) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <GameLayout gameType="RPS" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div id="game-container" className="relative w-full h-full" />
    </GameLayout>
  );
}

function DiceGamePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/dice/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    return () => {
      if (container && iframe.parentNode) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <GameLayout gameType="Dice" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div id="game-container" className="relative w-full h-full" />
    </GameLayout>
  );
}

function LimboGamePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/limbo/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    return () => {
      if (container && iframe.parentNode) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <GameLayout gameType="Limbo" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div id="game-container" className="relative w-full h-full" />
    </GameLayout>
  );
}

function SnakesGamePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/snakes/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    return () => {
      if (container && iframe.parentNode) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <GameLayout gameType="Snakes" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div id="game-container" className="relative w-full h-full" />
    </GameLayout>
  );
}

function CardGamePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/card/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    return () => {
      if (container && iframe.parentNode) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <GameLayout gameType="Cards" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div id="game-container" className="relative w-full h-full" />
    </GameLayout>
  );
}

function PredictionPulseGamePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/prediction-pulse/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    return () => {
      if (container && iframe.parentNode) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <GameLayout gameType="Prediction Pulse" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div id="game-container" className="relative w-full h-full" />
    </GameLayout>
  );
}

function BalloonGamePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/game bollon/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    return () => {
      if (container && iframe.parentNode) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <GameLayout gameType="Balloon" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div id="game-container" className="relative w-full h-full" />
    </GameLayout>
  );
}

function MinesweeperGamePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/minesweeper/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    return () => {
      if (container && iframe.parentNode) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <GameLayout gameType="Minesweeper" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div id="game-container" className="relative w-full h-full" />
    </GameLayout>
  );
}

function TossGamePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/toss game/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    
    const container = document.getElementById('game-container');
    if (container) {
      container.appendChild(iframe);
    }
    
    return () => {
      if (container && iframe.parentNode) {
        container.removeChild(iframe);
      }
    };
  }, []);

  return (
    <GameLayout gameType="Heads & Tails" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div id="game-container" className="relative w-full h-full" />
    </GameLayout>
  );
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
  const [balance, setBalance] = useState(5000);
  const [currentBannerSlide, setCurrentBannerSlide] = useState(0);

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
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1200&h=400",
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

            {/* Hero Banner Section - Compact & Scrollable */}
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
              
              {/* Mobile: 3 cards with proper alignment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredGames.map((game, index) => (
                  <GameCard key={game.route} game={game} index={index} />
                ))}
              </div>
            </motion.section>

            {/* All Games Section - Single Row with Horizontal Scroll */}
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
              
              {/* Horizontal Scrolling Games - Single Row */}
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
  
  const handleGameClick = () => {
    navigate(game.route);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-[#132F4C] rounded-xl overflow-hidden cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group game-card-arcade h-full"
      onClick={handleGameClick}
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
            handleGameClick();
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
        {/* Main Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* Game Routes - Proper page routing */}
        <Route path="/game/rps" element={<RPSGamePage />} />
        <Route path="/game/dice" element={<DiceGamePage />} />
        <Route path="/game/limbo" element={<LimboGamePage />} />
        <Route path="/game/snakes" element={<SnakesGamePage />} />
        <Route path="/game/card" element={<CardGamePage />} />
        <Route path="/game/prediction-pulse" element={<PredictionPulseGamePage />} />
        <Route path="/game/balloon" element={<BalloonGamePage />} />
        <Route path="/game/minesweeper" element={<MinesweeperGamePage />} />
        <Route path="/game/toss" element={<TossGamePage />} />

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
        
        {/* Info Pages */}
        <Route path="/affiliate-program" element={<AffiliateProgramPage />} />
        <Route path="/vault-guide" element={<VaultGuidePage />} />
        <Route path="/betting-guide" element={<BettingGuidePage />} />
        <Route path="/how-to-guides" element={<HowToGuidesPage />} />
        <Route path="/casino-guide" element={<CasinoGuidePage />} />
        <Route path="/responsible-gaming" element={<ResponsibleGamingPage />} />
        <Route path="/security-tips" element={<SecurityTipsPage />} />
        <Route path="/payment-methods" element={<PaymentMethodsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
      </Routes>
    </div>
  );
}

export default App;