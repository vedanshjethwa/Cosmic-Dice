import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  Search,
  User,
  Star,
  Users,
  ChevronRight,
  Play,
  TrendingUp,
  Wallet,
  Bell,
  Headphones,
  Gamepad2,
  Menu,
  ArrowLeft,
  Gift,
  Home,
  BarChart3,
  FileText,
  Music,
  Settings,
  MessageCircle,
  ShoppingCart,
  TrendingDown,
  ChevronLeft
} from 'lucide-react';

// Import components
import { SearchSystem } from '../SearchSystem';
import { WalletModal } from '../WalletModal';
import { RedeemModal } from '../RedeemModal';
import { ScratchCard } from '../ScratchCard';
import { FeedbackModal } from '../FeedbackModal';
import { GameGrid } from '../GameGrid';
import { GameCard } from '../GameCard';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';
import { useChatStore } from '../ChatSupport/ChatStore';

// Game data with enhanced information
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

export function HomePage() {
  const navigate = useNavigate();
  const { user, wallet } = useAuth();
  const { setIsOpen: setChatOpen } = useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [scratchOpen, setScratchOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Games');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured offers data matching the screenshot
  const featuredOffers = [
    {
      id: 1,
      type: 'COSMIC',
      title: 'Get 10% free on your first recharge',
      description: 'New users get instant bonus',
      buttonText: 'Claim Now',
      color: 'from-blue-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&q=80&w=200&h=120'
    },
    {
      id: 2,
      type: 'SPECIAL',
      title: 'Earn 2x points this weekend',
      description: 'Double rewards on all games',
      buttonText: 'Claim Now',
      color: 'from-purple-600 to-purple-800',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=200&h=120'
    },
    {
      id: 3,
      type: 'LIMITED',
      title: 'Exclusive 50% off on all games',
      description: 'Limited time offer',
      buttonText: 'Claim Now',
      color: 'from-green-600 to-green-800',
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&q=80&w=200&h=120'
    },
    {
      id: 4,
      type: 'GIVEAWAY',
      title: 'Win a free game every week',
      description: 'Weekly giveaway for active players',
      buttonText: 'Claim Now',
      color: 'from-orange-600 to-orange-800',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=200&h=120'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredOffers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredOffers.length]);

  const sidebarItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Gamepad2 size={20} />, label: 'Games', path: '/all-games' },
    { icon: <Gift size={20} />, label: 'Bonuses', path: '/offers' },
    { icon: <FileText size={20} />, label: 'Files', path: '/files' },
    { icon: <Music size={20} />, label: 'Music', path: '/music' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <MessageCircle size={20} />, label: 'Chat', path: '/chat' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Games':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameCards.slice(0, 6).map((game, index) => (
              <motion.div
                key={game.route}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all cursor-pointer"
                onClick={() => navigate(game.route)}
              >
                <img
                  src={game.image}
                  alt={game.label}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2">{game.label}</h3>
                  <p className="text-gray-400 text-sm">{game.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'Bonuses':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                      {offer.type}
                    </span>
                    <h3 className="font-bold text-white mt-2 mb-1">{offer.title}</h3>
                    <p className="text-gray-400 text-sm">{offer.description}</p>
                  </div>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg mt-4 hover:from-blue-700 hover:to-purple-700 transition-all">
                  {offer.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        );
      case 'Affiliate':
        return (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h3 className="text-xl font-bold text-white mb-2">Affiliate Program</h3>
            <p className="text-gray-400 mb-6">Earn commissions by referring friends</p>
            <button 
              onClick={() => navigate('/affiliate-program')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Learn More
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a2332] text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-[#0f1419] border-r border-gray-700 z-50 flex flex-col items-center py-4">
        <div className="space-y-4">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16">
        {/* Header */}
        <header className="bg-[#1a2332] border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Cosmic
              </h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search games..."
                  className="bg-[#2a3441] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 w-64"
                  onClick={() => setSearchOpen(true)}
                />
              </div>

              {/* Notification Bell */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Cart/Coins */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  5
                </span>
              </button>

              {/* Profile */}
              <button 
                onClick={() => navigate('/profile')}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold"
              >
                <User size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-[#1a2332] border-b border-gray-700 px-6">
          <div className="flex gap-8">
            {['Games', 'Bonuses', 'Affiliate'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6">
          {/* Top Offer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredOffers.slice(0, 3).map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r ${offer.color} rounded-xl p-6 relative overflow-hidden`}
              >
                <div className="absolute top-3 left-3">
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {offer.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">{offer.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{offer.description}</p>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all">
                      {offer.buttonText}
                    </button>
                  </div>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-20 h-20 rounded-lg object-cover ml-4"
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <ChevronRight className="text-white/60" size={20} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gaming Activity Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-4">Gaming Activity</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-red-400 font-medium">Loss</span>
                  <TrendingDown className="text-red-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">$2,500</div>
                <div className="flex items-center gap-1 text-red-400 text-sm">
                  <TrendingDown size={16} />
                  <span>-5.2%</span>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-medium">Deposit</span>
                  <TrendingUp className="text-blue-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">$10,000</div>
                <div className="flex items-center gap-1 text-blue-400 text-sm">
                  <TrendingUp size={16} />
                  <span>+12.5%</span>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-medium">Profit</span>
                  <TrendingUp className="text-green-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">$3,750</div>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp size={16} />
                  <span>+8.3%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {renderTabContent()}
          </motion.div>

          {/* Featured Offers Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Featured Offers</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredOffers.length) % featuredOffers.length)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredOffers.length)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all"
                >
                  <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full inline-block mb-3">
                    {offer.type}
                  </div>
                  <h3 className="font-bold text-white mb-2 text-sm">{offer.title}</h3>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm hover:from-blue-700 hover:to-purple-700 transition-all">
                    {offer.buttonText}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredOffers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>

      {/* Modals */}
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
    </div>
  );
}