import React, { useState, useEffect } from 'react';
import { DivideCircle, Plus, Info, Minus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GameSpecificBets } from '../shared/GameSpecificBets';
import { Footer } from '../Footer';

// Betting tiers with their corresponding win chances
const BETTING_TIERS = [
  { amount: 1, winChance: 0.50 },
  { amount: 10, winChance: 0.40 },
  { amount: 20, winChance: 0.30 },
  { amount: 40, winChance: 0.25 },
  { amount: 80, winChance: 0.20 },
  { amount: 160, winChance: 0.15 },
  { amount: 320, winChance: 0.12 },
  { amount: 640, winChance: 0.10 },
  { amount: 1280, winChance: 0.08 },
  { amount: 2560, winChance: 0.06 },
  { amount: 5120, winChance: 0.05 },
  { amount: 10240, winChance: 0.04 },
  { amount: 20480, winChance: 0.03 },
  { amount: 40960, winChance: 0.025 },
  { amount: 81920, winChance: 0.02 },
  { amount: 100000, winChance: 0.01 }
];

const MAX_BET = 100000;

interface BetHistoryItem {
  betAmount: number;
  targetMultiplier: number;
  multiplier: number;
  isWin: boolean;
  profit: number;
}

interface GameStats {
  totalWins: number;
  totalLosses: number;
  totalProfit: number;
}

