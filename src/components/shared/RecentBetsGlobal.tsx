import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, TrendingUp, TrendingDown, Gamepad2 } from 'lucide-react';

interface GlobalBet {
  id: string;
  game: string;
  amount: number;
  result: 'win' | 'loss';
  profit: number;
  timestamp: number;
  multiplier?: number;
}

export function RecentBetsGlobal() {
  const [globalBets, setGlobalBets] = useState<GlobalBet[]>([]);

  useEffect(() => {
    // Load global bets from localStorage
    const savedBets = localStorage.getItem('cosmic_global_bets');
    if (savedBets) {
      setGlobalBets(JSON.parse(savedBets));
    }

    // Listen for new bets from any game
    const handleNewBet = (event: CustomEvent) => {
      const newBet: GlobalBet = {
        id: Date.now().toString(),
        game: event.detail.game,
        amount: event.detail.amount,
        result: event.detail.result,
        profit: event.detail.profit,
        timestamp: Date.now(),
        multiplier: event.detail.multiplier
      };

      setGlobalBets(prev => {
        const updated = [newBet, ...prev].slice(0, 20); // Keep last 20 bets
        localStorage.setItem('cosmic_global_bets', JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener('cosmic-bet-placed', handleNewBet as EventListener);
    return () => {
      window.removeEventListener('cosmic-bet-placed', handleNewBet as EventListener);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#132F4C] rounded-xl p-6 border-2 border-blue-500/30 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <History className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">All Games - Recent Bets</h3>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {globalBets.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <Gamepad2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No bets placed yet</p>
            <p className="text-sm">Start playing to see your betting history!</p>
          </div>
        ) : (
          globalBets.map((bet) => (
            <div
              key={bet.id}
              className={`p-4 rounded-xl border transition-all ${
                bet.result === 'win'
                  ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
                  : 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  {bet.result === 'win' ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className="font-medium text-white text-sm">{bet.game}</span>
                </div>
                <div className={`font-bold text-sm ${
                  bet.result === 'win' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {bet.profit >= 0 ? '+' : ''}₹{bet.profit.toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Bet: ₹{bet.amount.toFixed(2)}</span>
                {bet.multiplier && (
                  <span>Multiplier: {bet.multiplier.toFixed(2)}x</span>
                )}
                <span>{new Date(bet.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}