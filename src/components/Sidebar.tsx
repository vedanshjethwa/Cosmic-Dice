import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  ChevronRight,
  Calculator,
  Bell,
  Shield,
  BookOpen,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from './ChatSupport/ChatStore';
import { useAuth } from '../contexts/AuthContext';

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
  const location = useLocation();
  const { setIsOpen: setChatOpen } = useChatStore();
  const { wallet } = useAuth();

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: 'Home',
      path: '/',
      onClick: () => navigate('/'),
    },
    {
      icon: <Bell size={20} />,
      label: 'Notifications',
      path: '/notifications',
      onClick: () => navigate('/notifications'),
    },
    {
      icon: <Gift size={20} />,
      label: 'Offers',
      path: '/offers',
      onClick: () => navigate('/offers'),
    },
    {
      icon: <Clock size={20} />,
      label: 'Upcoming Games',
      path: '/upcoming',
      onClick: () => navigate('/upcoming'),
    },
    {
      icon: <TrendingUp size={20} />,
      label: 'Popular',
      path: '/popular',
      onClick: () => navigate('/popular'),
    },
    {
      icon: <Gamepad size={20} />,
      label: 'All Games',
      path: '/all-games',
      onClick: () => navigate('/all-games'),
    },
    {
      icon: <Sparkles size={20} />,
      label: 'New Games',
      path: '/new-games',
      onClick: () => navigate('/new-games'),
    },
    {
      icon: <Wallet size={20} />,
      label: 'Wallet',
      path: '/wallet',
      onClick: () => navigate('/wallet'),
      className: 'text-blue-400 hover:text-blue-300',
    },
    {
      icon: <ArrowUpCircle size={20} />,
      label: 'Deposit',
      path: '/deposit',
      onClick: () => navigate('/deposit'),
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
      icon: <History size={20} />,
      label: 'Transactions',
      path: '/transactions',
      onClick: () => navigate('/transactions'),
    },
    {
      icon: <HelpCircle size={20} />,
      label: 'Help Center',
      path: '/how-to-guides',
      onClick: () => navigate('/how-to-guides'),
    },
    {
      icon: <Shield size={20} />,
      label: 'Self Exclusion',
      path: '/responsible-gaming',
      onClick: () => navigate('/responsible-gaming'),
    },
    {
      icon: <CreditCard size={20} />,
      label: 'Payment Info',
      path: '/payment-methods',
      onClick: () => navigate('/payment-methods'),
    },
    {
      icon: <BookOpen size={20} />,
      label: 'Guides',
      path: '/casino-guide',
      onClick: () => navigate('/casino-guide'),
    },
    {
      icon: <Settings size={20} />,
      label: 'Settings',
      path: '/settings',
      onClick: () => navigate('/settings'),
    },
    {
      icon: <Info size={20} />,
      label: 'About',
      path: '/about',
      onClick: () => navigate('/about'),
    },
    {
      icon: <Headphones size={20} />,
      label: 'Live Support',
      path: '/support',
      onClick: () => setChatOpen(true),
      className: 'text-green-400 hover:text-green-300',
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'Feedback',
      path: '/feedback',
      onClick: () => navigate('/feedback'),
    },
    {
      icon: <Calculator size={20} />,
      label: 'Calculator',
      path: '/calculator',
      onClick: () => navigate('/calculator'),
    },
  ];

  const isActivePage = (item: any) => {
    return currentPath === item.path || location.pathname === item.path;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#0F172A] border-r border-blue-500/30 shadow-2xl z-50 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-64' : 'w-0 lg:w-16'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-blue-500/30 flex items-center justify-center bg-[#1E293B]">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center"
          >
            <Menu size={24} className="text-white" />
          </button>
        </div>

        {/* Wallet Display */}
        <div className={`p-4 border-b border-blue-500/20 ${isOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Wallet size={20} className="text-blue-400" />
              <span className={`text-xs text-gray-400 ${isOpen ? 'block' : 'hidden lg:hidden'}`}>Balance</span>
            </div>
            <div className={`text-lg font-bold text-blue-400 ${isOpen ? 'block' : 'hidden'}`}>
              ₹{((wallet?.real_balance || 0) + (wallet?.bonus_balance || 0)).toLocaleString()}
            </div>
            {!isOpen && (
              <div className="hidden lg:block text-center">
                <div className="text-xs text-blue-400 font-bold">₹100</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav
          className="p-4 overflow-y-auto h-[calc(100vh-160px)] custom-scrollbar-left"
          style={{ direction: 'rtl' }}
        >
          <ul className="space-y-3" style={{ direction: 'ltr' }}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all whitespace-nowrap group w-full border border-transparent hover:border-blue-500/30 hover:bg-blue-500/10 ${
                    isActivePage(item)
                      ? 'bg-blue-500/20 text-white border-blue-500/50'
                      : `text-gray-300 hover:bg-blue-900/30 hover:text-white ${item.className || ''}`
                  }`}
                  onClick={() => {
                    item.onClick();
                  }}
                >
                  <span className="min-w-[24px] h-[24px] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span
                    className={`transition-opacity ${
                      isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
                    } transition-opacity`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}