import React, { useState, useMemo } from 'react';
import { Hand, Scroll, Scissors, Minus, Plus, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Footer } from '../Footer';

type Choice = 'rock' | 'paper' | 'scissors' | null;

const BETTING_TIERS = [
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

interface BetHistoryEntry {
  id: string;
  timestamp: number;
  amount: number;
  winAmount: number;
  multiplier: number;
  profit: number;
  isWin: boolean;
}

export default function RPSGame() {
  const { user, wallet, refreshWallet, updateBalance } = useAuth();
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [betAmount, setBetAmount] = useState(10);
  const [result, setResult] = useState<string>('');
  const [potentialWin, setPotentialWin] = useState(20);
  const [betHistory, setBetHistory] = useState<BetHistoryEntry[]>([]);

  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  const stats = useMemo(() => {
    return betHistory.reduce(
      (acc, bet) => ({
        totalProfit: acc.totalProfit + bet.profit,
        totalWins: acc.totalWins + (bet.isWin ? 1 : 0),
        totalLosses: acc.totalLosses + (bet.isWin ? 0 : 1),
      }),
      { totalProfit: 0, totalWins: 0, totalLosses: 0 }
    );
  }, [betHistory]);

  const getWinChance = (bet: number): number => {
    for (let i = BETTING_TIERS.length - 1; i >= 0; i--) {
      if (bet >= BETTING_TIERS[i].amount) {
        return BETTING_TIERS[i].winChance;
      }
    }
    return BETTING_TIERS[0].winChance;
  };

  const makeComputerChoice = (): Choice => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const random = Math.random();
    const winChance = getWinChance(betAmount);

    if (random < winChance) {
      switch (playerChoice) {
        case 'rock':
          return 'scissors';
        case 'paper':
          return 'rock';
        case 'scissors':
          return 'paper';
        default:
          return choices[Math.floor(Math.random() * choices.length)];
      }
    } else if (random < winChance + 0.1) {
      return playerChoice;
    } else {
      switch (playerChoice) {
        case 'rock':
          return 'paper';
        case 'paper':
          return 'scissors';
        case 'scissors':
          return 'rock';
        default:
          return choices[Math.floor(Math.random() * choices.length)];
      }
    }
  };

  const handleBetChange = (value: string | number) => {
    const numericValue = typeof value === 'string' 
      ? parseFloat(value.replace(/,/g, '')) 
      : value;

    if (isNaN(numericValue) || numericValue < 0) {
      setBetAmount(0);
      setPotentialWin(0);
      return;
    }

    const newBet = Math.min(
      parseFloat(numericValue.toFixed(2)),
      Math.min(100000, currentBalance)
    );

    setBetAmount(newBet);
    const calculatedWin = newBet * 2;
    setPotentialWin(Math.min(calculatedWin, currentBalance));
  };

  const incrementBet = () => handleBetChange(betAmount + 1);
  const decrementBet = () => handleBetChange(betAmount - 1);

  const determineWinner = async (player: Choice, computer: Choice) => {
    const timestamp = Date.now();
    const id = `${timestamp}-${Math.random()}`;

    if (player === computer) {
      setResult('Draw!');
      setBetHistory((prev) => [
        {
          id,
          timestamp,
          amount: betAmount,
          winAmount: betAmount,
          multiplier: 1,
          profit: 0,
          isWin: false,
        },
        ...prev,
      ]);
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      const winAmount = Math.min(betAmount * 2, currentBalance);
      setResult('You Win!');
      
      updateBalance(winAmount - betAmount);

      setBetHistory((prev) => [
        {
          id,
          timestamp,
          amount: betAmount,
          winAmount,
          multiplier: 2,
          profit: winAmount - betAmount,
          isWin: true,
        },
        ...prev,
      ]);
    } else {
      setResult('Computer Wins!');
      
      updateBalance(-betAmount);

      setBetHistory((prev) => [
        {
          id,
          timestamp,
          amount: betAmount,
          winAmount: 0,
          multiplier: 0,
          profit: -betAmount,
          isWin: false,
        },
        ...prev,
      ]);
    }
  };

  const handleChoice = (choice: Choice) => {
    if (betAmount < 0 || betAmount > currentBalance || !choice) return;

    setPlayerChoice(choice);
    const computerMove = makeComputerChoice();
    setComputerChoice(computerMove);
    determineWinner(choice, computerMove);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="cosmic-card p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Choose Your Move</h2>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                {['rock', 'paper', 'scissors'].map((choice) => (
                  <motion.button
                    key={choice}
                    onClick={() => handleChoice(choice as Choice)}
                    className="cosmic-card hover:bg-[#475569] p-8 transition-all border border-blue-500/30 hover:border-blue-400/50 relative group overflow-hidden"
                    disabled={betAmount < 0 || betAmount > currentBalance}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex flex-col items-center gap-4">
                      {choice === 'rock' && <Hand className="w-12 h-12 text-blue-400" />}
                      {choice === 'paper' && <Scroll className="w-12 h-12 text-blue-400" />}
                      {choice === 'scissors' && <Scissors className="w-12 h-12 text-blue-400" />}
                      <span className="text-xl font-bold capitalize text-white group-hover:text-blue-300 transition-colors">
                        {choice}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {playerChoice && computerChoice && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="cosmic-card p-8"
                >
                  <div className="flex justify-center items-center gap-12 mb-6">
                    <div className="text-center">
                      <div className="text-lg mb-4 text-blue-300">You</div>
                      <div className="cosmic-card p-6 shadow-lg">
                        {playerChoice === 'rock' && <Hand className="w-16 h-16 text-blue-400" />}
                        {playerChoice === 'paper' && <Scroll className="w-16 h-16 text-blue-400" />}
                        {playerChoice === 'scissors' && <Scissors className="w-16 h-16 text-blue-400" />}
                      </div>
                    </div>
                    <div className="text-white text-5xl font-bold">VS</div>
                    <div className="text-center">
                      <div className="text-lg mb-4 text-purple-300">Computer</div>
                      <div className="cosmic-card p-6 shadow-lg border-purple-500/30">
                        {computerChoice === 'rock' && <Hand className="w-16 h-16 text-purple-400" />}
                        {computerChoice === 'paper' && <Scroll className="w-16 h-16 text-purple-400" />}
                        {computerChoice === 'scissors' && <Scissors className="w-16 h-16 text-purple-400" />}
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-center">
                    <span className={`${result.includes('Win') ? 'text-green-400' : result.includes('Draw') ? 'text-yellow-400' : 'text-red-400'}`}>
                      {result}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Place Your Bet */}
            <div className="cosmic-card p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Place Your Bet</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementBet}
                    className="w-12 h-12 cosmic-card hover:bg-[#475569] border border-blue-500/30 hover:border-blue-400/50 flex items-center justify-center transition-all group"
                  >
                    <Minus className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={betAmount.toFixed(2)}
                      onChange={(e) => handleBetChange(e.target.value)}
                      className="w-full bg-[#334155] text-white text-center py-4 px-6 rounded-lg outline-none border border-blue-500/30 focus:border-blue-400/50 transition-all text-xl font-bold"
                      min="0"
                      step="0.01"
                      max={Math.min(100000, currentBalance)}
                    />
                  </div>
                  
                  <button
                    onClick={incrementBet}
                    className="w-12 h-12 cosmic-card hover:bg-[#475569] border border-blue-500/30 hover:border-blue-400/50 flex items-center justify-center transition-all group"
                  >
                    <Plus className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  </button>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Potential Win</span>
                  <span className="text-green-400 font-bold">₹{potentialWin.toFixed(2)}</span>
                </div>

                <div className="text-sm text-gray-400 text-center">
                  Win Chance: {(getWinChance(betAmount) * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="cosmic-card p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Place Your Bet</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementBet}
                    className="w-12 h-12 cosmic-card hover:bg-[#475569] border border-blue-500/30 hover:border-blue-400/50 flex items-center justify-center transition-all group"
                  >
                    <Minus className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={betAmount.toFixed(2)}
                      onChange={(e) => handleBetChange(e.target.value)}
                      className="w-full bg-[#334155] text-white text-center py-4 px-6 outline-none border border-blue-500/30 focus:border-blue-400/50 transition-all text-xl font-bold"
                      min="0"
                      step="0.01"
                      max={Math.min(100000, currentBalance)}
                    />
                  </div>
                  
                  <button
                    onClick={incrementBet}
                    className="w-12 h-12 cosmic-card hover:bg-[#475569] border border-blue-500/30 hover:border-blue-400/50 flex items-center justify-center transition-all group"
                  >
                    <Plus className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  </button>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Potential Win</span>
                  <span className="text-green-400 font-bold">₹{potentialWin.toFixed(2)}</span>
                </div>

                <div className="text-sm text-gray-400 text-center">
                  Win Chance: {(getWinChance(betAmount) * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="cosmic-card p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="cosmic-card p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                  <div className={`text-xl font-bold ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stats.totalProfit >= 0 ? '+' : ''}₹{stats.totalProfit.toFixed(2)}
                  </div>
                </div>
                <div className="cosmic-card p-4 text-center border-green-500/20">
                  <div className="text-sm text-gray-400 mb-1">Wins</div>
                  <div className="text-xl font-bold text-green-400">{stats.totalWins}</div>
                </div>
                <div className="cosmic-card p-4 text-center border-red-500/20">
                  <div className="text-sm text-gray-400 mb-1">Losses</div>
                  <div className="text-xl font-bold text-red-400">{stats.totalLosses}</div>
                </div>
              </div>
            </div>

            {/* Recent Bets */}
            <div className="cosmic-card p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Recent Bets</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {betHistory.slice(0, 10).map((record) => (
                  <div
                    key={record.id}
                    className={`p-4 border transition-all ${
                      record.isWin
                        ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
                        : record.profit === 0
                        ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20'
                        : 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className={`font-bold ${
                        record.isWin 
                          ? 'text-green-400' 
                          : record.profit === 0 
                          ? 'text-blue-400' 
                          : 'text-red-400'
                      }`}>
                        {record.isWin ? 'Won' : record.profit === 0 ? 'Draw' : 'Lost'}
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">₹{record.amount.toFixed(2)}</div>
                        <div className={`text-sm font-bold ${
                          record.profit > 0 
                            ? 'text-green-400' 
                            : record.profit === 0 
                            ? 'text-blue-400' 
                            : 'text-red-400'
                        }`}>
                          {record.profit >= 0 ? '+' : ''}₹{record.profit.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {betHistory.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    No bets placed yet. Start playing to see your betting history!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Game Info Section */}
        <div className="mt-8 cosmic-card p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">How to Play Cosmic RPS</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="cosmic-card p-4">
              <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Rock beats Scissors</li>
                <li>• Paper beats Rock</li>
                <li>• Scissors beats Paper</li>
                <li>• Win = 2x your bet</li>
                <li>• Draw = Get bet back</li>
              </ul>
            </div>
            <div className="cosmic-card p-4">
              <h4 className="font-bold text-green-400 mb-2">Strategy Tips</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Start with small bets</li>
                <li>• Study opponent patterns</li>
                <li>• Use psychological tactics</li>
                <li>• Manage your bankroll</li>
                <li>• Take regular breaks</li>
              </ul>
            </div>
            <div className="cosmic-card p-4">
              <h4 className="font-bold text-purple-400 mb-2">Win Chances</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Higher bets = Lower win chance</li>
                <li>• ₹1-10: 50% win chance</li>
                <li>• ₹100+: 30% win chance</li>
                <li>• ₹1000+: 15% win chance</li>
                <li>• Max bet: ₹100,000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}