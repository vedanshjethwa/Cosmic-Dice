import React, { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import { GameGrid } from '../GameGrid';

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
  const navigate = useNavigate();
  
  const newGames = [
    {
      label: 'Cosmic Cards',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/card',
      description: 'Pick your fortune card and win big rewards',
      category: 'Luck',
      isNew: true,
      rating: 4.8,
      players: '1.5K'
    },
    {
      label: 'Prediction Pulse',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/prediction-pulse',
      description: 'Time your predictions perfectly for maximum rewards',
      category: 'Timing',
      isNew: true,
      rating: 4.6,
      players: '980'
    },
    {
      label: 'Cosmic Limbo',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/limbo',
      description: 'How low can you go in this thrilling risk game',
      category: 'Risk',
      isNew: true,
      rating: 4.7,
      players: '1.2K'
    },
    {
      label: 'Cosmic Snakes',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=225',
      route: '/game/snakes',
      description: 'Navigate through the cosmic maze adventure',
      category: 'Adventure',
      isNew: true,
      rating: 4.5,
      players: '850'
    }
  ];

  const comingSoonGames = [
    {
      label: 'Cosmic Blackjack',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400&h=225',
      route: '#',
      description: 'Classic blackjack with a cosmic twist',
      category: 'Cards',
      rating: 0,
      players: 'Coming Soon'
    },
    {
      label: 'Cosmic Roulette',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=400&h=225',
      route: '#',
      description: 'Spin the cosmic wheel of fortune',
      category: 'Wheel',
      rating: 0,
      players: 'Coming Soon'
    }
  ];
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
      <GameGrid 
        games={newGames} 
        title="Recently Released"
      />

      {/* Coming Soon */}
      <div className="mt-12">
        <GameGrid 
          games={comingSoonGames} 
          title="Coming Soon"
        />
      </div>
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
