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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="premium-game-card bg-gradient-to-br from-[#132F4C] to-[#0A1929] rounded-2xl overflow-hidden group cursor-pointer border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col h-full"
      onClick={handlePlay}
    >
      {/* Image Container - Fixed Height */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent opacity-80" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
              NEW
            </span>
          )}
          {isFeatured && (
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold rounded-full shadow-lg">
              FEATURED
            </span>
          )}
        </div>

        {/* Stats overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-white">
          <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
            <Star size={10} className="text-yellow-400 fill-current" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
            <Users size={10} />
            <span>{players}</span>
          </div>
        </div>

        {/* Play button overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
            <Play size={20} />
            Play Now
          </div>
        </div>
      </div>

      {/* Content - Flexible Height */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-full font-medium border border-blue-500/30">
            {category}
          </span>
        </div>

        <h3 className="font-bold text-white mb-2 text-lg group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          Premium gaming experience with cosmic rewards
        </p>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(route);
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all font-medium cosmic-button mt-auto shadow-lg hover:shadow-blue-500/30 transform hover:scale-105"
        >
          Play Now
        </button>
      </div>
    </motion.div>
  );
}