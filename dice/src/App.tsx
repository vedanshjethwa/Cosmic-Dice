import React, { useState, useEffect } from 'react';
import { DivideCircle, Plus, HelpCircle } from 'lucide-react';
import { Border } from './border/Border';

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

// Instructions Modal Component
function InstructionsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] text-white p-8 rounded-xl max-w-md w-full mx-4 relative border border-[#1a2942]">
        <h2 className="text-2xl font-bold mb-4 text-[#3b82f6]">How to Play</h2>
        <div className="space-y-4">
          <p>1. Choose your bet amount (₹1 - ₹100,000)</p>
          <p>2. Select a number (1-6) that you think the dice will land on.</p>
          <p>3. Click "ROLL DICE" to start the game.</p>
          <p>4. Win chances vary based on your bet amount!</p>
          <p className="text-sm text-gray-400">Note: Maximum winnings cannot exceed your wallet balance.</p>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 bg-[#3b82f6] hover:bg-[#60a5fa] text-white font-bold py-3 rounded-lg transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

// Define bet history type
interface BetHistoryItem {
  betAmount: number;
  targetMultiplier: number;
  multiplier: number;
  isWin: boolean;
  profit: number;
}

// Define stats type
interface GameStats {
  totalWins: number;
  totalLosses: number;
  totalProfit: number;
}

function App() {
  const [selectedDice, setSelectedDice] = useState(4);
  const [betAmount, setBetAmount] = useState('1');
  const [balance, setBalance] = useState(518.0);
  const [isRolling, setIsRolling] = useState(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isBalanceAnimating, setIsBalanceAnimating] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  
  const [betHistory, setBetHistory] = useState<BetHistoryItem[]>([]);
  const [stats, setStats] = useState<GameStats>({
    totalWins: 0,
    totalLosses: 0,
    totalProfit: 0
  });

  const [rollSound] = useState(() => {
    const audio = new Audio();
    audio.src = 'https://cdn.freesound.org/previews/220/220773_4107740-lq.mp3';
    audio.onerror = () => {
      audio.src = 'https://cdn.freesound.org/previews/240/240776_4107740-lq.mp3';
    };
    return audio;
  });

  const [winSound] = useState(() => {
    const audio = new Audio();
    audio.src = 'https://cdn.freesound.org/previews/456/456966_9497047-lq.mp3';
    audio.onerror = () => {
      audio.src = 'https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3';
    };
    return audio;
  });

  const handleCloseModal = () => {
    setShowInstructions(false);
    setModalClosed(true);
  };

  const playSound = (audio: HTMLAudioElement) => {
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Ignore playback errors
      });
    }
  };

  const getWinChance = (amount: number): number => {
    for (let i = BETTING_TIERS.length - 1; i >= 0; i--) {
      if (amount >= BETTING_TIERS[i].amount) {
        return BETTING_TIERS[i].winChance;
      }
    }
    return BETTING_TIERS[0].winChance;
  };

  const calculateMaxWin = (betAmount: number): number => {
    return Math.min(betAmount * 5, balance);
  };

  const adjustBet = (multiplier: number) => {
    const currentBet = parseFloat(betAmount) || 0;
    const newBet = Math.min(
      Math.max(Math.floor(currentBet * multiplier * 100) / 100, 1),
      Math.min(MAX_BET, balance)
    );
    setBetAmount(newBet.toString());
  };

  const rollDice = () => {
    const bet = parseFloat(betAmount);
    if (isNaN(bet) || bet <= 0 || bet > balance || bet > MAX_BET) return;

    setIsRolling(true);
    setDiceResult(null);
    setShowWinMessage(false);

    setIsBalanceAnimating(true);
    setBalance((prev) => prev - bet);
    setTimeout(() => setIsBalanceAnimating(false), 300);

    playSound(rollSound);

    setTimeout(() => {
      const winChance = getWinChance(bet);
      const randomValue = Math.random();
      const isWin = randomValue < winChance && selectedDice === Math.floor(Math.random() * 6) + 1;
      const result = isWin ? selectedDice : Math.floor(Math.random() * 6) + 1;
      
      setDiceResult(result);
      setIsRolling(false);

      const maxWin = calculateMaxWin(bet);
      const profit = isWin ? Math.min(bet * 5, maxWin) - bet : -bet;
      
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
        playSound(winSound);
        setShowWinMessage(true);
        setIsBalanceAnimating(true);
        setBalance((prev) => prev + Math.min(bet * 5, maxWin));
        setTimeout(() => setIsBalanceAnimating(false), 300);
      }
    }, 200);
  };

  useEffect(() => {
    rollSound.load();
    winSound.load();

    return () => {
      rollSound.pause();
      winSound.pause();
      rollSound.src = '';
      winSound.src = '';
    };
  }, [rollSound, winSound]);

  // Calculate current win chance based on bet amount
  const currentWinChance = getWinChance(parseFloat(betAmount) || 0);
  const maxPossibleWin = calculateMaxWin(parseFloat(betAmount) || 0);

  return (
    <div
      className={`min-h-screen ${
        modalClosed
          ? 'bg-gradient-to-b from-black via-[#0a0f1a] to-[#020817]'
          : 'bg-gradient-to-b from-[#0f172a] via-[#0a0f1a] to-[#020817]'
      } text-white`}
    >

      {/* Main Game Area */}
      <main className="container mx-auto px-2 md:px-4 py-3 md:py-8 flex flex-col gap-4 md:gap-8">
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
                You Win! {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(maxPossibleWin)}
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
                  >
                    <DivideCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (isNaN(value)) {
                        setBetAmount('');
                      } else {
                        setBetAmount(Math.min(value, Math.min(MAX_BET, balance)).toString());
                      }
                    }}
                    className="bg-[#0f172a] border border-[#1a2942] rounded px-3 py-2 md:px-4 md:py-3 w-full text-base md:text-lg focus:outline-none focus:border-[#3b82f6] transition-colors"
                    placeholder="Bet Amount"
                    min="1"
                    max={Math.min(MAX_BET, balance)}
                    step="1"
                  />
                  <button
                    onClick={() => adjustBet(2)}
                    className="bg-[#0f172a] hover:bg-[#1a2942] border border-[#1a2942] rounded p-2 md:p-3 transition-colors"
                    title="Double Bet"
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
                <div className="text-xs text-gray-400">
                  Max possible win: {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(maxPossibleWin)}
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
                      className={`w-10 h-10 md:w-14 md:h-14 rounded-lg bg-[#0f172a] border border-[#1a2942] flex items-center justify-center transition-all ${
                        selectedDice === dice
                          ? 'ring-2 ring-[#3b82f6] shadow-lg shadow-[#3b82f6]/20 scale-110'
                          : 'hover:bg-[#1a2942] hover:scale-105'
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
                  parseFloat(betAmount) > balance ||
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
                    {bet.profit >= 0 ? '+' : ''}{bet.profit.toFixed(2)}
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
      </main>

      {/* Instructions Modal */}
      <InstructionsModal isOpen={showInstructions} onClose={handleCloseModal} />
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

export default App;