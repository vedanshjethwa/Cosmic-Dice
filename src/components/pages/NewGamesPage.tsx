import React, { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';

const games = [
  {
    key: 'card',
    name: 'Card Game',
    importApp: () => import('../../../card/src/App'),
  },
  {
    key: 'dice',
    name: 'Dice Game',
    importApp: () => import('../../../dice/src/App'),
  },
  {
    key: 'limbo',
    name: 'Limbo Game',
    importApp: () => import('../../../limbo/src/App'),
  },
  {
    key: 'snakes',
    name: 'Snakes Game',
    importApp: () => import('../../../snakes/src/App'),
  },
];

export function NewGamesPage() {
  const newGames = games.map((game) => ({
    id: game.key,
    title: game.name,
    description: `Play the exciting ${game.name} now!`,
    image: `https://example.com/${game.key}.jpg`, // Placeholder image URL
    category: 'New',
    releaseDate: '2023-10-01',
    isNew: true,
  }));

   const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const selectedGameConfig = games.find((g) => g.key === selectedGame);
  const GameComponent = selectedGameConfig
    ? lazy(selectedGameConfig.importApp)
    : null;

  const handleBackToMenu = () => {
    setSelectedGame(null);
  };




  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      {
  !selectedGame && (
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
          Discover the latest additions to our gaming collection
        </p>
      </motion.div>

      {/* Recently Released */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6">Recently Released</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#132F4C] rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer"
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="relative h-48">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                {game.isNew && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    ✨ NEW
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#132F4C] to-transparent" />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{game.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{game.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-400 text-sm bg-blue-500/20 px-2 py-1 rounded-full">
                    {game.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(game.releaseDate)}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-colors">
                  Play Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}


{selectedGame && GameComponent && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 overflow-auto">
    <div className="w-full max-w-6xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button
        className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 z-50"
        onClick={handleBackToMenu}
      >
        ← Back to Menu
      </button>

      <Suspense fallback={<div className="text-center mt-32 text-2xl">Loading...</div>}>
        <div className="pt-12">
          <GameComponent />
        </div>
      </Suspense>
    </div>
  </div>
)}
    </div>
  );
}
