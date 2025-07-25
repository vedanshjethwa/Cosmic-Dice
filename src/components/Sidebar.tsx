import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Gamepad,
  Gift,
  Settings,
  Info,
  Wallet,
  History,
  MessageCircle,
  Menu,
  TrendingUp,
  Headphones,
  X,
  Clock,
  Calendar,
  Star,
  Users,
  Sparkles,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PopularPage } from './pages/PopularPage';
import NewGamesPage from './pages/NewGamesPage';
import { AboutPage } from './pages/AboutPage';
import { OffersPage } from './pages/OffersPage';
import { Footer } from './Footer';
import FeedbackPage from './FeedbackPage';

// UpcomingGames component
const UpcomingGames = () => {
  const [setSelectedGame] = useState<string | null>(null);

  const upcomingGames = [
    {
      id: 1,
      title: 'Cyber Legends',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      releaseTime: '24:41',
      status: 'Coming Soon',
      players: '2.5K',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Dragon Quest',
      image:
        'https://images.unsplash.com/photo-1642479755619-1e75b5cf2d0e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      releaseTime: '54:12',
      status: 'Under Development',
      players: '1.8K',
      rating: 4.5,
    },
    {
      id: 3,
      title: 'Space Warriors',
      image:
        'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3',
      releaseTime: '3 Jul',
      status: 'Pre-Register',
      players: '3.2K',
      rating: 4.9,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto p-6 text-white"
    >
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Upcoming Games
        </h1>
        <p className="text-gray-400 text-lg">
          Discover exciting new games coming to our platform
        </p>
      </motion.div>

      {/* Games Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {upcomingGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#132F4C] rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-colors"
          >
            <div className="relative h-48">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{game.title}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-gray-300">{game.rating}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>Release in {game.releaseTime}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{game.players} Interested</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {game.status}
                  </span>
                </div>
              </div>

              <button
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-colors flex items-center justify-center gap-2"
                onClick={() => game.title}
              >
                <Calendar className="w-4 h-4" />
                Notify Me
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletClick: () => void;
  onWithdrawalClick: () => void;
  onDepositClick: () => void;
  currentPath: string;
}

export function Sidebar({
  isOpen,
  onClose,
  onWalletClick,
  onWithdrawalClick,
  onDepositClick,
  currentPath,
}: SidebarProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<{
    label: string;
    content: React.ReactNode;
  } | null>(null);

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: 'Home',
      path: '/',
      onClick: () => navigate('/'),
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Popular',
      path: '/popular',
      content: <PopularPage />,
    },
    {
      icon: <Gift size={20} />,
      label: 'Offers',
      path: '/offers',
      content: <OffersPage />,
    },
    {
      icon: <Clock size={20} />,
      label: 'Upcoming Games',
      path: '/upcoming',
      content: <UpcomingGames />,
    },
    {
      icon: <Wallet size={20} />,
      label: 'Wallet',
      path: '/wallet',
      onClick: onWalletClick,
      className: 'text-blue-400 hover:text-blue-300',
    },
    {
      icon: <ArrowUpCircle size={20} />,
      label: 'Deposit',
      path: '/deposit',
      onClick: onDepositClick,
      className: 'text-green-400 hover:text-green-300',
    },
    {
      icon: <ArrowDownCircle size={20} />,
      label: 'Withdrawal',
      path: '/withdrawal',
      className: 'text-purple-400 hover:text-purple-300',
      onClick: () => navigate('/withdrawal'),
    },
    {
      icon: <Headphones size={20} />,
      label: 'Live Support',
      path: '/support',
    },
    {
      icon: <Sparkles size={20} />,
      label: 'New Games',
      path: '/new-games',
      content: <NewGamesPage />,
    },
    {
      icon: <Gamepad size={20} />,
      label: 'All Games',
      path: '/all-games',
      onClick: () => navigate('/'),
    },
    {
      icon: <History size={20} />,
      label: 'Transactions',
      path: '/transactions',
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'Feedback',
      path: '/feedback',
      content: <FeedbackPage />,
    },
    {
      icon: <Settings size={20} />,
      label: 'Settings',
      path: '/settings',
    },
    {
      icon: <Info size={20} />,
      label: 'About',
      path: '/about',
      content: <AboutPage />,
    },
  ];

  const handleItemClick = (item: any) => {
    if (item.onClick) {
      item.onClick();
      return; // Return early to prevent setting currentPage for onClick items
    }

    if (item.content) {
      setCurrentPage({
        label: item.label,
        content: item.content,
      });
    } else {
      setCurrentPage({
        label: item.label,
        content: (
          <div className="mx-auto p-6 text-white">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {item.label}
            </h2>
            <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
              <p className="text-gray-300 text-lg mb-4">
                Welcome to the {item.label} section.
              </p>
              <p className="text-gray-400">
                This page is currently under development. Check back soon for
                exciting new features and content!
              </p>
            </div>
          </div>
        ),
      });
    }

    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleBackToHome = () => {
    setCurrentPage(null);
    navigate('/');
  };
  const isActivePage = (item: any) => {
    if (currentPage && currentPage.label === item.label) return true;
    if (item.path && currentPath === item.path) return true;
    return false;
  };
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#0A1929] shadow-lg z-50 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-64 rounded-r-2xl' : 'w-0 lg:w-16 hover:w-64 rounded-r-lg'
        } border-r border-blue-500/20`}
      >
        {/* Header */}
        <div className="p-4 border-b border-blue-900/30 flex items-center">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? 'block' : 'hidden lg:block'
          } p-4 overflow-y-auto h-[calc(100vh-60px)] custom-scrollbar`}
        >
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all whitespace-nowrap group w-full ${
                    isActivePage(item)
                      ? 'bg-blue-600 text-white'
                      : `text-gray-300 hover:bg-blue-900/30 hover:text-white ${item.className || ''}`
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {/* Active indicator */}
                  {isActivePage(item) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r-full" />
                  )}
                  <span className="min-w-[24px] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span
                    className={`${
                      isOpen || window.innerWidth >= 1024
                        ? 'opacity-100'
                        : 'opacity-0'
                    } transition-opacity`}
                  >
                    {item.label}
                  </span>
                  {/* Badge for active page */}
                  {isActivePage(item) && (
                    <div className="ml-auto w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Page Content */}
      <AnimatePresence>
        {currentPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A1929] z-40 overflow-auto"
          >
            <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
              <div className="flex justify-between items-center p-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBackToHome}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h2 className="text-2xl font-bold text-white">
                    {currentPage.label}
                  </h2>
                </div>
                <button
                  onClick={handleBackToHome}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="pb-8 max-w-6xl mx-auto">
              {currentPage.content}            
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Custom Scrollbar CSS */
const style = document.createElement('style');
style.innerHTML = `
  .custom-scrollbar {
    direction: rtl;
  }

  .custom-scrollbar > * {
    direction: ltr;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 5px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #3b82f6, #1e3a8a);
    border-radius: 10px;
  }

  .custom-scrollbar: it-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #2563eb, #1e40af);
  }
`;
document.head.appendChild(style);
