import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  route: string;
  category: string;
  image: string;
  type: 'game' | 'page' | 'feature';
  isNew?: boolean;
  isFeatured?: boolean;
}

interface SearchSystemProps {
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
}

export function SearchSystem({ isOpen, onClose, placeholder = "Search games..." }: SearchSystemProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const allSearchableItems: SearchResult[] = [
    {
      id: 'cosmic-rps',
      title: 'Cosmic RPS',
      description: 'Rock Paper Scissors with cosmic twists',
      route: '/game/rps',
      category: 'Strategy',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=225',
      type: 'game',
      isFeatured: true,
    },
    {
      id: 'cosmic-dice',
      title: 'Cosmic Dice',
      description: 'Roll the dice and win big',
      route: '/game/dice',
      category: 'Luck',
      image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?auto=format&fit=crop&q=80&w=400&h=225',
      type: 'game',
      isFeatured: true,
    },
    {
      id: 'cosmic-limbo',
      title: 'Cosmic Limbo',
      description: 'How low can you go?',
      route: '/game/limbo',
      category: 'Risk',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=225',
      type: 'game',
    },
    {
      id: 'cosmic-snakes',
      title: 'Cosmic Snakes',
      description: 'Navigate through the cosmic maze',
      route: '/game/snakes',
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=225',
      type: 'game',
    },
    {
      id: 'cosmic-cards',
      title: 'Cosmic Cards',
      description: 'Pick your fortune card',
      route: '/game/card',
      category: 'Luck',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
      type: 'game',
    },
    {
      id: 'prediction-pulse',
      title: 'Prediction Pulse',
      description: 'Time your predictions perfectly',
      route: '/game/prediction-pulse',
      category: 'Timing',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      type: 'game',
    },
    {
      id: 'cosmic-balloon',
      title: 'Cosmic Balloon',
      description: 'Pop balloons for cosmic rewards',
      route: '/game/balloon',
      category: 'Luck',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
      type: 'game',
      isNew: true,
    },
    {
      id: 'cosmic-minesweeper',
      title: 'Cosmic Minesweeper',
      description: 'Navigate the cosmic minefield',
      route: '/game/minesweeper',
      category: 'Strategy',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      type: 'game',
      isNew: true,
    },
    {
      id: 'cosmic-heads-tails',
      title: 'Cosmic Heads & Tails',
      description: 'Classic coin flip with cosmic rewards',
      route: '/game/toss',
      category: 'Luck',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400&h=225',
      type: 'game',
      isNew: true,
    },
    // Add pages and features
    {
      id: 'profile',
      title: 'Profile',
      description: 'Manage your account and view statistics',
      route: '/profile',
      category: 'Account',
      image: '',
      type: 'page',
    },
    {
      id: 'withdrawal',
      title: 'Withdrawal',
      description: 'Withdraw your winnings',
      route: '/withdrawal',
      category: 'Banking',
      image: '',
      type: 'page',
    },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const filteredResults = allSearchableItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches
    setRecentSearches(prev => {
      const updated = [result.title, ...prev.filter(item => item !== result.title)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });

    navigate(result.route);
    onClose();
    setQuery('');
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="bg-[#0A1929] rounded-2xl w-full max-w-2xl mx-4 border border-blue-500/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-blue-500/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-[#132F4C] text-white rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500/20"
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Searching...</p>
            </div>
          ) : query.trim() === '' ? (
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                      <Clock size={16} />
                      Recent Searches
                    </h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="block w-full text-left px-3 py-2 text-gray-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                  <TrendingUp size={16} />
                  Popular Games
                </h3>
                <div className="space-y-2">
                  {allSearchableItems.filter(item => item.isFeatured).slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleResultClick(item)}
                      className="flex items-center gap-3 w-full p-3 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="text-left">
                        <div className="text-white font-medium">{item.title}</div>
                        <div className="text-gray-400 text-sm">{item.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4 space-y-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="flex items-center gap-3 w-full p-3 hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  {result.image && (
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{result.title}</span>
                      {result.isNew && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          NEW
                        </span>
                      )}
                      {result.isFeatured && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm">{result.description}</div>
                    <div className="text-blue-400 text-xs">{result.category}</div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-400 mb-2">No results found</p>
              <p className="text-gray-500 text-sm">Try searching for games, features, or pages</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}