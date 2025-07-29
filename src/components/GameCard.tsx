import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users } from 'lucide-react';

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
      className={`relative bg-[#0A1929] rounded-xl overflow-hidden group cursor-pointer border transition-all duration-300 ${
        isFeatured 
          ? 'border-yellow-500/30 shadow-lg shadow-yellow-500/10' 
          : 'border-blue-900/10 hover:border-blue-500/20'
      }`}
      onClick={handlePlay}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              NEW
            </span>
          )}
          {isFeatured && (
            <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
              FEATURED
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full font-medium">
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

        <h3 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium">
          Play Now
        </button>
      </div>
    </motion.div>
  );
}