import React, { useState, useEffect } from 'react';
import { Minus, Plus, Sparkles, Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { NumericFormat } from 'react-number-format';
import { useAuth } from '../../contexts/AuthContext';
import { Footer } from '../Footer';

interface BetHistoryItem {
  betAmount: number;
  multiplier: number;
  isWin: boolean;
  profit: number;
}

interface GameStats {
  totalWins: number;
  totalLosses: number;
  totalProfit: number;
}

interface BetTier {
  amount: number;
  winChance: number;
}

const BET_TIERS: BetTier[] = [
  { amount: 1, winChance: 0.5 },
  { amount: 10, winChance: 0.4 },
  { amount: 20, winChance: 0.3 },
  { amount: 40, winChance: 0.25 },
  { amount: 80, winChance: 0.2 },
  { amount: 160, winChance: 0.15 },
  { amount: 320, winChance: 0.12 },
  { amount: 640, winChance: 0.1 },
  { amount: 1280, winChance: 0.08 },
  { amount: 2560, winChance: 0.06 },
  { amount: 5120, winChance: 0.05 },
  { amount: 10240, winChance: 0.04 },
  { amount: 20480, winChance: 0.03 },
  { amount: 40960, winChance: 0.025 },
  { amount: 81920, winChance: 0.02 },
  { amount: 100000, winChance: 0.01 },
];

export default function TossGame() {
  const { user, wallet, refreshWallet, updateBalance } = useAuth();
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [selectedSide, setSelectedSide] = useState<'heads' | 'tails'>('heads');
  const [bet, setBet] = useState(1);
  const [showImpact, setShowImpact] = useState(false);
  const [betHistory, setBetHistory] = useState<BetHistoryItem[]>([]);
  const [stats, setStats] = useState<GameStats>({
    totalWins: 0,
    totalLosses: 0,
    totalProfit: 0,
  });
  const [isFastMode, setIsFastMode] = useState(false);

  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);
  const MIN_BET = 1;
  const MAX_BET = 100000;

  const getWinChance = (betAmount: number): number => {
    for (let i = BET_TIERS.length - 1; i >= 0; i--) {
      if (betAmount >= BET_TIERS[i].amount) {
        return BET_TIERS[i].winChance;
      }
    }
    return BET_TIERS[0].winChance;
  };

  const adjustBet = (operation: 'increase' | 'decrease') => {
    if (operation === 'increase') {
      const newBet = Math.min(MAX_BET, bet * 2);
      setBet(Math.min(newBet, currentBalance));
    } else {
      const newBet = Math.max(MIN_BET, bet / 2);
      setBet(newBet);
    }
  };

  const handleBetChange = (value: number) => {
    const cappedValue = Math.min(Math.max(MIN_BET, value), MAX_BET);
    setBet(Math.min(cappedValue, currentBalance));
  };

  const flipCoin = async () => {
    if (isFlipping || bet > currentBalance || bet <= 0) return;

    setIsFlipping(true);
    setShowImpact(false);
    
    // Deduct bet amount immediately
    updateBalance(-bet);

    const flipDuration = isFastMode ? 300 : 1500;

    setTimeout(async () => {
      setShowImpact(true);

      const winChance = getWinChance(bet);
      const isWin = Math.random() < winChance;
      const newResult = isWin
        ? selectedSide
        : selectedSide === 'heads'
        ? 'tails'
        : 'heads';
      setResult(newResult);

      const winAmount = isWin ? bet * 2 : 0;
      const profit = winAmount - bet;

      if (winAmount > 0) {
        updateBalance(winAmount);
      }

      const newBetHistoryItem = {
        betAmount: bet,
        multiplier: isWin ? 2 : 0,
        isWin,
        profit,
      };

      setBetHistory((prev) => {
        const newHistory = [...prev, newBetHistoryItem];
        return newHistory.slice(-10);
      });

      setStats((prevStats) => ({
        totalWins: prevStats.totalWins + (isWin ? 1 : 0),
        totalLosses: prevStats.totalLosses + (isWin ? 0 : 1),
        totalProfit: prevStats.totalProfit + profit,
      }));

      setIsFlipping(false);
    }, flipDuration);
  };

  return (
    <div className="game-container">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coin Section */}
          <div className="game-panel">
            <h2 className="text-2xl font-bold text-high-contrast mb-8 text-center">Cosmic Heads & Tails</h2>
            
            {/* Coin Display */}
            <div className="flex justify-center mb-8">
              <div className="coin-container">
                <div
                  className={`coin ${isFlipping ? 'animate-coin-flip' : ''} ${showImpact ? 'animate-pulse' : ''}`}
                >
                  {/* Heads Side */}
                  <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-opacity duration-500 ${
                    result === 'heads' || result === null ? 'opacity-100' : 'opacity-0'
                  }`}>
                    H
                  </div>
                  
                  {/* Tails Side */}
                  <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-opacity duration-500 ${
                    result === 'tails' ? 'opacity-100' : 'opacity-0'
                  }`}>
                    T
                  </div>
                </div>
              </div>
            </div>

            {/* Side Selection */}
            <div className="flex justify-center gap-12 mb-8">
              <button
                onClick={() => setSelectedSide('heads')}
                disabled={isFlipping}
                className={`group ${
                  selectedSide === 'heads' ? 'scale-110' : 'opacity-70 hover:opacity-100'
                } transition-all duration-300`}
              >
                <div className="text-sm mb-3 text-blue-400 text-center font-medium">
                  Heads
                </div>
                <div
                  className={`w-24 h-24 rounded-full border-4 transition-all flex items-center justify-center text-white font-bold text-2xl ${
                    selectedSide === 'heads'
                      ? 'border-blue-400 bg-gradient-to-br from-blue-500 to-blue-700 neon-glow'
                      : 'border-gray-600 group-hover:border-blue-400/50 bg-gradient-to-br from-gray-600 to-gray-800'
                  }`}
                >
                  H
                </div>
              </button>
              <button
                onClick={() => setSelectedSide('tails')}
                disabled={isFlipping}
                className={`group ${
                  selectedSide === 'tails' ? 'scale-110' : 'opacity-70 hover:opacity-100'
                } transition-all duration-300`}
              >
                <div className="text-sm mb-3 text-blue-400 text-center font-medium">
                  Tails
                </div>
                <div
                  className={`w-24 h-24 rounded-full border-4 transition-all flex items-center justify-center text-white font-bold text-2xl ${
                    selectedSide === 'tails'
                      ? 'border-blue-400 bg-gradient-to-br from-blue-500 to-blue-700 neon-glow'
                      : 'border-gray-600 group-hover:border-blue-400/50 bg-gradient-to-br from-gray-600 to-gray-800'
                  }`}
                >
                  T
                </div>
              </button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            {/* Betting Controls */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Place Your Bet</h3>
              
              <div className="space-y-6">
                {/* Bet Amount Control */}
                <div className="flex items-center gap-4 justify-center">
                  <button
                    onClick={() => adjustBet('decrease')}
                    disabled={isFlipping}
                    className="btn-secondary w-14 h-14 p-0"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  
                  <div className="flex-1 max-w-xs">
                    <NumericFormat
                      value={bet}
                      onValueChange={(values) => handleBetChange(values.floatValue || 0)}
                      decimalScale={2}
                      fixedDecimalScale
                      thousandSeparator=","
                      prefix="₹"
                      allowNegative={false}
                      disabled={isFlipping}
                      className="form-input text-center text-2xl font-bold"
                    />
                  </div>
                  
                  <button
                    onClick={() => adjustBet('increase')}
                    disabled={isFlipping}
                    className="btn-secondary w-14 h-14 p-0"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>

                {/* Fast Mode Toggle */}
                <button
                  onClick={() => setIsFastMode(!isFastMode)}
                  disabled={isFlipping}
                  className={`w-full py-4 rounded-xl text-lg font-semibold transition-all transform flex items-center justify-center gap-3 ${
                    isFastMode
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  <Zap className="w-6 h-6" />
                  Fast Mode
                </button>

                {/* Flip Button */}
                <button
                  onClick={flipCoin}
                  disabled={isFlipping || bet > currentBalance || bet <= 0}
                  className="btn-primary w-full py-5 text-xl font-bold"
                >
                  {isFlipping ? 'Flipping...' : 'Flip'}
                </button>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="stats-panel">
                  <div className={`stats-value ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ₹{stats.totalProfit.toFixed(2)}
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
          </div>
        </div>

        {/* Recent Bets Section */}
        <div className="section-divider" />
        <div className="game-panel">
          <h3 className="text-xl font-bold text-high-contrast mb-6">Recent Bets</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {betHistory.length === 0 ? (
              <div className="text-center text-low-contrast py-8">
                No bets yet. Start playing!
              </div>
            ) : (
              betHistory
                .slice()
                .reverse()
                .map((bet, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      bet.isWin ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20' : 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-high-contrast">
                        {bet.multiplier.toFixed(2)}×
                      </div>
                      <div className="text-xs text-low-contrast">
                        ₹{bet.betAmount.toFixed(2)} bet
                      </div>
                    </div>
                    <div
                      className={`text-sm font-bold ${
                        bet.isWin ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {bet.profit >= 0 ? '+' : ''}₹{bet.profit.toFixed(2)}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Game Info */}
        <div className="section-divider" />
        <div className="game-panel">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-high-contrast">How to Play Cosmic Heads & Tails</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Choose heads or tails</li>
                <li>• Set your bet amount</li>
                <li>• Flip the coin</li>
                <li>• Correct guess = 2x bet</li>
                <li>• Wrong guess = lose bet</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-green-400 mb-2">Features</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Fast mode for quick games</li>
                <li>• Dynamic win chances</li>
                <li>• Real-time statistics</li>
                <li>• Bet history tracking</li>
                <li>• Smooth animations</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-purple-400 mb-2">Strategy Tips</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Start with small bets</li>
                <li>• Use fast mode for efficiency</li>
                <li>• Higher bets = lower win chance</li>
                <li>• Set profit targets</li>
                <li>• Play responsibly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}