export default function DiceGame() {
  const { user, wallet, refreshWallet, updateBalance } = useAuth();
  const [betHistory, setBetHistory] = useState<BetHistoryItem[]>([]);
  const [selectedDice, setSelectedDice] = useState(4);
  const [betAmount, setBetAmount] = useState('1');
  const [isRolling, setIsRolling] = useState(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    totalWins: 0,
    totalLosses: 0,
    totalProfit: 0
  });

  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  const getWinChance = (amount: number): number => {
    for (let i = BETTING_TIERS.length - 1; i >= 0; i--) {
      if (amount >= BETTING_TIERS[i].amount) {
        return BETTING_TIERS[i].winChance;
      }
    }
    return BETTING_TIERS[0].winChance;
  };

  const calculateMaxWin = (betAmount: number): number => {
    return Math.min(betAmount * 5, currentBalance);
  };

  const adjustBet = (multiplier: number) => {
    const currentBet = parseFloat(betAmount) || 0;
    const newBet = Math.min(
      Math.max(Math.floor(currentBet * multiplier * 100) / 100, 1),
      Math.min(MAX_BET, currentBalance)
    );
    setBetAmount(newBet.toString());
  };

  const rollDice = async () => {
    const bet = parseFloat(betAmount);
    if (isNaN(bet) || bet <= 0 || bet > currentBalance || bet > MAX_BET) return;
    if (isRolling) return;

    setIsRolling(true);
    setDiceResult(null);
    setShowWinMessage(false);

    setTimeout(async () => {
      const winChance = getWinChance(bet);
      const randomValue = Math.random();
      const result = Math.floor(Math.random() * 6) + 1;
      const isWin = result === selectedDice && randomValue < winChance;
      
      setDiceResult(result);
      setIsRolling(false);

      const maxWin = calculateMaxWin(bet);
      const winAmount = isWin ? Math.min(bet * 5, maxWin) : 0;
      const profit = winAmount - bet;
      
      // Update wallet balance
      updateBalance(profit);
      
      // Emit bet event for global tracking
      window.dispatchEvent(new CustomEvent('cosmic-bet-placed', {
        detail: {
          game: 'Cosmic Dice',
          gameType: 'dice',
          amount: bet,
          result: isWin ? 'win' : 'loss',
          profit: profit,
          multiplier: isWin ? 5 : 0,
          gameData: { selectedNumber: selectedDice, diceResult: result }
        }
      }));

      const newBet: BetHistoryItem = {
        betAmount: bet,
        targetMultiplier: 5,
        multiplier: isWin ? 5 : 0,
        isWin,
        profit
      };
      
      setBetHistory(prev => [...prev, newBet]);
      
      setStats(prev => ({
        totalWins: prev.totalWins + (isWin ? 1 : 0),
        totalLosses: prev.totalLosses + (isWin ? 0 : 1),
        totalProfit: prev.totalProfit + profit
      }));

      if (isWin) {
        setShowWinMessage(true);
      }
    }, 1500);
  };

  // Calculate current win chance based on bet amount
  const currentWinChance = getWinChance(parseFloat(betAmount) || 0);
  const maxPossibleWin = calculateMaxWin(parseFloat(betAmount) || 0);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Game Specific Bets - Left Side */}
      <div className="lg:col-span-1">
        <GameSpecificBets gameType="dice" gameName="Cosmic Dice" />
      </div>
      
      {/* Main Game Area */}
      <div className="lg:col-span-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Left Side - Dice Display */}
          <div className="flex-1 flex flex-col items-center justify-center gap-3 md:gap-6">
            <div className="dice-container scale-75 md:scale-100">
              <div
                className={`dice ${
                  isRolling ? 'rolling' : diceResult ? `show-${diceResult}` : ''
                }`}
              >
                <div className="dice-face front">
                  <DiceFace number={1} />
                </div>
                <div className="dice-face back">
                  <DiceFace number={6} />
                </div>
                <div className="dice-face right">
                  <DiceFace number={2} />
                </div>
                <div className="dice-face left">
                  <DiceFace number={5} />
                </div>
                <div className="dice-face top">
                  <DiceFace number={3} />
                </div>
                <div className="dice-face bottom">
                  <DiceFace number={4} />
                </div>
              </div>
            </div>
            {showWinMessage && (
              <div className="text-xl md:text-3xl font-bold text-[#3b82f6] animate-bounce">
                You Win! ₹{maxPossibleWin.toFixed(2)}
              </div>
            )}
          </div>

          {/* Right Side - Game Controls */}
          <div className="flex-1 space-y-3 md:space-y-6 max-w-lg mx-auto w-full">
            <div className="space-y-3 md:space-y-6">
              {/* Betting Controls */}
              <div className="space-y-1 md:space-y-2">
                <label className="text-xs md:text-sm text-gray-400">
                  Place Your Bet (Win Chance: {(currentWinChance * 100).toFixed(1)}%)
                </label>
                <div className="flex gap-1.5 md:gap-2 items-center">
                  <button
                    onClick={() => adjustBet(0.5)}
                    className="bg-[#0f172a] hover:bg-[#1a2942] border border-[#1a2942] rounded p-2 md:p-3 transition-colors"
                    title="Half Bet"
                    disabled={isRolling}
                  >
                    <DivideCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => adjustBet(Math.max(1, betAmount - 10))}
                    className="bg-[#0f172a] hover:bg-[#1a2942] border border-[#1a2942] rounded p-2 md:p-3 transition-colors"
                    title="Decrease Bet"
                    disabled={isRolling}
                  >
                    <Minus className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (isNaN(value)) {
                        setBetAmount('');
                      } else {
                        setBetAmount(Math.min(value, Math.min(MAX_BET, currentBalance)).toString());
                      }
                    }}
                    className="bg-[#0f172a] border border-[#1a2942] rounded px-3 py-2 md:px-4 md:py-3 w-full text-base md:text-lg focus:outline-none focus:border-[#3b82f6] transition-colors"
                    placeholder="Bet Amount"
                    min="1"
                    max={Math.min(MAX_BET, currentBalance)}
                    step="1"
                    disabled={isRolling}
                  />
                  <button
                    onClick={() => adjustBet(2)}
                    className="bg-[#0f172a] hover:bg-[#1a2942] border border-[#1a2942] rounded p-2 md:p-3 transition-colors"
                    title="Double Bet"
                    disabled={isRolling}
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
                <div className="text-xs text-gray-400">
                  Max possible win: ₹{maxPossibleWin.toFixed(2)}
                </div>
              </div>

              {/* Dice Selection */}
              <div className="space-y-1 md:space-y-2">
                <label className="text-xs md:text-sm text-gray-400">
                  Select Your Number
                </label>
                <div className="grid grid-cols-3 md:flex gap-2 md:gap-6 justify-center py-2 md:py-6">
                  {[1, 2, 3, 4, 5, 6].map((dice) => (
                    <button
                      key={dice}
                      onClick={() => setSelectedDice(dice)}
                      disabled={isRolling}
                      className={`w-10 h-10 md:w-14 md:h-14 rounded-lg bg-[#0f172a] border border-[#1a2942] flex items-center justify-center transition-all ${
                        selectedDice === dice
                          ? 'ring-2 ring-[#3b82f6] shadow-lg shadow-[#3b82f6]/20 scale-110'
                          : !isRolling ? 'hover:bg-[#1a2942] hover:scale-105' : 'opacity-50'
                      }`}
                    >
                      <div className="text-white font-bold text-lg md:text-xl">
                        {dice}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Play Button */}
              <button
                onClick={rollDice}
                disabled={
                  isRolling ||
                  parseFloat(betAmount) > currentBalance ||
                  parseFloat(betAmount) <= 0 ||
                  parseFloat(betAmount) > MAX_BET
                }
                className="w-full bg-[#3b82f6] hover:bg-[#60a5fa] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 md:py-4 rounded-lg transition-colors text-base md:text-lg relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                {isRolling ? 'ROLLING...' : 'ROLL DICE'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Game Footer */}
        <Footer />

        {/* Recent Bets History */}
        <div className="mt-4 bg-[#0f172a] rounded-xl p-6 border border-[#1a2942]">
          <h2 className="text-xl font-bold mb-4 text-[#3b82f6]">Recent Bets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {betHistory.slice(-6).reverse().map((bet, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${bet.isWin ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold">{bet.multiplier.toFixed(2)}×</span>
                  <span className={`font-bold ${bet.isWin ? 'text-green-500' : 'text-red-500'}`}>
                    {bet.profit >= 0 ? '+' : ''}₹{bet.profit.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Bet: ₹{bet.betAmount.toFixed(2)} | Target: {bet.targetMultiplier.toFixed(2)}×
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Summary */}
        <div className="mt-4 bg-[#0f172a] rounded-xl p-6 border border-[#1a2942]">
          <h2 className="text-xl font-bold mb-4 text-[#3b82f6]">Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1a2942] rounded-lg p-4">
              <div className="text-sm text-gray-400">Total Profit</div>
              <div className={`text-xl font-bold ${stats.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ₹{stats.totalProfit.toFixed(2)}
              </div>
            </div>
            <div className="bg-[#1a2942] rounded-lg p-4">
              <div className="text-sm text-gray-400">Wins</div>
              <div className="text-xl font-bold text-green-500">{stats.totalWins}</div>
            </div>
            <div className="bg-[#1a2942] rounded-lg p-4">
              <div className="text-sm text-gray-400">Losses</div>
              <div className="text-xl font-bold text-red-500">{stats.totalLosses}</div>
            </div>
          </div>
        </div>

        {/* Game Info Section */}
        <div className="mt-4 bg-[#0f172a] rounded-xl p-6 border border-[#1a2942]">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">How to Play Cosmic Dice</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a2942] rounded-lg p-4">
              <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Choose your bet amount</li>
                <li>• Select target number (1-6)</li>
                <li>• Roll the dice</li>
                <li>• Match = Win 5x your bet</li>
                <li>• No match = Lose bet</li>
              </ul>
            </div>
            <div className="bg-[#1a2942] rounded-lg p-4">
              <h4 className="font-bold text-green-400 mb-2">Strategy Tips</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Start with small bets</li>
                <li>• Each number has equal chance</li>
                <li>• Higher bets = Lower win chance</li>
                <li>• Set win/loss limits</li>
                <li>• Play responsibly</li>
              </ul>
            </div>
            <div className="bg-[#1a2942] rounded-lg p-4">
              <h4 className="font-bold text-purple-400 mb-2">Betting Tiers</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• ₹1-10: 50% win chance</li>
                <li>• ₹100+: 30% win chance</li>
                <li>• ₹1000+: 15% win chance</li>
                <li>• ₹10,000+: 8% win chance</li>
                <li>• Max: ₹100,000</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Game Footer */}
        <div className="mt-8 pt-6 border-t border-blue-500/20">
          <div className="text-center text-gray-400 text-sm">
            <p>Cosmic Dice uses provably fair algorithms for transparent gameplay</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function DiceFace({ number }: { number: number }) {
  const dots = Array(number).fill(null);
  return (
    <div
      className={`dice-dots ${
        ['one', 'two', 'three', 'four', 'five', 'six'][number - 1]
      }`}
    >
      {dots.map((_, i) => (
        <div key={i} className="dot" />
      ))}
    </div>
  );
}