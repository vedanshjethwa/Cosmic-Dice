import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Star, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { GameGrid } from '../GameGrid';

const NewGamesPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const newGames = [
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
      label: 'Cosmic Heads & Tails',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/toss',
      description: 'Classic coin flip with cosmic rewards',
      category: 'Luck',
      players: '2.3K',
      rating: 4.7,
      isNew: true,
    },
    {
      label: 'Cosmic Minesweeper',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/minesweeper',
      description: 'Navigate the cosmic minefield with precision',
      category: 'Strategy',
      players: '1.5K',
      rating: 4.4,
      isNew: true,
    },
    {
      label: 'Prediction Pulse',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/prediction-pulse',
      description: 'Time your predictions perfectly for maximum rewards',
      category: 'Timing',
      players: '1.7K',
      rating: 4.6,
      isNew: true,
    },
    {
      label: 'Cosmic Minesweeper',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/minesweeper',
      description: 'Navigate the cosmic minefield with precision',
      category: 'Strategy',
      players: '1.5K',
      rating: 4.4,
      isNew: true,
    },
    {
      label: 'Cosmic Cards',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/card',
      description: 'Pick your fortune card and reveal cosmic rewards',
      category: 'Luck',
      players: '1.7K',
      rating: 4.5,
      isNew: true,
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
      isNew: true,
    },
    {
      label: 'Cosmic RPS',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/rps',
      description: 'Rock Paper Scissors with cosmic twists and strategic gameplay',
      category: 'Strategy',
      players: '2.5K',
      rating: 4.8,
      isNew: true,
    },
  ];

  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // Desktop
      if (window.innerWidth >= 768) return 2;  // Tablet
      return 1; // Mobile
    }
    return 3;
  };

  const [itemsPerSlide, setItemsPerSlide] = React.useState(getItemsPerSlide);

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(newGames.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentGames = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return newGames.slice(startIndex, startIndex + itemsPerSlide);
  };

  const upcomingFeatures = [
    {
      title: 'Multiplayer Tournaments',
      description: 'Compete against other players in real-time tournaments',
      eta: 'Coming Soon',
      icon: '🏆'
    },
    {
      title: 'Daily Challenges',
      description: 'Complete daily challenges for exclusive rewards',
      eta: 'Next Update',
      icon: '🎯'
    },
    {
      title: 'Cosmic Leaderboards',
      description: 'Climb the ranks and earn prestigious titles',
      eta: 'In Development',
      icon: '👑'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            New Games
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Discover the latest additions to our cosmic gaming universe
        </p>
      </motion.div>

      {/* New Games Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 relative"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recently Added Games</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 bg-[#132F4C] hover:bg-blue-600/20 rounded-lg border border-blue-500/20 transition-colors"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-5 h-5 text-blue-400" />
            </button>
            <span className="text-gray-400 text-sm px-3">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              onClick={nextSlide}
              className="p-2 bg-[#132F4C] hover:bg-blue-600/20 rounded-lg border border-blue-500/20 transition-colors"
              disabled={currentSlide === totalSlides - 1}
            >
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </button>
          </div>
        </div>
        
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0"
              >
                <div className={`grid gap-6 ${
                  itemsPerSlide === 3 ? 'grid-cols-3' :
                  itemsPerSlide === 2 ? 'grid-cols-2' : 'grid-cols-1'
                }`}>
                  {newGames
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((game, index) => (
                      <motion.div
                        key={game.route}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="bg-[#132F4C] rounded-xl overflow-hidden group cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                        onClick={() => navigate(game.route)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={game.image}
                            alt={game.label}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] to-transparent" />
                          {game.isNew && (
                            <div className="absolute top-3 left-3">
                              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                NEW
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full font-medium">
                              {game.category}
                            </span>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <Star size={12} className="text-yellow-400 fill-current" />
                                <span>{game.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users size={12} />
                                <span>{game.players}</span>
                              </div>
                            </div>
                          </div>
                          <h3 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {game.label}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {game.description}
                          </p>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(game.route);
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium"
                          >
                            Play Now
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Upcoming Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-purple-400" />
          Coming Soon
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-[#132F4C] rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                  {feature.eta}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};

export default NewGamesPage;