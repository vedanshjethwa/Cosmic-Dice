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
  Menu
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gameCarouselIndex, setGameCarouselIndex] = useState(0);

  // Featured offers data matching the screenshot
  const featuredOffers = [
    {
      id: 1,
      type: 'COSMIC',
      title: 'Get 10% free on your first recharge',
      buttonText: 'Claim Now',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      type: 'SPECIAL',
      title: 'Earn 2x points this weekend',
      buttonText: 'Claim Now',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 3,
      type: 'LIMITED',
      title: 'Exclusive 50% off on all games',
      buttonText: 'Claim Now',
      color: 'from-green-600 to-green-800'
    },
    {
      id: 4,
      type: 'GIVEAWAY',
      title: 'Win a free game every week',
      buttonText: 'Claim Now',
      color: 'from-orange-600 to-orange-800'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredOffers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredOffers.length]);
  const allCategories = ['all', 'Strategy', 'Luck', 'Risk', 'Adventure', 'Timing'];

  // Filter games based on category
  const filteredGames = gameCards.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesCategory;
  });

  // Featured games for carousel
  const featuredGames = gameCards.filter(game => game.isFeatured || game.isNew);
  const popularGames = gameCards.filter(game => game.isFeatured);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredGames.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredGames.length / 4)) % Math.ceil(filteredGames.length / 4));
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Navigation */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-40 bg-[#1E293B]/95 backdrop-blur-sm border-b border-blue-500/20"
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
                className="w-full bg-[#334155] text-gray-400 px-4 py-2 rounded-lg text-left flex items-center gap-3 hover:bg-[#475569] transition-colors border border-blue-500/20"
              >
                <Search size={20} />
                <span>Search games...</span>
                <div className="ml-auto flex gap-1">
                  <kbd className="px-2 py-1 bg-gray-700 text-xs">⌘</kbd>
                  <kbd className="px-2 py-1 bg-gray-700 text-xs">K</kbd>
                </div>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 lg:gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-white/10 transition-colors md:hidden"
              >
                <Search size={20} />
              </button>
              
              {/* Notification Bell */}
              <button className="relative p-2 hover:bg-white/10 transition-colors">
                <Bell size={20} className="text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <button
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-white/10 transition-colors"
              >
                <User size={20} />
              </button>
              
              <button
                onClick={() => setWalletOpen(true)}
                className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30 flex items-center gap-2"
              >
                <Wallet size={16} />
                <span className="font-medium">
                  ₹{((wallet?.real_balance || 0) + (wallet?.bonus_balance || 0)).toLocaleString()}
                </span>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center gap-3 mb-8">
              <ArrowLeft className="w-6 h-6 text-blue-400" />
              <h1 className="text-2xl font-bold text-high-contrast">Dashboard</h1>
            </div>

            {/* Featured Offers Banner - Matching Screenshot */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="offer-banner">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-high-contrast">Featured Offers</h2>
                  <button 
                    onClick={() => navigate('/offers')}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 link-hover"
                  >
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                {/* Responsive Carousel Container */}
                <div className="relative overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredOffers.map((offer, index) => (
                      <motion.div
                        key={offer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`offer-card bg-gradient-to-br ${offer.color} relative overflow-hidden group hover-lift`}
                      >
                        {/* Offer Type Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold border border-white/30">
                            {offer.type}
                          </span>
                        </div>
                        
                        {/* Offer Image */}
                        <div className="absolute top-4 right-4">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <Gift className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10 mt-12">
                          <h3 className="text-lg font-bold text-white mb-3 text-shadow">
                            {offer.title}
                          </h3>
                          <button className="offer-button w-full">
                            {offer.buttonText}
                          </button>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* All Games Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-high-contrast flex items-center gap-2">
                  <Gamepad2 className="text-blue-400" />
                  All Games ({filteredGames.length})
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGameCarouselIndex(Math.max(0, gameCarouselIndex - 1))}
                      disabled={gameCarouselIndex === 0}
                      className="p-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover-lift min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setGameCarouselIndex(Math.min(Math.ceil(filteredGames.length / 4) - 1, gameCarouselIndex + 1))}
                      disabled={gameCarouselIndex >= Math.ceil(filteredGames.length / 4) - 1}
                      className="p-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover-lift min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                      →
                    </button>
                  </div>
                  <button
                    onClick={() => navigate('/all-games')}
                    className="btn-primary flex items-center gap-2"
                  >
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              {/* Category Filters */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2 games-scroll prevent-overflow">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all shadow-lg border min-h-[44px] hover-lift ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/30 border-blue-400 text-high-contrast'
                        : 'bg-[#102841] text-medium-contrast hover:bg-blue-600/20 border-blue-500/20 hover:text-white'
                    }`}
                  >
                    {category === 'all' ? 'All Games' : category}
                  </button>
                ))}
              </div>
              
              {/* Carousel Container */}
              <div className="relative overflow-hidden prevent-overflow">
                <div 
                  className="flex transition-transform duration-500 ease-in-out gap-6"
                  style={{ transform: `translateX(-${gameCarouselIndex * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(filteredGames.length / 4) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                      {filteredGames.slice(slideIndex * 4, (slideIndex + 1) * 4).map((game, index) => (
                        <GameCard
                          key={game.route}
                          title={game.label}
                          description={game.description}
                          image={game.image}
                          route={game.route}
                          category={game.category}
                          rating={game.rating}
                          players={game.players}
                          isNew={game.isNew}
                          isFeatured={game.isFeatured}
                          index={index}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Featured Games Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-high-contrast flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  Featured Games
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                {featuredGames.map((game, index) => (
                  <GameCard
                    key={game.route}
                    title={game.label}
                    description={game.description}
                    image={game.image}
                    route={game.route}
                    category={game.category}
                    rating={game.rating}
                    players={game.players}
                    isNew={game.isNew}
                    isFeatured={game.isFeatured}
                    index={index}
                  />
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-high-contrast flex items-center gap-2">
                  <TrendingUp className="text-blue-400" />
                  Popular Games
                </h3>
                <button
                  onClick={() => navigate('/popular')}
                  className="btn-primary flex items-center gap-2"
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              </motion.section>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                {popularGames.slice(0, 4).map((game, index) => (
                  <GameCard
                    key={game.route}
                    title={game.label}
                    description={game.description}
                    image={game.image}
                    route={game.route}
                    category={game.category}
                    rating={game.rating}
                    players={game.players}
                    isNew={game.isNew}
                    isFeatured={game.isFeatured}
                    index={index}
                  />
                ))}
              </div>

            {/* Quick Stats */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 lg:mb-12"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 prevent-overflow">
                <div className="card-cosmic text-center hover-lift">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">9</div>
                  <div className="text-readable-secondary text-sm lg:text-base">Total Games</div>
                </div>
                <div className="card-cosmic text-center hover-lift">
                  <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-2">15K+</div>
                  <div className="text-readable-secondary text-sm lg:text-base">Active Players</div>
                </div>
                <div className="card-cosmic text-center hover-lift">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-2">₹2.1M+</div>
                  <div className="text-readable-secondary text-sm lg:text-base">Total Winnings</div>
                </div>
                <div className="card-cosmic text-center hover-lift">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">98.5%</div>
                  <div className="text-readable-secondary text-sm lg:text-base">Average RTP</div>
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
    </div>
  );
}