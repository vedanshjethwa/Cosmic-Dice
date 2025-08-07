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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from './ChatSupport/ChatStore';

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
      onClick: () => navigate('/popular'),
    },
    {
      icon: <Gamepad size={20} />,
      label: 'All Games',
      path: '/all-games',
      onClick: () => navigate('/all-games'),
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#0A1929] shadow-lg z-50 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-64' : 'w-0 lg:w-16 hover:w-64'
        } border-r border-blue-500/20`}
      >
        {/* Header */}
        <div className="p-3 lg:p-4 border-b border-blue-900/30 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h2 
            className={`text-xl font-bold text-white transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
            }`}
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            COSMIC
          </h2>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? 'block' : 'hidden lg:block'
          } p-2 lg:p-4 overflow-y-auto h-[calc(100vh-60px)] custom-scrollbar`}
        >
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all whitespace-nowrap group w-full ${
                    isActivePage(item)
                      ? 'bg-blue-600 text-white relative border-l-4 border-blue-300'
                      : `text-gray-300 hover:bg-blue-900/30 hover:text-white ${item.className || ''}`
                  }`}
                  onClick={() => {
                    item.onClick();
                    if (window.innerWidth < 1024) onClose();
                  }}
                >
                  {/* Active indicator */}
                  {isActivePage(item) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r-full animate-pulse" />
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
                  {/* Arrow icon */}
                  <ChevronRight 
                    className={`w-4 h-4 transition-all duration-200 ${
                      isOpen || window.innerWidth >= 1024
                        ? 'opacity-100'
                        : 'opacity-0'
                    } ${
                      isActivePage(item) 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-white'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}