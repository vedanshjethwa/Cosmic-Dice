import React, { useState, Suspense, lazy, useRef, useEffect } from 'react';
import { Search, Wallet, Bell, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { RedeemModal } from './components/RedeemModal';
import { WalletModal } from './components/WalletModal';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { StatsSection } from './components/StatsSection';
import { BonusSection } from './components/BonusSection';
import { AffiliateSection } from './components/AffiliateSection';
import { ProfilePage } from './components/ProfilePage';
import { WithdrawalPage } from './components/WithdrawalPage';
import { ChatButton } from './components/ChatSupport/ChatButton';
import { ChatWindow } from './components/ChatSupport/ChatWindow';
import { motion } from 'framer-motion';
// Game config: add new games here
const games = [
  {
    key: 'card',
    name: 'Card Game',
    importApp: () => import('../card/src/App'),
  },
  {
    key: 'dice',
    name: 'Dice Game',
    importApp: () => import('../dice/src/App'),
  },
  {
    key: 'limbo',
    name: 'Limbo Game',
    importApp: () => import('../limbo/src/App'),
  },
  {
    key: 'snakes',
    name: 'Snakes Game',
    importApp: () => import('../snakes/src/App'),
  },
];

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
 const [isNavSidebarOpen, setNavSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isRedeemModalOpen, setRedeemModalOpen] = useState(false);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    'games' | 'bonus' | 'affiliate' | 'profile' | 'withdrawal'
  >('games');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNavSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavSidebarOpen]);

  const gameCards = [
    {
      label: 'Cosmic RPS',
      image:
        'https://via.placeholder.com/400x225/1E4976/FFFFFF?text=Cosmic+RPS',
      href: 'https://adorable-sunshine-4ba7ea.netlify.app',
      height: '300px',
      width: '100%',
    },
    {
      label: 'Dishonored',
      image:
        'https://via.placeholder.com/400x225/1E4976/FFFFFF?text=Dishonored',
      href: 'https://store.steampowered.com/app/205100/Dishonored/',
      height: '300px',
      width: '100%',
    },
    {
      label: 'Elden Ring',
      image:
        'https://via.placeholder.com/400x225/1E4976/FFFFFF?text=Elden+Ring',
      href: 'https://en.bandainamcoent.eu/elden-ring/elden-ring',
      height: '300px',
      width: '100%',
    },
    {
      label: 'Cyberpunk 2077',
      image:
        'https://via.placeholder.com/400x225/1E4976/FFFFFF?text=Cyberpunk+2077',
      href: 'timely-kheer-d47684.netlify.app',
      height: '300px',
      width: '100%',
    },
    {
      label: 'Red Dead II',
      image:
        'https://via.placeholder.com/400x225/1E4976/FFFFFF?text=Red+Dead+II',
      href: 'https://timely-kheer-d47684.netlify.app/',
      height: '300px',
      width: '100%',
    },
    {
      label: 'The Last of Us',
      image:
        'https://via.placeholder.com/400x225/1E4976/FFFFFF?text=The+Last+of+Us',
      href: 'https://www.playstation.com/en-us/games/the-last-of-us-part-i/',
      height: '300px',
      width: '100%',
    },
    {
      label: 'God of War',
      image:
        'https://via.placeholder.com/400x225/1E4976/FFFFFF?text=God+of+War',
      href: 'https://cosmic7777908634.netlify.app/',
      height: '300px',
      width: '100%',
    },
    {
      label: 'Horizon Zero Dawn',
      image:
        'https://via.placeholder.com/400x225/1E4976/FFFFFF?text=Horizon+Zero+Dawn',
      href: 'timely-kheer-d47684.netlify.app/',
      height: '300px',
      width: '100%',
    },
    {
      label: "Assassin's Creed Valhalla",
      image:
        'https://via.placeholder.com/400x225/1E4976/FFFFFF?text=Assassin%27s+Creed+Valhalla',
      href: 'https://www.ubisoft.com/en-us/game/assassins-creed/valhalla',
      height: '300px',
      width: '100%',
    },
  ];
  const selectedGameConfig = games.find((g) => g.key === selectedGame);
  const GameComponent = selectedGameConfig
    ? lazy(selectedGameConfig.importApp)
    : null;

  const handleBackToMenu = () => {
    setSelectedGame(null);
  };
  const [searchTerm, setSearchTerm] = useState('');

  // ...existing code...

  // Filter gameCards based on searchTerm
  const filteredGameCards = gameCards.filter(card =>
    card.label.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

  const offers = [
    {
      title: 'Get 10% free on your first recharge',
      image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/crown.png',
      tag: 'COSMIC',
    },
    {
      title: 'Earn 2x points this weekend',
      image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/crown.png',
      tag: 'SPECIAL',
    },
    {
      title: 'Exclusive 50% off on all games',
      image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/discount.png',
      tag: 'LIMITED',
    },
    {
      title: 'Win a free game every week',
      image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/gift.png',
      tag: 'GIVEAWAY',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A1929] text-white p-4">
      <Sidebar
        isOpen={isNavSidebarOpen}
        onClose={() => setNavSidebarOpen(false)}
        onWalletClick={() => setWalletModalOpen(true)}
        onWithdrawalClick={() => setActiveSection('withdrawal')}
      />

      <div
        className={`transition-all duration-300 ease-in-out ${
          isNavSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
        }`}
      >
        {activeSection === 'withdrawal' ? (
          <WithdrawalPage />
        ) : activeSection === 'profile' ? (
          <ProfilePage onExit={() => setActiveSection('games')} />
        ) : (
          <div className="max-w-7xl mx-auto bg-[#132F4C] rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
              <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                <button
                  className="text-white p-2 hover:bg-blue-900/30 rounded-full transition-colors lg:hidden"
                  onClick={() => setNavSidebarOpen(true)}
                  aria-label="Toggle navigation menu"
                >
                  <Menu size={25} />
                </button>
                <h1
                  className="text-xl sm:text-2xl lg:text-3xl font-bold"
                  style={{
                     fontFamily: "'Orbitron', sans-serif"
                    }}
                >
                  Cosmic
                </h1>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative hidden sm:flex flex-1">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                      searchFocused ? 'text-blue-400' : 'text-gray-400'
                    }`}
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search games..."
                    className={`bg-[#0A1929] rounded-lg pl-10 pr-4 py-2.5 w-[200px] lg:w-[300px] focus:outline-none border-2 transition-colors duration-200 ${
                      searchFocused
                        ? 'border-blue-400/50 bg-[#0A1929]/80'
                        : 'border-transparent'
                    }`}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
                <button
                  onClick={() => setWalletModalOpen(true)}
                  className="relative hover:text-blue-400 transition-colors"
                >
                  <Wallet size={24} />
                  <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    2
                  </span>
                </button>
                <div className="relative">
                  <Bell size={24} />
                  <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    1
                  </span>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40"
                    alt="Profile"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-blue-400/30 cursor-pointer"
                    onClick={() => setActiveSection('profile')}
                  />
                </div>
              </div>
            </div>

            <div className="sm:hidden relative mb-4">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                  searchFocused ? 'text-blue-400' : 'text-gray-400'
                }`}
                size={20}
              />
              <input
                type="text"
                placeholder="Search games..."
                className={`w-full bg-[#0A1929] rounded-lg pl-10 pr-4 py-2.5 focus:outline-none border-2 transition-colors duration-200 ${
                  searchFocused
                    ? 'border-blue-400/50 bg-[#0A1929]/80'
                    : 'border-transparent'
                }`}
                onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        
              />
            </div>

            <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <div className="relative">
                      <div className="flex overflow-x-auto scroll-smooth snap-x gap-3 sm:gap-6 mb-6 sm:mb-8" style={{ scrollbarWidth: 'none' }}>
                        {offers.map((offer, index) => (
                          <div
                            key={index}
                            className="bg-[#1E4976] rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-blue-900/20 hover:border-blue-400/30 transition-colors snap-start flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                          >
                            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                              <div className="flex-1 text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 sm:mb-3">
                                  <div className="bg-blue-900/30 text-blue-200 px-2 sm:px-3 py-1 rounded-lg text-xs font-medium border border-blue-500/20">
                                    {offer.tag}
                                  </div>
                                </div>
                                <h2 className="text-sm sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-blue-50">
                                  {offer.title}
                                </h2>
                                <button className="bg-blue-900/40 text-blue-100 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-blue-900/60 transition-colors font-medium text-xs sm:text-sm border border-blue-500/20">
                                  Claim Now
                                </button>
                              </div>
                              <div className="w-20 sm:w-32 lg:w-40">
                                <img
                                  src={offer.image}
                                  alt="Offer"
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveSection('games')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'games'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Games
              </button>
              <button
                onClick={() => setActiveSection('bonus')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'bonus'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Bonuses
              </button>
              <button
                onClick={() => setActiveSection('affiliate')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'affiliate'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Affiliate
              </button>
            </div>

            {activeSection === 'games' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredGameCards.map((game, index) => (
                      <div
                        key={index}
                        className="bg-[#0A1929] rounded-xl p-4 relative overflow-hidden group cursor-pointer border border-blue-900/10 hover:border-blue-500/20 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                            <img
                              src={game.image}
                              alt={game.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => (window.location.href = game.href)}
                            className="bg-[#1E1E1E] text-white px-6 py-3 rounded-lg hover:bg-[#2E2E2E] transition-colors w-full max-w-[200px] h-[50px] flex items-center justify-center"
                          >
                            Play {game.label}
                          </button>
                          <h3 className="font-bold text-center mt-4">
                            {game.label}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <StatsSection />
              </div>
            )}

            {activeSection === 'bonus' && <BonusSection />}
            {activeSection === 'affiliate' && <AffiliateSection />}
          </div>
        )}

        <Footer />
      </div>

      <RedeemModal
        isOpen={isRedeemModalOpen}
        onClose={() => setRedeemModalOpen(false)}
      />
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

      <ChatButton />
      <ChatWindow />
    </div>
  );
}

export default App;