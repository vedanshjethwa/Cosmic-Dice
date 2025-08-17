import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, TrendingDown, MapPin } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const GameHistory: React.FC = () => {
  const { gameHistory } = useGameStore();

  if (gameHistory.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Games
        </h3>
        <div className="text-center text-slate-400 py-8">
          <div className="text-4xl mb-2">🎮</div>
          <p>No games played yet</p>
          <p className="text-sm">Your game history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Recent Games
      </h3>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {gameHistory.map((game, index) => (
          <motion.div
            key={game.id}
            className={`p-3 rounded-lg border ${
              game.result === 'win' 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {game.result === 'win' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <div>
                  <div className="text-sm font-medium text-white">
                    {game.result === 'win' ? 'Win' : 'Loss'}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Position {game.finalPosition}/25
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  ${game.bet.toFixed(2)}
                </div>
                {game.result === 'win' && (
                  <div className="text-xs text-green-400">
                    {game.multiplier.toFixed(2)}x → ${game.payout.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-600">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-slate-400">Total Games</div>
            <div className="font-bold text-white">{gameHistory.length}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Win Rate</div>
            <div className="font-bold text-green-400">
              {gameHistory.length > 0 
                ? `${Math.round((gameHistory.filter(g => g.result === 'win').length / gameHistory.length) * 100)}%`
                : '0%'
              }
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameHistory;