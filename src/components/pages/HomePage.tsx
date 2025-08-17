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
  ChevronLeft
} from 'lucide-react';

// Import components
import { SearchSystem } from '../SearchSystem';
import { WalletModal } from '../WalletModal';
import { RedeemModal } from '../RedeemModal';
import { ScratchCard } from '../ScratchCard';
import { FeedbackModal } from '../FeedbackModal';
import { GameCard } from '../GameCard';
import { StatsSection } from '../StatsSection';
import { Footer } from '../Footer';

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [scratchOpen, setScratchOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [currentGameSlide, setCurrentGameSlide] = useState(0);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setSearchOpen(true);
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
  }, []);

  const gamesPerSlide = 3;
  const totalSlides = Math.ceil(gameCards.length / gamesPerSlide);

  const nextSlide = () => {
    setCurrentGameSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentGameSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentGames = () => {
    const startIndex = currentGameSlide * gamesPerSlide;
    return gameCards.slice(startIndex, startIndex + gamesPerSlide);
  };

  return (
    <>
      {/* Main Content - No Sidebar on Homepage */}
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
        {/* Top Navigation */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-40 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20"
        >
          <div className="flex items-center justify-between p-4 lg:px-8">
            {/* Left side */}
            <div className="flex items-center gap-4">
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
                className="w-full bg-[#132F4C] text-gray-400 px-4 py-2 text-left flex items-center gap-3 hover:bg-[#1A243D] transition-colors border border-blue-500/20"
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
              
              <button
                onClick={() => setWalletOpen(true)}
                className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 transition-colors border border-blue-500/30 flex items-center gap-2"
              >
                <Wallet size={16} />
                <span className="font-medium">
                  ₹{((wallet?.real_balance || 0) + (wallet?.bonus_balance || 0)).toLocaleString()}
                </span>
              </button>

              {/* Notification Bell - Next to Profile */}
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
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Big Banner at Top */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="relative h-64 lg:h-80 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
                <img 
                  src="https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&q=80&w=1200&h=400" 
                  alt="Cosmic Gaming"
                  className="w-full h-full object-cover opacity-30"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                      Welcome to COSMIC777
                    </h2>
                    <p className="text-xl lg:text-2xl text-blue-200 mb-6">
                      Experience the Future of Gaming
                    </p>
                    <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/20 px-4 py-2 border border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
                      <span className="font-medium">24/7 Live Support Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* All Games Section with Navigation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">All Games ({gameCards.length})</h3>
                <button
                  onClick={() => navigate('/all-games')}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              
              {/* Game Cards with Navigation */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCurrentGames().map((game, index) => (
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

                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-blue-600/80 hover:bg-blue-600 text-white p-3 transition-colors z-10"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-blue-600/80 hover:bg-blue-600 text-white p-3 transition-colors z-10"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Slide Indicators */}
                <div className="flex justify-center mt-6 gap-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGameSlide(index)}
                      className={`w-3 h-3 transition-all ${
                        currentGameSlide === index ? 'bg-blue-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Footer under games section */}
              <Footer />
            </motion.section>

            {/* Stats/Graph Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <StatsSection />
            </motion.section>
          </div>
        </main>

        {/* Main Footer */}
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
    </>
  );
}