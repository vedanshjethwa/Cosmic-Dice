import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  User,
  Wallet,
  Gift,
  MessageCircle,
  Bell,
  Settings,
  X,
  Gamepad2,
  TrendingUp,
  Star,
  Sparkles,
  Clock,
  ArrowUpCircle,
  ArrowDownCircle,
  Headphones,
  Users,
  Award,
  DollarSign,
  Target,
  Zap,
  Trophy,
  History,
  ChevronRight,
  Home,
  Info,
  BookOpen,
  Shield,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Play,
  Eye,
  EyeOff,
  Copy,
  Upload,
  Edit2,
  LogOut,
  Moon,
  Sun,
  Lock,
  Mail,
  Smartphone,
  CreditCard,
  ExternalLink,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  HelpCircle,
  ArrowLeft,
  Plus,
  Minus,
} from 'lucide-react';

// Import components
import { Sidebar } from './components/Sidebar';
import { SearchSystem } from './components/SearchSystem';
import { WalletModal } from './components/WalletModal';
import { RedeemModal } from './components/RedeemModal';
import { ScratchCard } from './components/ScratchCard';
import { FeedbackModal } from './components/FeedbackModal';
import { ChatWindow } from './components/ChatSupport/ChatWindow';
import { ChatButton } from './components/ChatSupport/ChatButton';
import { GuidanceSystem } from './components/GuidanceSystem';
import { LoadingScreen } from './components/LoadingScreen';
import { GameLayout } from './components/GameLayout';
import { GameGrid } from './components/GameGrid';
import { StatsSection } from './components/StatsSection';
import { AffiliateSection } from './components/AffiliateSection';
import { BonusSection } from './components/BonusSection';
import { ProfilePage } from './components/ProfilePage';
import { WithdrawalPage } from './components/WithdrawalPage';
import { Footer } from './components/Footer';

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
import { VaultGuidePage } from './components/pages/VaultGuidePage';
import { BettingGuidePage } from './components/pages/BettingGuidePage';
import { HowToGuidesPage } from './components/pages/HowToGuidesPage';
import { CasinoGuidePage } from './components/pages/CasinoGuidePage';
import { ResponsibleGamingPage } from './components/pages/ResponsibleGamingPage';
import { SecurityTipsPage } from './components/pages/SecurityTipsPage';
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

// Import border component
import { Border } from './border/Border';

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

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [scratchOpen, setScratchOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState<string>('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showProfile, setShowProfile] = useState(false);
  const [balance, setBalance] = useState(5000);

  // User behavior tracking for guidance system
  const [userBehavior, setUserBehavior] = useState({
    consecutiveLosses: 0,
    totalBetAmount: 0,
    sessionTime: 0,
    lastBetAmount: 0,
    averageBetSize: 0,
  });

  const gameContext = {
    currentGame: location.pathname.includes('/game/') ? location.pathname.split('/')[2] : undefined,
    isPlaying: location.pathname.includes('/game/'),
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
        setChatOpen(false);
        setShowHowToPlay(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Handle game navigation
  const handleGameClick = (route: string) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(route);
      setIsLoading(false);
    }, 500);
  };

  // Handle auth
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setShowAuth(false);
      setIsLoading(false);
    }, 2000);
  };

  // Filter games based on search and category
  const filteredGames = gameCards.filter(game => {
    const matchesSearch = game.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Strategy', 'Luck', 'Risk', 'Adventure', 'Timing'];

  // Featured games for carousel
  const featuredGames = gameCards.filter(game => game.isFeatured || game.isNew);

  if (isLoading) {
    return <LoadingScreen message="Preparing your cosmic experience..." />;
  }

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
      <Routes>
        {/* Main App Route */}
        <Route path="/" element={
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
                      onClick={() => setShowProfile(true)}
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
                  {/* Hero Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 lg:mb-12"
                  >
                    <motion.h2
                      className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      Welcome to the Cosmic Universe
                    </motion.h2>
                    <motion.p
                      className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Experience the future of gaming with our collection of original, 
                      fair, and exciting cosmic games
                    </motion.p>
                  </motion.div>

                  {/* Featured Games Carousel */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
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
                    
                    <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 scroll-smooth featured-offers-scroll">
                      {featuredGames.map((game, index) => (
                        <motion.div
                          key={game.route}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          className="flex-shrink-0 w-72 lg:w-80 bg-[#132F4C] rounded-xl overflow-hidden cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 carousel-item"
                          onClick={() => handleGameClick(game.route)}
                        >
                          <div className="relative h-40 lg:h-48">
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
                            <div className="absolute top-3 right-3 flex items-center gap-3 text-xs text-white">
                              <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                                <Star size={12} className="text-yellow-400 fill-current" />
                                <span>{game.rating}</span>
                              </div>
                              <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                                <Users size={12} />
                                <span>{game.players}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 lg:p-6">
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
                  </motion.section>

                  {/* Quick Stats */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
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

                  {/* Game Categories and Search */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
                      <h3 className="text-xl lg:text-2xl font-bold text-white">All Games</h3>
                      
                      {/* Category Filter */}
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 lg:px-4 py-2 rounded-lg transition-colors capitalize text-sm lg:text-base ${
                              selectedCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-[#132F4C] text-gray-400 hover:text-white hover:bg-blue-600/20 border border-blue-500/20'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Search Input (Mobile) */}
                    <div className="md:hidden mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Search games..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-[#132F4C] rounded-lg pl-10 pr-4 py-3 focus:outline-none border-2 border-transparent focus:border-blue-400/50 text-white"
                        />
                      </div>
                    </div>

                    <GameGrid games={filteredGames} searchTerm={searchTerm} />
                  </motion.section>

                  {/* Additional Sections */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    {/* Stats Section */}
                    <div className="xl:col-span-2">
                      <StatsSection />
                    </div>

                    {/* Sidebar Content */}
                    <div className="space-y-6 lg:space-y-8">
                      <AffiliateSection />
                      <BonusSection />
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

            <ChatWindow
              isOpen={chatOpen}
              onClose={() => setChatOpen(false)}
            />

            <HowToPlayModal
              isOpen={showHowToPlay}
              onClose={() => setShowHowToPlay(false)}
              gameType={selectedGameType}
            />

            {showProfile && (
              <ProfilePage onExit={() => setShowProfile(false)} />
            )}

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

        {/* Guide Routes */}
        <Route path="/vault-guide" element={<VaultGuidePage />} />
        <Route path="/betting-guide" element={<BettingGuidePage />} />
        <Route path="/how-to-guides" element={<HowToGuidesPage />} />
        <Route path="/casino-guide" element={<CasinoGuidePage />} />
        <Route path="/responsible-gaming" element={<ResponsibleGamingPage />} />
        <Route path="/security-tips" element={<SecurityTipsPage />} />
      </Routes>
    </div>
  );
}

export default App;