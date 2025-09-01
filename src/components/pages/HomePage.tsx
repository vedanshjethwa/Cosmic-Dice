import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar } from '../Sidebar';
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
  ChevronLeft,
  Headphones,
  Menu,
  Gamepad2
} from 'lucide-react';

// Import components
import { SearchSystem } from '../SearchSystem';
import { WalletModal } from '../WalletModal';
import { RedeemModal } from '../RedeemModal';
import { ScratchCard } from '../ScratchCard';
import { FeedbackModal } from '../FeedbackModal';
import { GameGrid } from '../GameGrid';
import { StatsSection } from '../StatsSection';
import { Footer } from '../Footer';
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

interface HomePageProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function HomePage({ sidebarOpen, setSidebarOpen }: HomePageProps) {
  const navigate = useNavigate();
  const { user, wallet } = useAuth();
  const { setIsOpen: setChatOpen } = useChatStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [scratchOpen, setScratchOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <>
        {/* Top Navigation */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-40 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20 rounded-b-xl"
        >
          <div className="flex items-center justify-between p-4 lg:px-8">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
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
                className="w-full bg-[#132F4C] text-gray-400 px-4 py-2 text-left flex items-center gap-3 hover:bg-[#1A243D] transition-colors border border-blue-500/20 rounded-xl"
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
                onClick={() => setWalletOpen(true)}
                className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 border border-blue-500/30 flex items-center gap-2 rounded-xl"
              >
                <Wallet size={16} />
                <span className="font-medium">
                  ₹{((wallet?.real_balance || 0) + (wallet?.bonus_balance || 0)).toLocaleString()}
                </span>
              </button>

              <button
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-white/10 transition-colors"
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Big Banner Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="relative h-80 lg:h-96 overflow-hidden shadow-2xl rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1200&h=400"
                  alt="Cosmic Gaming"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-start p-8">
                  <div className="text-white max-w-lg">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">Welcome to Cosmic Gaming</h2>
                    <p className="text-xl mb-6 text-gray-200">Experience the future of online gaming with our cosmic collection</p>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 border border-green-500/30">
                        <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
                        <span className="text-green-400 font-medium">24/7 Live Support</span>
                        <Headphones size={16} className="text-green-400" />
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/all-games')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                    >
                      Start Playing
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* All Games Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                  <Gamepad2 className="text-blue-400" />
                  All Games ({filteredGames.length})
                </h3>
                <button
                  onClick={() => navigate('/all-games')}
                  className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 border border-blue-500/30 flex items-center gap-2 rounded-xl"
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              
              {/* Category Filters */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2 games-scroll">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 font-medium whitespace-nowrap transition-all shadow-lg rounded-xl ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/30'
                        : 'bg-[#132F4C] text-gray-300 hover:bg-blue-600/20 border border-blue-500/20'
                    }`}
                  >
                    {category === 'all' ? 'All Games' : category}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
                {filteredGames.slice(0, 8).map((game, index) => (
                  <EnhancedGameCard key={game.route} game={game} index={index} />
                ))}
              </div>
              
              {/* Section Footer */}
              <div className="mt-8 pt-6 border-t border-blue-500/20">
                <div className="text-center text-gray-400 text-sm">
                  <p>Explore our complete collection of cosmic gaming experiences</p>
                </div>
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
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
                {featuredGames.map((game, index) => (
                  <EnhancedGameCard key={game.route} game={game} index={index} />
                ))}
              </div>
              
              {/* Section Footer */}
              <div className="mt-8 pt-6 border-t border-blue-500/20">
                <div className="text-center text-gray-400 text-sm">
                  <p>Featured games showcase our latest and most innovative experiences</p>
                </div>
              </div>
            </motion.section>

            {/* Popular Games Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-blue-400" />
                  Popular Games
                </h3>
                <button
                  onClick={() => navigate('/popular')}
                  className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 border border-blue-500/30 flex items-center gap-2 rounded-xl"
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
                {popularGames.slice(0, 4).map((game, index) => (
                  <EnhancedGameCard key={game.route} game={game} index={index} />
                ))}
              </div>
              
              {/* Section Footer */}
              <div className="mt-8 pt-6 border-t border-blue-500/20">
                <div className="text-center text-gray-400 text-sm">
                  <p>Popular games are updated based on player activity and ratings</p>
                </div>
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
                <div className="bg-gradient-to-br from-[#132F4C] to-[#0A1929] p-4 lg:p-6 border border-blue-500/20 text-center shadow-lg hover:shadow-blue-500/20 transition-all rounded-2xl">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">9</div>
                  <div className="text-gray-400 text-sm lg:text-base">Total Games</div>
                </div>
                <div className="bg-gradient-to-br from-[#132F4C] to-[#0A1929] p-4 lg:p-6 border border-green-500/20 text-center shadow-lg hover:shadow-green-500/20 transition-all rounded-2xl">
                  <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-2">15K+</div>
                  <div className="text-gray-400 text-sm lg:text-base">Active Players</div>
                </div>
                <div className="bg-gradient-to-br from-[#132F4C] to-[#0A1929] p-4 lg:p-6 border border-purple-500/20 text-center shadow-lg hover:shadow-purple-500/20 transition-all rounded-2xl">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-2">₹2.1M+</div>
                  <div className="text-gray-400 text-sm lg:text-base">Total Winnings</div>
                </div>
                <div className="bg-gradient-to-br from-[#132F4C] to-[#0A1929] p-4 lg:p-6 border border-yellow-500/20 text-center shadow-lg hover:shadow-yellow-500/20 transition-all rounded-2xl">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">98.5%</div>
                  <div className="text-gray-400 text-sm lg:text-base">Average RTP</div>
                </div>
              </div>
            </motion.section>
          </div>
        </main>

        {/* Footer */}
        <Footer />

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
    </>
  );
}

// Enhanced Game Card Component with premium styling
function EnhancedGameCard({ game, index }: { game: any; index: number }) {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-gradient-to-br from-[#132F4C] to-[#0A1929] overflow-hidden cursor-pointer border-2 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group game-card-arcade shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col rounded-2xl"
      onClick={() => navigate(game.route)}
    >
      <div className="relative h-40 lg:h-48">
        <img
          src={game.image}
          alt={game.label}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent opacity-80" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {game.isNew && (
            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold animate-pulse shadow-lg rounded-full">
              NEW
            </span>
          )}
          {game.isFeatured && (
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold shadow-lg rounded-full">
              FEATURED
            </span>
          )}
        </div>

        {/* Stats overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-white">
          <div className="flex items-center gap-1 bg-black/50 px-2 py-1 backdrop-blur-sm">
            <Star size={10} className="text-yellow-400 fill-current" />
            <span>{game.rating}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/50 px-2 py-1 backdrop-blur-sm">
            <Users size={10} />
            <span>{game.players}</span>
          </div>
        </div>

        {/* Play button overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform">
            <Play size={20} />
            Play Now
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-full font-medium border border-blue-500/30">
            {game.category}
          </span>
        </div>

        <h4 className="font-bold text-white mb-2 text-lg group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {game.label}
        </h4>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(game.route);
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium cosmic-button mt-auto shadow-lg hover:shadow-blue-500/30 transform hover:scale-105"
        >
          Play Now
        </button>
      </div>
    </motion.div>
  );
}