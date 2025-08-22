import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, TrendingUp, TrendingDown, Gamepad2, Filter } from 'lucide-react';

interface GlobalBet {
  id: string;
  game: string;
  amount: number;
  result: 'win' | 'loss';
  profit: number;
  timestamp: number;
  multiplier?: number;
  gameType: string;
}

export function GlobalRecentBets() {
  const [globalBets, setGlobalBets] = useState<GlobalBet[]>([]);
  const [filterGame, setFilterGame] = useState('all');

  useEffect(() => {
    // Load global bets from localStorage
    const savedBets = localStorage.getItem('cosmic_global_bets');
    if (savedBets) {
      try {
        setGlobalBets(JSON.parse(savedBets));
      } catch (error) {
        console.error('Error loading global bets:', error);
        setGlobalBets([]);
      }
    }

    // Listen for new bets from any game
    const handleNewBet = (event: CustomEvent) => {
      const newBet: GlobalBet = {
        id: `${Date.now()}-${Math.random()}`,
        game: event.detail.game,
        amount: event.detail.amount,
        result: event.detail.result,
        profit: event.detail.profit,
        timestamp: Date.now(),
        multiplier: event.detail.multiplier,
        gameType: event.detail.gameType || 'unknown'
      };

      setGlobalBets(prev => {
        const updated = [newBet, ...prev].slice(0, 50); // Keep last 50 bets
        localStorage.setItem('cosmic_global_bets', JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener('cosmic-bet-placed', handleNewBet as EventListener);
    return () => {
      window.removeEventListener('cosmic-bet-placed', handleNewBet as EventListener);
    };
  }, []);

  const gameTypes = ['all', 'dice', 'rps', 'limbo', 'balloon', 'cards', 'toss', 'minesweeper', 'snakes', 'prediction'];
  
  const filteredBets = filterGame === 'all' 
    ? globalBets 
    : globalBets.filter(bet => bet.gameType === filterGame);

  const stats = globalBets.reduce((acc, bet) => {
    acc.totalProfit += bet.profit;
    acc.totalBets += 1;
    if (bet.result === 'win') acc.wins += 1;
    else acc.losses += 1;
    return acc;
  }, { totalProfit: 0, totalBets: 0, wins: 0, losses: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#132F4C] rounded-xl p-6 border-2 border-blue-500/30 shadow-xl h-fit"
    >
      <div className="flex items-center gap-3 mb-6">
        <History className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Global Recent Bets</h3>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filterGame}
          onChange={(e) => setFilterGame(e.target.value)}
          className="w-full bg-[#0A1929] border border-blue-500/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
        >
          <option value="all">All Games</option>
          {gameTypes.slice(1).map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-[#0A1929] rounded-lg p-2 text-center">
          <div className="text-xs text-gray-400">Total</div>
          <div className="text-sm font-bold text-white">{stats.totalBets}</div>
        </div>
        <div className="bg-[#0A1929] rounded-lg p-2 text-center">
          <div className="text-xs text-gray-400">Wins</div>
          <div className="text-sm font-bold text-green-400">{stats.wins}</div>
        </div>
        <div className="bg-[#0A1929] rounded-lg p-2 text-center">
          <div className="text-xs text-gray-400">Profit</div>
          <div className={`text-sm font-bold ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.totalProfit >= 0 ? '+' : ''}₹{stats.totalProfit.toFixed(0)}
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredBets.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <Gamepad2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No bets placed yet</p>
            <p className="text-sm">Start playing to see your betting history!</p>
          </div>
        ) : (
          filteredBets.slice(0, 20).map((bet) => (
            <div
              key={bet.id}
              className={`p-3 rounded-lg border transition-all ${
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
                  <span>{bet.multiplier.toFixed(2)}x</span>
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