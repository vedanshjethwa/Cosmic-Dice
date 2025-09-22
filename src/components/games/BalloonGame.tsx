import React, { useState, useEffect } from 'react';
import { Minus, Plus, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Footer } from '../Footer';

interface Balloon {
  id: number;
  color: string;
  multiplier: number;
  revealed: boolean;
}

interface BetRecord {
  id: number;
  amount: number;
  multiplier: number;
  winAmount: number;
  timestamp: Date;
}

export default function BalloonGame() {
  const { user, wallet, refreshWallet, updateBalance } = useAuth();
  const [bet, setBet] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [hasPopped, setHasPopped] = useState(false);
  const [betHistory, setBetHistory] = useState<BetRecord[]>([]);
  const [stats, setStats] = useState({
    totalProfit: 0,
    totalWins: 0,
    totalLosses: 0
  });
  
  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);
  
  const balloonColors = [
    'linear-gradient(135deg, #ff6b9d, #c44569)',
    'linear-gradient(135deg, #4ecdc4, #44a08d)',
    'linear-gradient(135deg, #feca57, #ff9ff3)',
    'linear-gradient(135deg, #48dbfb, #0abde3)',
    'linear-gradient(135deg, #ff9ff3, #f368e0)',
    'linear-gradient(135deg, #54a0ff, #2e86de)',
    'linear-gradient(135deg, #5f27cd, #341f97)',
    'linear-gradient(135deg, #00d2d3, #54a0ff)',
    'linear-gradient(135deg, #ff6348, #e17055)',
    'linear-gradient(135deg, #2ed573, #7bed9f)',
  ];

  const multipliers = [0.2, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5];

  useEffect(() => {
    setBalloons(generateBalloons());
  }, []);

  const generateBalloons = () => {
    const newBalloons: Balloon[] = [];
    for (let i = 0; i < 15; i++) {
      const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
      const randomMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
      newBalloons.push({
        id: i,
        color: randomColor,
        multiplier: randomMultiplier,
        revealed: false
      });
    }
    return newBalloons;
  };

  const startGame = () => {
    if (currentBalance >= bet) {
      updateBalance(-bet);
      setIsPlaying(true);
      setBalloons(generateBalloons());
      setHasPopped(false);
      setShowResult(false);
    }
  };

  const popBalloon = (balloon: Balloon) => {
    if (!isPlaying || balloon.revealed || hasPopped) return;

    setHasPopped(true);
    
    setBalloons(prev => prev.map(b => 
      b.id === balloon.id ? { ...b, revealed: true } : b
    ));
    
    const winnings = Math.floor(bet * balloon.multiplier);
    setLastWin(winnings);
    updateBalance(winnings);
    setShowResult(true);
    setIsPlaying(false);

    const newBet: BetRecord = {
      id: Date.now(),
      amount: bet,
      multiplier: balloon.multiplier,
      winAmount: winnings,
      timestamp: new Date()
    };
    
    setBetHistory(prev => [newBet, ...prev].slice(0, 10));
    
    setStats(prev => {
      const profit = winnings - bet;
      return {
        totalProfit: prev.totalProfit + profit,
        totalWins: profit >= 0 ? prev.totalWins + 1 : prev.totalWins,
        totalLosses: profit < 0 ? prev.totalLosses + 1 : prev.totalLosses
      };
    });
  };

  const handleBetChange = (amount: number) => {
    if (isPlaying) return;
    const newBet = Math.max(1, Math.min(currentBalance, amount));
    setBet(newBet);
  };

  const incrementBet = () => {
    if (isPlaying) return;
    const increment = bet < 100 ? 10 : 100;
    handleBetChange(bet + increment);
  };

  const decrementBet = () => {
    if (isPlaying) return;
    const decrement = bet <= 100 ? 10 : 100;
    handleBetChange(bet - decrement);
  };

  return (
    <div className="game-container">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="game-panel">
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center mb-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30"
                >
                  <h2 className="text-3xl font-bold mb-2 text-high-contrast">
                    {lastWin > bet ? 'Congratulations! 🎉' : 'Better luck next time!'}
                  </h2>
                  <p className="text-2xl text-green-400 font-bold">
                    You won ₹{lastWin}!
                  </p>
                </motion.div>
              )}
              
              <div className="balloon-container">
                {balloons.map((balloon, index) => (
                  <motion.button
                    key={balloon.id}
                    onClick={() => popBalloon(balloon)}
                    disabled={!isPlaying || balloon.revealed || hasPopped}
                    className="balloon-wrapper relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`balloon ${balloon.revealed ? 'opacity-0 scale-0' : 'animate-balloon-float'}`}
                      style={{ background: balloon.color }}
                    >
                      {balloon.revealed ? (
                        <span className="text-2xl font-bold text-white animate-bounce">
                          {balloon.multiplier}x
                        </span>
                      ) : isPlaying ? (
                        <span className="text-xl font-bold text-white animate-pulse">
                          ?
                        </span>
                      ) : null}
                      
                      {/* Balloon highlight */}
                      <div className="absolute top-4 left-4 w-6 h-6 bg-white/30 rounded-full blur-sm" />
                    </div>
                    
                    {/* Balloon string */}
                    <div className="balloon-string animate-string-sway" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Betting Controls */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Place Your Bet</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementBet}
                    disabled={isPlaying || bet <= 1}
                    className="btn-secondary w-12 h-12 p-0"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  
                  <input
                    type="number"
                    value={bet}
                    onChange={(e) => handleBetChange(Number(e.target.value))}
                    disabled={isPlaying}
                    min={1}
                    max={currentBalance}
                    className="form-input text-center text-xl font-bold flex-1"
                  />
                  
                  <button
                    onClick={incrementBet}
                    disabled={isPlaying || bet >= currentBalance}
                    className="btn-secondary w-12 h-12 p-0"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={startGame}
                  disabled={currentBalance < bet || isPlaying}
                  className="btn-primary w-full text-lg py-4"
                >
                  {isPlaying ? 'Playing...' : 'Start Game'}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="stats-panel">
                  <div className={`stats-value ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stats.totalProfit >= 0 ? '+' : ''}₹{stats.totalProfit}
                  </div>
                  <div className="stats-label">Total Profit</div>
                </div>
                <div className="stats-panel">
                  <div className="stats-value text-green-400">{stats.totalWins}</div>
                  <div className="stats-label">Wins</div>
                </div>
                <div className="stats-panel">
                  <div className="stats-value text-red-400">{stats.totalLosses}</div>
                  <div className="stats-label">Losses</div>
                </div>
              </div>
            </div>

            {/* Recent Bets */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Recent Bets</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {betHistory.length === 0 ? (
                  <div className="text-center text-low-contrast py-8">
                    No bets yet. Start playing!
                  </div>
                ) : (
                  betHistory.map((record) => {
                    const profit = record.winAmount - record.amount;
                    const isProfitable = profit >= 0;
                    
                    return (
                      <div
                        key={record.id}
                        className={`p-4 rounded-lg border transition-all ${
                          isProfitable
                            ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
                            : 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm font-bold text-high-contrast">
                              {record.multiplier.toFixed(2)}x
                            </div>
                            <div className="text-xs text-low-contrast">
                              ₹{record.amount} bet
                            </div>
                          </div>
                          <div className={`text-sm font-bold ${isProfitable ? 'text-green-400' : 'text-red-400'}`}>
                            {isProfitable ? '+' : ''}₹{profit}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Game Info Section */}
        <div className="section-divider" />
        <div className="game-panel">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-high-contrast">How to Play Cosmic Balloon</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Set your bet amount</li>
                <li>• Click any balloon to pop it</li>
                <li>• Reveal hidden multiplier</li>
                <li>• Win = Bet × Multiplier</li>
                <li>• One balloon per round</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-green-400 mb-2">Strategy Tips</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Start with smaller bets</li>
                <li>• All balloons are random</li>
                <li>• Trust your intuition</li>
                <li>• Set win/loss limits</li>
                <li>• Play responsibly</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-purple-400 mb-2">Multipliers</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• 0.2x - Small loss</li>
                <li>• 0.5x - Minor loss</li>
                <li>• 1x - Break even</li>
                <li>• 2x - Double win</li>
                <li>• 5x - Maximum win</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}