import React from 'react';
import { useState } from 'react';
import { ArrowLeft, Star, Clock, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export default function NewGamesPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const newGames = [
    {
      label: 'Cosmic Balloon',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/balloon',
      description: 'Pop balloons for cosmic rewards',
      category: 'Luck',
      isNew: true,
      releaseDate: '2 days ago'
    },
    {
      label: 'Prediction Pulse',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/prediction-pulse',
      description: 'Time your predictions perfectly',
      category: 'Timing',
      isNew: true,
      releaseDate: '1 week ago'
    },
    {
      label: 'Cosmic Minesweeper',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/minesweeper',
      description: 'Navigate the cosmic minefield',
      category: 'Strategy',
      isNew: true,
      releaseDate: '2 weeks ago'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/new-games"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
      {/* Single Header */}
      <div className="sticky top-0 z-10 bg-[#1E293B]/95 backdrop-blur-sm border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 transition-colors"
            >
              <Menu size={24} />
            </button>
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 transition-colors flex items-center gap-2"
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
              Cosmic - New Games
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold text-high-contrast">New Games</h1>
        </div>

        <div className="mb-8">
          <p className="text-readable-secondary text-lg section-padding">
            Discover our latest cosmic gaming experiences! These games have been recently added to our platform.
          </p>
        </div>

        {/* New Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr prevent-overflow">
          {newGames.map((game, index) => (
            <GameCard
              key={index}
              title={game.label}
              description={game.description}
              image={game.image}
              route={game.route}
              category={game.category}
              rating={4.5}
              players="New"
              isNew={game.isNew}
              isFeatured={false}
              index={index}
            />
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-high-contrast mb-6">Coming Soon</h2>
          <div className="card-cosmic text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-high-contrast mb-2">More Games on the Way!</h3>
            <p className="text-readable-secondary">
              We're constantly working on new and exciting games. Stay tuned for more cosmic adventures!
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
    </div>
  );
}