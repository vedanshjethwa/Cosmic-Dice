import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameLayoutProps {
  gameType: 'rps' | 'dice' | 'limbo' | 'snakes' | 'card' | 'prediction-pulse' | 'balloon' | 'minesweeper' | 'toss';
}

// Lazy load game components
const gameComponents = {
  rps: lazy(() => import('../../rps/src/App')),
  dice: lazy(() => import('../../dice/src/App')),
  limbo: lazy(() => import('../../limbo/src/App')),
  snakes: lazy(() => import('../../snakes/src/App')),
  card: lazy(() => import('../../card/src/App')),
  'prediction-pulse': lazy(() => import('../../prediction-pulse/src/App')),
  balloon: lazy(() => import('../../game bollon/src/App')),
  minesweeper: lazy(() => import('../../minesweeper/src/App')),
  toss: lazy(() => import('../../toss game/src/App')),
};

const gameInfo = {
  rps: {
    title: 'Cosmic RPS',
    description: 'Rock Paper Scissors with cosmic twists',
    color: 'from-purple-600 to-pink-600'
  },
  dice: {
    title: 'Cosmic Dice',
    description: 'Roll the dice and win big',
    color: 'from-blue-600 to-cyan-600'
  },
  limbo: {
    title: 'Cosmic Limbo',
    description: 'How low can you go?',
    color: 'from-green-600 to-emerald-600'
  },
  snakes: {
    title: 'Cosmic Snakes',
    description: 'Navigate through the cosmic maze',
    color: 'from-red-600 to-orange-600'
  },
  card: {
    title: 'Cosmic Cards',
    description: 'Pick your fortune card',
    color: 'from-yellow-600 to-amber-600'
  },
  'prediction-pulse': {
    title: 'Prediction Pulse',
    description: 'Time your predictions perfectly',
    color: 'from-indigo-600 to-purple-600'
  },
  balloon: {
    title: 'Cosmic Balloon',
    description: 'Pop balloons for cosmic rewards',
    color: 'from-pink-600 to-rose-600'
  },
  minesweeper: {
    title: 'Cosmic Minesweeper',
    description: 'Navigate the cosmic minefield',
    color: 'from-gray-600 to-slate-600'
  },
  toss: {
    title: 'Cosmic Heads & Tails',
    description: 'Classic coin flip with cosmic rewards',
    color: 'from-amber-600 to-yellow-600'
  }
};

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#0A1929] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-white mb-2">Loading Game...</h2>
        <p className="text-gray-400">Preparing your cosmic experience</p>
      </div>
    </div>
  );
}

function GameHeader({ gameType, onBack, onHome }: { 
  gameType: keyof typeof gameInfo; 
  onBack: () => void; 
  onHome: () => void; 
}) {
  const info = gameInfo[gameType];
  
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <div>
              <h1 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${info.color} bg-clip-text text-transparent`}>
                {info.title}
              </h1>
              <p className="text-gray-400 text-sm hidden sm:block">
                {info.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onHome}
              className="flex items-center gap-2 px-3 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 rounded-lg transition-colors"
            >
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export function GameLayout({ gameType }: GameLayoutProps) {
  const navigate = useNavigate();
  const GameComponent = gameComponents[gameType];

  const handleBack = () => {
    navigate(-1); // Go back to previous page instead of always going to home
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A1929]">
      <GameHeader 
        gameType={gameType} 
        onBack={handleBack} 
        onHome={handleHome} 
      />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <div className="game-container">
            <GameComponent />
          </div>
        </Suspense>
      </motion.main>
    </div>
  );
}