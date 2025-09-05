import React from 'react';
import { GameCard } from './GameCard';
import { motion } from 'framer-motion';

interface Game {
  label: string;
  image: string;
  route: string;
  description: string;
  category: string;
  rating?: number;
  players?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface GameGridProps {
  games: Array<{
  title?: string;
  searchTerm?: string;
}

export function GameGrid({ games, title = "Games", searchTerm = "" }: GameGridProps) {
  const filteredGames = games.filter(game => {
    game.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  });

  return (
    <div className="space-y-6">
      {title && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <span className="text-gray-400 text-sm">
            {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
          </span>
        </motion.div>
      )}

      {filteredGames.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-bold text-gray-400 mb-2">No games found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game, index) => (
            <div key={game.route} className="game-card">
              <GameCard
              title={game.label}
              description={game.description}
              image={game.image}
              route={game.route}
              category={game.category}
              rating={game.rating}
              players={game.players}
              isNew={game.isNew}
              isFeatured={game.isFeatured}
              index={index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}