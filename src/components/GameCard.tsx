import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Play } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  route: string;
  category: string;
  rating?: number;
  players?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  index?: number;
}

export function GameCard({
  title,
  description,
  image,
  route,
  category,
  rating = 4.5,
  players = '1.2K',
  isNew = false,
  isFeatured = false,
  index = 0
}: GameCardProps) {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(route);
  };

  const handleShowDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    const gameId = route.split('/').pop();
    navigate(`/game-detail/${gameId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`cosmic-card relative overflow-hidden group cursor-pointer border-2 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col ${
        isFeatured 
          ? 'border-yellow-500/50 hover:border-yellow-400/70 hover:shadow-yellow-500/30' 
          : ''
      }`}
      onClick={handlePlay}
    >
      {/* Image Container */}
      <div className="relative h-40 lg:h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-2xl"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-80" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold animate-pulse shadow-lg">
              NEW
            </span>
          )}
          {isFeatured && (
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold shadow-lg">
              FEATURED
            </span>
          )}
        </div>

        {/* Play button overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="cosmic-button text-white px-6 py-3 font-bold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
            <Play size={20} />
            Play Now
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-full font-medium border border-blue-500/30">
            {category}
          </span>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{players}</span>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 flex-1">
          {description}
        </p>
        <div className="flex gap-2">
          <button 
            onClick={handlePlay}
            className="flex-1 cosmic-button text-white py-3 transition-all font-medium shadow-lg hover:shadow-blue-500/30 transform hover:scale-105 mt-auto"
          >
            Play Now
          </button>
          {(isNew || isFeatured) && (
            <button
              onClick={handleShowDetails}
              className="px-4 py-3 bg-[#475569]/20 hover:bg-[#475569]/30 text-gray-300 transition-colors text-sm border border-gray-500/30"
            >
              Info
            </button>
          )}
        </div>
      </div>

      {/* Game Footer */}
      <div className="px-4 pb-4">
        <div className="border-t border-blue-500/20 pt-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Min Bet: ₹1</span>
            <span>Max Win: ₹100K</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}