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
      className="game-card-consistent relative overflow-hidden group cursor-pointer"
      onClick={handlePlay}
    >
      {/* Image Container */}
      <div className="relative h-48 lg:h-52 overflow-hidden flex-shrink-0" style={{ borderRadius: '12px 12px 0 0' }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold shadow-lg" style={{ borderRadius: '12px' }}>
              NEW
            </span>
          )}
          {isFeatured && (
            <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold shadow-lg" style={{ borderRadius: '12px' }}>
              FEATURED
            </span>
          )}
        </div>

        {/* Play button overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 font-semibold flex items-center gap-2 transition-all" style={{ borderRadius: '12px' }}>
            <Play size={20} />
            Play Now
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="card-content">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-400 bg-blue-500/20 px-3 py-1 font-medium border border-blue-500/30" style={{ borderRadius: '12px' }}>
            {category}
          </span>
          <div className="flex items-center gap-3 text-xs" style={{ color: '#9ca3af' }}>
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

        <h3 className="font-bold text-lg lg:text-xl group-hover:text-blue-400 transition-all" style={{ color: '#ffffff', marginBottom: '16px' }}>
          {title}
        </h3>
        
        <p className="text-sm mb-4 flex-1" style={{ color: '#d1d5db', marginBottom: '20px' }}>
          {description}
        </p>
        
        <div className="mt-auto">
          <button
            onClick={handlePlay}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            style={{ borderRadius: '12px', minWidth: '120px' }}
          >
            Play Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}