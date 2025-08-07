import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, TrendingUp } from 'lucide-react';
import { api } from '../../lib/api';
import { useWallet } from '../../hooks/useWallet';
import { useSocket } from '../../hooks/useSocket';

interface GameInterfaceProps {
  gameId: string;
  gameName: string;
  minBet: number;
  maxBet: number;
  children: React.ReactNode;
}

export function GameInterface({ gameId, gameName, minBet, maxBet, children }: GameInterfaceProps) {
  const [betAmount, setBetAmount] = useState(minBet);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<any>(null);
  const [gameHistory, setGameHistory] = useState<any[]>([]);
  
  const { wallet, refreshWallet } = useWallet();
  const { on, off } = useSocket();

  React.useEffect(() => {
    // Listen for real-time game results
    on('game_result', (data: any) => {
      setGameResult(data.result);
      setIsPlaying(false);
      refreshWallet();
      
      // Add to game history
      setGameHistory(prev => [data, ...prev.slice(0, 9)]);
    });

    return () => {
      off('game_result');
    };
  }, [on, off, refreshWallet]);

  const placeBet = async (gameData: any) => {
    if (!wallet || wallet.realBalance + wallet.bonusBalance < betAmount) {
      alert('Insufficient balance');
      return;
    }

    if (betAmount < minBet || betAmount > maxBet) {
      alert(`Bet amount must be between ₹${minBet} and ₹${maxBet}`);
      return;
    }

    setIsPlaying(true);
    setGameResult(null);

    try {
      const response = await api.placeBet(gameId, betAmount, gameData);
      
      // If not using real-time updates, handle result immediately
      if (!response.sessionId) {
        setGameResult(response.result);
        setIsPlaying(false);
        refreshWallet();
      }
    } catch (error) {
      console.error('Bet placement failed:', error);
      setIsPlaying(false);
      alert('Failed to place bet');
    }
  };

  const resetGame = () => {
    setGameResult(null);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Game Area */}
      <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
        {children}
      </div>

      {/* Betting Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
      >
        <h3 className="text-xl font-bold text-white mb-4">Place Your Bet</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bet Amount
            </label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(parseFloat(e.target.value) || minBet)}
              min={minBet}
              max={Math.min(maxBet, wallet?.realBalance + wallet?.bonusBalance || 0)}
              className="w-full bg-[#0A1929] text-white rounded-lg px-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
              disabled={isPlaying}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Available Balance
            </label>
            <div className="bg-[#0A1929] rounded-lg px-4 py-3 border border-blue-500/20">
              <span className="text-green-400 font-bold">
                ₹{((wallet?.realBalance || 0) + (wallet?.bonusBalance || 0)).toLocaleString()}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Potential Win
            </label>
            <div className="bg-[#0A1929] rounded-lg px-4 py-3 border border-blue-500/20">
              <span className="text-blue-400 font-bold">
                ₹{(betAmount * 2).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setBetAmount(Math.max(minBet, betAmount / 2))}
            disabled={isPlaying}
            className="px-4 py-2 bg-[#0A1929] text-gray-300 rounded-lg hover:bg-blue-600/20 transition-colors disabled:opacity-50"
          >
            ½
          </button>
          <button
            onClick={() => setBetAmount(Math.min(maxBet, betAmount * 2, (wallet?.realBalance || 0) + (wallet?.bonusBalance || 0)))}
            disabled={isPlaying}
            className="px-4 py-2 bg-[#0A1929] text-gray-300 rounded-lg hover:bg-blue-600/20 transition-colors disabled:opacity-50"
          >
            2×
          </button>
          <button
            onClick={() => setBetAmount(Math.min(maxBet, (wallet?.realBalance || 0) + (wallet?.bonusBalance || 0)))}
            disabled={isPlaying}
            className="px-4 py-2 bg-[#0A1929] text-gray-300 rounded-lg hover:bg-blue-600/20 transition-colors disabled:opacity-50"
          >
            Max
          </button>
        </div>
      </motion.div>

      {/* Game Result */}
      {gameResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">Game Result</h3>
          <div className="bg-[#0A1929] rounded-lg p-4">
            <pre className="text-gray-300 text-sm overflow-auto">
              {JSON.stringify(gameResult, null, 2)}
            </pre>
          </div>
          <button
            onClick={resetGame}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw size={16} />
            Play Again
          </button>
        </motion.div>
      )}

      {/* Game History */}
      {gameHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">Recent Games</h3>
          <div className="space-y-3">
            {gameHistory.map((game, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#0A1929] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className={`w-4 h-4 ${game.result.isWin ? 'text-green-400' : 'text-red-400'}`} />
                  <span className="text-white text-sm">
                    {game.result.isWin ? 'Win' : 'Loss'}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-sm ${game.result.isWin ? 'text-green-400' : 'text-red-400'}`}>
                    {game.result.isWin ? '+' : '-'}₹{Math.abs(game.result.winAmount || betAmount).toLocaleString()}
                  </div>
                  {game.result.multiplier && (
                    <div className="text-xs text-gray-400">
                      {game.result.multiplier.toFixed(2)}x
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}