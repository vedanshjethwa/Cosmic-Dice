import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GameGrid from './components/GameGrid';
import GameControls from './components/GameControls';
import StatusBar from './components/StatusBar';
import GameHistory from './components/GameHistory';
import { useGameStore } from './store/gameStore';

function App() {
  const { balance } = useGameStore();
  const [showHelp, setShowHelp] = useState(false);

  const handleBackClick = () => {
    console.log('Back clicked');
  };

  const handleHelpClick = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#1a2332] to-[#0B0F1A] text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-[#00C3FF] via-white to-[#00C3FF] bg-clip-text text-transparent drop-shadow-2xl">
              🐍 COSMIC SNAKES
            </span>
          </h1>
          <p className="text-slate-300 text-xl font-medium tracking-wide">
            Roll the dice, move forward, avoid the snakes, multiply your winnings!
          </p>
          <div className="mt-4 text-sm text-[#00C3FF] font-semibold tracking-wider">
            DICE-BASED MOVEMENT • CHOOSE YOUR RISK LEVEL • CASH OUT ANYTIME
          </div>
        </motion.div>

        <StatusBar />
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Controls */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <GameControls />
          </div>
          
          {/* Game Grid */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <GameGrid />
          </div>
          
          {/* Game History */}
          <div className="lg:col-span-1 order-3">
            <GameHistory />
          </div>
        </div>

        {/* Help Modal */}
        {showHelp && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-[#0B0F1A] to-[#1a2332] border-2 border-[#00C3FF] rounded-3xl p-8 max-w-2xl w-full shadow-2xl shadow-[#00C3FF]/20"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-[#00C3FF] mb-6 text-center">How to Play</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl mb-3">🎯</div>
                  <div className="font-bold text-white mb-2">1. Set Your Bet</div>
                  <div className="text-slate-300">Choose your bet amount and number of snakes</div>
                </div>
                <div>
                  <div className="text-4xl mb-3">🎲</div>
                  <div className="font-bold text-white mb-2">2. Roll & Move</div>
                  <div className="text-slate-300">Roll dice to move 1-3 steps forward on the path</div>
                </div>
                <div>
                  <div className="text-4xl mb-3">💰</div>
                  <div className="font-bold text-white mb-2">3. Cash Out</div>
                  <div className="text-slate-300">Secure your winnings anytime or risk it for more</div>
                </div>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-6 w-full bg-gradient-to-r from-[#00C3FF] to-[#0080ff] text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[#00C3FF]/30 transition-all"
              >
                Got It!
              </button>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-gradient-to-br from-[#1a2332]/50 to-[#0B0F1A]/50 backdrop-blur-sm rounded-3xl p-8 border border-[#00C3FF]/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-[#00C3FF] mb-6">Game Features</h3>
            <div className="grid md:grid-cols-3 gap-6 text-slate-300">
              <div className="text-center">
                <div className="text-3xl mb-3">🎲</div>
                <div className="font-bold text-white mb-2">Dice-Based Movement</div>
                <div>Roll 1-3 steps forward with animated dice</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🐍</div>
                <div className="font-bold text-white mb-2">Fixed Snake Positions</div>
                <div>Strategic snake placement for controlled risk</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">💎</div>
                <div className="font-bold text-white mb-2">Progressive Multipliers</div>
                <div>Higher rewards for passing more snakes</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;