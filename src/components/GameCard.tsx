import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Play, Zap } from 'lucide-react';

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
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
      }}
      className="cosmic-game-card group cursor-pointer h-full flex flex-col"
      onClick={handlePlay}
    >
      {/* Image Container - Fixed Height */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Cosmic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 cosmic-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="cosmic-badge cosmic-badge-new"
            >
              <Zap size={12} />
              NEW
            </motion.span>
          )}
          {isFeatured && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="cosmic-badge cosmic-badge-featured"
            >
              <Star size={12} />
              FEATURED
            </motion.span>
          )}
        </div>

        {/* Stats overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className="cosmic-stat-pill">
            <Star size={10} className="text-yellow-400 fill-current" />
            <span>{rating}</span>
          </div>
          <div className="cosmic-stat-pill">
            <Users size={10} />
            <span>{players}</span>
          </div>
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="cosmic-play-button"
          >
            <Play size={20} className="ml-1" />
            Play Now
          </motion.div>
        </div>
      </div>

      {/* Content - Flexible Height */}
      <div className="p-4 flex flex-col flex-1 bg-gradient-to-b from-[#132F4C] to-[#0A1929] rounded-b-2xl">
        <div className="flex items-center justify-between mb-3">
          <span className="cosmic-category-tag">
            {category}
          </span>
        </div>

        <h3 className="cosmic-game-title group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          {title}
        </h3>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(route);
          }}
          className="cosmic-action-button mt-4"
        >
          <span className="relative z-10">Play Now</span>
        </button>
      </div>
    </motion.div>
  );
}