import React, { useState, useMemo } from 'react';
import { Hand, Scroll, Scissors, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Border } from './border/Border';
import { StarToggle } from './star/StarToggle';

type Choice = 'rock' | 'paper' | 'scissors' | null;

const AUDIO_URLS = {
  rock: 'https://cdn.freesound.org/previews/240/240876_4107740-lq.mp3',
  paper: 'https://cdn.freesound.org/previews/240/240877_4107740-lq.mp3',
  scissors: 'https://cdn.freesound.org/previews/240/240878_4107740-lq.mp3',
  win: 'https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3',
  lose: 'https://cdn.freesound.org/previews/76/76376_877451-lq.mp3',
};

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

class AudioManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private loaded: { [key: string]: boolean } = {};
  private initialized: boolean = false;
  private currentSound: HTMLAudioElement | null = null;

  constructor() {
    Object.entries(AUDIO_URLS).forEach(([key, url]) => {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = url;
      this.sounds[key] = audio;
      this.loaded[key] = false;

      audio.addEventListener('canplaythrough', () => {
        this.loaded[key] = true;
      });
    });
  }

  initialize() {
    if (this.initialized) return;
    Object.values(this.sounds).forEach(audio => audio.load());
    this.initialized = true;
  }

  play(key: string) {
    if (!this.initialized) {
      this.initialize();
    }

    if (!this.loaded[key] || !this.sounds[key]) return;

    try {
      // Stop any currently playing sound
      if (this.currentSound) {
        this.currentSound.pause();
        this.currentSound.currentTime = 0;
      }

      const sound = this.sounds[key];
      sound.currentTime = 0;
      this.currentSound = sound;
      
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn(`Error playing sound ${key}:`, error);
        });
      }
    } catch (error) {
      console.warn(`Error playing sound ${key}:`, error);
    }
  }

  stopAll() {
    if (this.currentSound) {
      this.currentSound.pause();
      this.currentSound.currentTime = 0;
      this.currentSound = null;
    }
  }
}

const audioManager = new AudioManager();

interface BetHistoryEntry {
  id: string;
  timestamp: number;
  amount: number;
  winAmount: number;
  multiplier: number;
  profit: number;
  isWin: boolean;
}

