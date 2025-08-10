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
      whileHover={{ scale: 1.03, y: -8 }}
      className="card-hover-effect premium-game-card bg-gradient-to-br from-[#132F4C] to-[#0A1929] rounded-2xl overflow-hidden group cursor-pointer border border-blue-500/20 hover:border-blue-400/50 transition-all duration-400 shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 flex flex-col h-full"
      onClick={handlePlay}
    >
      {/* Image Container - Fixed Height */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 bg-gradient-to-t from-[#132F4C]/50 to-transparent">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-115 group-hover:brightness-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse border border-white/20">
              NEW
            </span>
          )}
          {isFeatured && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold rounded-full shadow-lg border border-white/20">
              FEATURED
            </span>
          )}
        </div>

        {/* Stats overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-white">
          <div className="flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <Star size={10} className="text-yellow-400 fill-current" />
            <span className="font-medium">{rating}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <Users size={10} />
            <span className="font-medium">{players}</span>
          </div>
        </div>

        {/* Play button overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-2xl border border-white/20"
          >
            <Play size={20} />
            <span className="text-lg">Play Now</span>
          </motion.div>
        </div>
      </div>

      {/* Content - Flexible Height */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1.5 rounded-full font-semibold border border-blue-500/30 tracking-wide">
            {category}
          </span>
        </div>

        <h3 className="text-heading-3 text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-body-small text-gray-400 mb-6 line-clamp-2 flex-grow leading-relaxed">
          {description}
        </p>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(route);
          }}
          className="btn-hover-effect w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold cosmic-button mt-auto shadow-lg hover:shadow-blue-500/40 border border-blue-500/20 hover:border-blue-400/40"
        >
          <span className="text-base">Play Now</span>
        </button>
      </div>
    </motion.div>
  );
}