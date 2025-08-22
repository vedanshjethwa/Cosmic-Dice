import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';

interface GameBet {
  id: string;
  amount: number;
  result: 'win' | 'loss';
  profit: number;
  timestamp: number;
  multiplier?: number;
  gameData?: any;
}

interface GameSpecificBetsProps {
  gameType: string;
  gameName: string;
}

export function GameSpecificBets({ gameType, gameName }: GameSpecificBetsProps) {
  const [gameBets, setGameBets] = useState<GameBet[]>([]);

  useEffect(() => {
    // Load game-specific bets from localStorage
    const savedBets = localStorage.getItem(`cosmic_${gameType}_bets`);
    if (savedBets) {
      try {
        setGameBets(JSON.parse(savedBets));
      } catch (error) {
        console.error('Error loading game bets:', error);
        setGameBets([]);
      }
    }

    // Listen for new bets from this specific game
    const handleNewBet = (event: CustomEvent) => {
      if (event.detail.gameType === gameType) {
        const newBet: GameBet = {
          id: `${Date.now()}-${Math.random()}`,
          amount: event.detail.amount,
          result: event.detail.result,
          profit: event.detail.profit,
          timestamp: Date.now(),
          multiplier: event.detail.multiplier,
          gameData: event.detail.gameData
        };

        setGameBets(prev => {
          const updated = [newBet, ...prev].slice(0, 20); // Keep last 20 bets for this game
          localStorage.setItem(`cosmic_${gameType}_bets`, JSON.stringify(updated));
          return updated;
        });
      }
    };

    window.addEventListener('cosmic-bet-placed', handleNewBet as EventListener);
    return () => {
      window.removeEventListener('cosmic-bet-placed', handleNewBet as EventListener);
    };
  }, [gameType]);

  const clearHistory = () => {
    setGameBets([]);
    localStorage.removeItem(`cosmic_${gameType}_bets`);
  };

  const stats = gameBets.reduce((acc, bet) => {
    acc.totalProfit += bet.profit;
    acc.totalBets += 1;
    if (bet.result === 'win') acc.wins += 1;
    else acc.losses += 1;
    return acc;
  }, { totalProfit: 0, totalBets: 0, wins: 0, losses: 0 });

  const winRate = stats.totalBets > 0 ? (stats.wins / stats.totalBets * 100).toFixed(1) : '0.0';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#132F4C] rounded-xl p-6 border-2 border-blue-500/30 shadow-xl h-fit"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">{gameName} History</h3>
        </div>
        {gameBets.length > 0 && (
          <button
            onClick={clearHistory}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            title="Clear History"
          >
            <RotateCcw className="w-4 h-4 text-red-400" />
          </button>
        )}
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#0A1929] rounded-lg p-3 text-center">
          <div className="text-xs text-gray-400">Win Rate</div>
          <div className="text-lg font-bold text-green-400">{winRate}%</div>
        </div>
        <div className="bg-[#0A1929] rounded-lg p-3 text-center">
          <div className="text-xs text-gray-400">Profit</div>
          <div className={`text-lg font-bold ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.totalProfit >= 0 ? '+' : ''}₹{stats.totalProfit.toFixed(0)}
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        {gameBets.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <Gamepad2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No {gameName} bets yet</p>
            <p className="text-sm">Start playing to see your history!</p>
          </div>
        ) : (
          gameBets.map((bet) => (
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
                  <span className="font-medium text-white text-sm">
                    {bet.result === 'win' ? 'Won' : 'Lost'}
                  </span>
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