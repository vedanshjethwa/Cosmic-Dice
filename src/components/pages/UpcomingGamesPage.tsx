import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Star, Users, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';

export function UpcomingGamesPage() {
  const navigate = useNavigate();
  const [notifiedGames, setNotifiedGames] = useState<number[]>([]);

  const upcomingGames = [
    {
      id: 1,
      title: 'Cosmic Legends',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=225',
      releaseTime: '24:41',
      status: 'Coming Soon',
      players: '2.5K',
      rating: 4.8,
      description: 'Epic space adventure with legendary rewards',
      category: 'Adventure'
    },
    {
      id: 2,
      title: 'Dragon Quest',
      image: 'https://images.unsplash.com/photo-1642479755619-1e75b5cf2d0e?auto=format&fit=crop&q=80&w=400&h=225',
      releaseTime: '54:12',
      status: 'Under Development',
      players: '1.8K',
      rating: 4.5,
      description: 'Mythical dragon battles with cosmic powers',
      category: 'Fantasy'
    },
    {
      id: 3,
      title: 'Space Warriors',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=225',
      releaseTime: '3 Jul',
      status: 'Pre-Register',
      players: '3.2K',
      rating: 4.9,
      description: 'Intergalactic warfare in the cosmic realm',
      category: 'Action'
    },
    {
      id: 4,
      title: 'Cosmic Poker',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
      releaseTime: '15 Jul',
      status: 'Beta Testing',
      players: '1.2K',
      rating: 4.6,
      description: 'Classic poker with cosmic twists and multipliers',
      category: 'Strategy'
    },
    {
      id: 5,
      title: 'Nebula Rush',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      releaseTime: '1 Aug',
      status: 'Concept',
      players: '890',
      rating: 4.3,
      description: 'Fast-paced cosmic racing through nebula fields',
      category: 'Racing'
    },
    {
      id: 6,
      title: 'Stellar Slots',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400&h=225',
      releaseTime: '20 Aug',
      status: 'Planning',
      players: '2.1K',
      rating: 4.7,
      description: 'Revolutionary slot machine with cosmic themes',
      category: 'Slots'
    }
  ];

  const handleNotifyMe = (gameId: number) => {
    if (notifiedGames.includes(gameId)) {
      setNotifiedGames(prev => prev.filter(id => id !== gameId));
    } else {
      setNotifiedGames(prev => [...prev, gameId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Coming Soon':
        return 'bg-green-500/20 text-green-400';
      case 'Under Development':
        return 'bg-blue-500/20 text-blue-400';
      case 'Pre-Register':
        return 'bg-purple-500/20 text-purple-400';
      case 'Beta Testing':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Concept':
        return 'bg-gray-500/20 text-gray-400';
      case 'Planning':
        return 'bg-orange-500/20 text-orange-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Single Header */}
      <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
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
              Cosmic - Upcoming Games
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Upcoming Games
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover exciting new games coming to our platform. Be the first to play when they launch!
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
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium backdrop-blur-sm">
                    {game.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{game.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300">{game.rating}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {game.description}
                </p>

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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(game.status)}`}>
                      {game.status}
                    </span>
                  </div>
                </div>

                <button
                  className={`mt-6 w-full rounded-lg py-3 transition-colors flex items-center justify-center gap-2 font-medium ${
                    notifiedGames.includes(game.id)
                      ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  onClick={() => handleNotifyMe(game.id)}
                >
                  {notifiedGames.includes(game.id) ? (
                    <>
                      <Bell className="w-4 h-4" />
                      Notifications On
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      Notify Me
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter to get notified about new game releases, updates, and exclusive previews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}