function App() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [betAmount, setBetAmount] = useState(10);
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState<string>('');
  const [potentialWin, setPotentialWin] = useState(20);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [testWinRate, setTestWinRate] = useState(0);
  const [betHistory, setBetHistory] = useState<BetHistoryEntry[]>([]);

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
    if (isTestMode) return testWinRate;
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
    // Convert string input to number and handle commas
    const numericValue = typeof value === 'string' 
      ? parseFloat(value.replace(/,/g, '')) 
      : value;

    // Handle NaN and negative values
    if (isNaN(numericValue) || numericValue < 0) {
      setBetAmount(0);
      setPotentialWin(0);
      return;
    }

    // Limit to 2 decimal places and max bet
    const newBet = Math.min(
      parseFloat(numericValue.toFixed(2)),
      Math.min(100000, balance)
    );

    setBetAmount(newBet);
    const calculatedWin = newBet * 2;
    setPotentialWin(Math.min(calculatedWin, balance));
  };

  const incrementBet = () => handleBetChange(betAmount + 1);
  const decrementBet = () => handleBetChange(betAmount - 1);

  const determineWinner = (player: Choice, computer: Choice) => {
    const timestamp = Date.now();
    const id = `${timestamp}-${Math.random()}`;

    if (player === computer) {
      setResult('Draw!');
      setBalance((prev) => prev);
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
      const winAmount = Math.min(betAmount * 2, balance);
      setResult('You Win!');
      setBalance((prev) => prev + winAmount);
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
      audioManager.play('win');
    } else {
      setResult('Computer Wins!');
      setBalance((prev) => prev - betAmount);
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
      audioManager.play('lose');
    }
  };

  const handleChoice = (choice: Choice) => {
    if (betAmount < 0 || betAmount > balance || !choice) return;

    audioManager.initialize();
    audioManager.stopAll(); // Stop any playing sounds before starting new ones
    audioManager.play(choice);
    setPlayerChoice(choice);
    const computerMove = makeComputerChoice();
    setComputerChoice(computerMove);
    determineWinner(choice, computerMove);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Border
        balance={balance}
        onBackClick={() => window.history.back()}
        onHelpClick={() => setShowHowToPlay(true)}
      />

      {showHowToPlay && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1B2838] rounded-lg p-4 sm:p-8 max-w-md w-full mx-auto relative border border-[#2A4562]">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              Game Rules
            </h2>
            <div className="space-y-4">
              <div className="bg-[#0f1923] rounded-lg p-4">
                <ol className="list-decimal list-inside space-y-3 text-gray-200">
                  <li className="leading-relaxed">
                    <span className="font-semibold text-[#3b82f6]">
                      Choose your move wisely!
                    </span>
                    Each option can defeat one other:
                    <ul className="list-disc list-inside pl-5 mt-2 space-y-1">
                      <li>🗿 Rock defeats ✂️ Scissors</li>
                      <li>📄 Paper defeats 🗿 Rock</li>
                      <li>✂️ Scissors defeats 📄 Paper</li>
                    </ul>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-[#3b82f6]">
                      Betting Rules:
                    </span>
                    <ul className="list-disc list-inside pl-5 mt-2 space-y-1">
                      <li>Win double your bet amount on victory</li>
                      <li>Lose your bet on defeat</li>
                      <li>Your balance remains unchanged on a draw</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
            <button
              onClick={() => setShowHowToPlay(false)}
              className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-semibold hover:bg-[#60a5fa] transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Game Area */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#0D1117] rounded-lg p-6 border border-[#30363D]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {['rock', 'paper', 'scissors'].map((choice) => (
                  <motion.button
                    key={choice}
                    onClick={() => handleChoice(choice as Choice)}
                    className="bg-[#0D1117] hover:bg-[#21262D] p-6 rounded-lg transition-all border border-[#30363D] relative group"
                    disabled={betAmount < 0 || betAmount > balance}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-4">
                      {choice === 'rock' && (
                        <Hand className="w-8 h-8 text-white" />
                      )}
                      {choice === 'paper' && (
                        <Scroll className="w-8 h-8 text-white" />
                      )}
                      {choice === 'scissors' && (
                        <Scissors className="w-8 h-8 text-white" />
                      )}
                      <span className="text-xl font-medium capitalize text-white">
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
                  className="bg-[#1A2634] rounded-lg p-6 border border-[#30363D]"
                >
                  <div className="flex justify-center items-center gap-4 sm:gap-8 mb-4">
                    <div className="text-white">
                      <div className="text-lg mb-2">You</div>
                      <div className="bg-[#0D1117] p-4 rounded-lg border border-[#30363D]">
                        {playerChoice === 'rock' && (
                          <Hand className="w-12 h-12" />
                        )}
                        {playerChoice === 'paper' && (
                          <Scroll className="w-12 h-12" />
                        )}
                        {playerChoice === 'scissors' && (
                          <Scissors className="w-12 h-12" />
                        )}
                      </div>
                    </div>
                    <div className="text-white text-4xl font-bold">VS</div>
                    <div className="text-white">
                      <div className="text-lg mb-2">Computer</div>
                      <div className="bg-[#0D1117] p-4 rounded-lg border border-[#30363D]">
                        {computerChoice === 'rock' && (
                          <Hand className="w-12 h-12" />
                        )}
                        {computerChoice === 'paper' && (
                          <Scroll className="w-12 h-12" />
                        )}
                        {computerChoice === 'scissors' && (
                          <Scissors className="w-12 h-12" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-[#2979FF] mt-4 text-center">
                    {result}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Side - Betting Controls and Stats */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Betting Controls */}
            <div className="bg-[#0D1117] rounded-lg p-6 border border-[#30363D]">
              <h2 className="text-2xl font-bold text-white mb-6">
                Place Your Bet
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrementBet}
                    className="bg-[#21262D] hover:bg-[#30363D] text-white p-3 rounded-lg transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={betAmount.toFixed(2)}
                    onChange={(e) => handleBetChange(e.target.value)}
                    className="flex-1 bg-[#1A2634] text-white text-center p-3 rounded-lg outline-none border border-[#30363D]"
                    min="0"
                    step="0.01"
                    max={Math.min(100000, balance)}
                  />
                  <button
                    onClick={incrementBet}
                    className="bg-[#21262D] hover:bg-[#30363D] text-white p-3 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Potential Win</span>
                  <span>₹{potentialWin.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleChoice(playerChoice)}
                  className="w-full bg-[#2979FF] hover:bg-[#5393FF] text-black font-bold px-6 py-4 rounded-lg transition-colors text-lg"
                  disabled={betAmount < 0 || betAmount > balance}
                >
                  Place Bet
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#0D1117] rounded-lg p-6 border border-[#30363D]">
              <h2 className="text-xl font-bold text-white mb-4">Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1A2634] rounded-lg p-4">
                  <div className="text-sm text-gray-400">Total Profit</div>
                  <div
                    className={`text-xl font-bold ${
                      stats.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stats.totalProfit >= 0 ? '+' : ''}₹{stats.totalProfit.toFixed(2)}
                  </div>
                </div>
                <div className="bg-[#1A2634] rounded-lg p-4">
                  <div className="text-sm text-gray-400">Wins</div>
                  <div className="text-xl font-bold text-green-500">
                    {stats.totalWins}
                  </div>
                </div>
                <div className="bg-[#1A2634] rounded-lg p-4">
                  <div className="text-sm text-gray-400">Losses</div>
                  <div className="text-xl font-bold text-red-500">
                    {stats.totalLosses}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bets - Landscape Mode */}
            <div className="bg-[#0D1117] rounded-lg p-6 border border-[#30363D]">
              <h2 className="text-xl font-bold text-white mb-4">Recent Bets</h2>
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Header */}
                  <div className="grid grid-cols-4 gap-4 pb-3 mb-3 border-b border-[#30363D] text-sm text-gray-400 font-medium">
                    <div>Result</div>
                    <div>Bet Amount</div>
                    <div>Win Amount</div>
                    <div>Profit/Loss</div>
                  </div>
                  
                  {/* Bet History Rows */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {betHistory.slice(0, 15).map((record) => (
                      <div
                        key={record.id}
                        className={`grid grid-cols-4 gap-4 py-3 px-3 rounded-lg border ${
                          record.isWin
                            ? 'bg-green-500/10 border-green-500/20'
                            : record.profit === 0
                            ? 'bg-blue-500/10 border-blue-500/20'
                            : 'bg-red-500/10 border-red-500/20'
                        }`}
                      >
                        <div className={`font-bold ${
                          record.isWin 
                            ? 'text-green-500' 
                            : record.profit === 0 
                            ? 'text-blue-400' 
                            : 'text-red-500'
                        }`}>
                          {record.isWin ? 'Won' : record.profit === 0 ? 'Draw' : 'Lost'}
                        </div>
                        <div className="text-gray-300">
                          ₹{record.amount.toFixed(2)}
                        </div>
                        <div className="text-gray-300">
                          ₹{record.winAmount.toFixed(2)}
                        </div>
                        <div className={`font-bold ${
                          record.profit > 0 
                            ? 'text-green-500' 
                            : record.profit === 0 
                            ? 'text-blue-400' 
                            : 'text-red-500'
                        }`}>
                          {record.profit >= 0 ? '+' : ''}₹{record.profit.toFixed(2)}
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
          </div>
        </div>
      </div>

      <StarToggle
        onActivate={(winRate) => {
          setIsTestMode(true);
          setTestWinRate(winRate);
          console.log(`Test mode activated with win rate: ${winRate}`);
        }}
      />
    </div>
  );
}

export default App;