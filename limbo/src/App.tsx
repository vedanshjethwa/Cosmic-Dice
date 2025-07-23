import React, { useState, useRef, useEffect } from 'react';
import { Target, Minus, Plus, HelpCircle, X, Sparkles } from 'lucide-react';
import { TopBorder } from './components/TopBorder/TopBorder';
import { StarToggle } from './components/star';

interface BetHistory {
  multiplier: number;
  betAmount: number;
  targetMultiplier: number;
  profit: number;
  isWin: boolean;
  timestamp: number;
}

const SOUNDS = {
  win: {
    mp3: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3',
    ogg: 'https://assets.mixkit.co/active_storage/sfx/2017/2017.ogg',
  },
  lose: {
    mp3: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
    ogg: 'https://assets.mixkit.co/active_storage/sfx/2018/2018.ogg',
  },
};

const INITIAL_BALANCE = 1000;
const MAX_BET = 100000;
const MIN_BET = 0;
const MAX_MULTIPLIER = 100;

const TEST_WALLETS = {
  'vedansh111': 0.85,
  'cosmic111': 0.65,
  'cosmicwin777': 0.50
};

function App() {
  const [betAmount, setBetAmount] = useState<string>('10');
  const [targetMultiplier, setTargetMultiplier] = useState<string>('2.00');
  const [currentMultiplier, setCurrentMultiplier] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [stats, setStats] = useState({
    totalProfit: 0,
    totalWins: 0,
    totalLosses: 0,
  });
  const [betHistory, setBetHistory] = useState<BetHistory[]>([]);
  const [activeWallet, setActiveWallet] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const winSoundMP3 = useRef<HTMLAudioElement | null>(null);
  const winSoundOGG = useRef<HTMLAudioElement | null>(null);
  const loseSoundMP3 = useRef<HTMLAudioElement | null>(null);
  const loseSoundOGG = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const createAudio = (src: string) => {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.volume = 0.7;
      audio.src = src;
      return audio;
    };

    winSoundMP3.current = createAudio(SOUNDS.win.mp3);
    winSoundOGG.current = createAudio(SOUNDS.win.ogg);
    loseSoundMP3.current = createAudio(SOUNDS.lose.mp3);
    loseSoundOGG.current = createAudio(SOUNDS.lose.ogg);

    const preloadAudio = async (audio: HTMLAudioElement) => {
      try {
        await audio.load();
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              audio.pause();
              audio.currentTime = 0;
            })
            .catch(() => {});
        }
      } catch (error) {
        console.warn('Audio preload failed:', error);
      }
    };

    if (winSoundMP3.current) preloadAudio(winSoundMP3.current);
    if (winSoundOGG.current) preloadAudio(winSoundOGG.current);
    if (loseSoundMP3.current) preloadAudio(loseSoundMP3.current);
    if (loseSoundOGG.current) preloadAudio(loseSoundOGG.current);

    return () => {
      [winSoundMP3, winSoundOGG, loseSoundMP3, loseSoundOGG].forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current = null;
        }
      });
    };
  }, []);

  const currentBalance = INITIAL_BALANCE + stats.totalProfit;

  const calculateWinChance = () => {
    const targetMultiplierNum = parseFloat(targetMultiplier);
    if (isNaN(targetMultiplierNum) || targetMultiplierNum <= 1) return 0;

    let baseChance = (1 / targetMultiplierNum) * 95;
    
    // Apply wallet-specific win rates
    if (activeWallet && TEST_WALLETS[activeWallet as keyof typeof TEST_WALLETS]) {
      baseChance = TEST_WALLETS[activeWallet as keyof typeof TEST_WALLETS] * 100;
    }

    const finalChance = Math.max(1, Math.min(95, baseChance));
    return finalChance.toFixed(2);
  };

  const handleBetAmountChange = (operation: 'half' | 'double') => {
    const currentAmount = parseFloat(betAmount.replace(',', '.'));
    if (isNaN(currentAmount)) return;

    let newAmount = operation === 'half' ? currentAmount / 2 : currentAmount * 2;
    newAmount = Math.min(newAmount, currentBalance, MAX_BET);
    newAmount = Math.max(newAmount, MIN_BET);

    setBetAmount(newAmount.toFixed(2));
  };

  const handleBetAmountInput = (value: string) => {
    // Replace comma with dot for decimal numbers
    const sanitizedValue = value.replace(',', '.');
    const numValue = parseFloat(sanitizedValue);

    if (sanitizedValue === '' || sanitizedValue === '.') {
      setBetAmount(sanitizedValue);
      return;
    }

    if (isNaN(numValue)) {
      return;
    }

    if (numValue > Math.min(currentBalance, MAX_BET)) {
      setBetAmount(Math.min(currentBalance, MAX_BET).toFixed(2));
    } else {
      // Allow two decimal places
      const formattedValue = numValue.toString().includes('.') 
        ? numValue.toFixed(Math.min(sanitizedValue.split('.')[1].length, 2))
        : numValue.toString();
      setBetAmount(formattedValue);
    }
  };

  const generateRandomMultiplier = () => {
    const targetMultiplierNum = parseFloat(targetMultiplier);
    const winChance = parseFloat(calculateWinChance()) / 100;

    const rand = Math.random();
    const multiplier =
      rand < winChance
        ? targetMultiplierNum + Math.random() * targetMultiplierNum * 0.1
        : 1 + Math.random() * (targetMultiplierNum - 1) * 0.9;

    return Math.min(multiplier, MAX_MULTIPLIER);
  };

  const calculateProfit = (
    betAmountNum: number,
    targetMultiplierNum: number,
    finalMultiplier: number
  ) => {
    if (finalMultiplier >= targetMultiplierNum) {
      const potentialWin = betAmountNum * (targetMultiplierNum - 1);
      return Math.min(potentialWin, currentBalance);
    }
    return -betAmountNum;
  };

  const playResultSound = async (isWin: boolean) => {
    const primarySound = isWin ? winSoundMP3.current : loseSoundMP3.current;
    const fallbackSound = isWin ? winSoundOGG.current : loseSoundOGG.current;

    const attemptPlay = async (audio: HTMLAudioElement | null) => {
      if (!audio) return false;
      try {
        audio.currentTime = 0;
        await audio.play();
        return true;
      } catch (error) {
        console.warn('Sound playback failed:', error);
        return false;
      }
    };

    if (!(await attemptPlay(primarySound))) {
      await attemptPlay(fallbackSound);
    }
  };

  const calculatePotentialWin = () => {
    const betAmountNum = parseFloat(betAmount.replace(',', '.'));
    const targetMultiplierNum = parseFloat(targetMultiplier);
    if (isNaN(betAmountNum) || isNaN(targetMultiplierNum)) return 0;
    const potentialWin = betAmountNum * (targetMultiplierNum - 1);
    return Math.min(potentialWin, currentBalance);
  };

  const placeBet = async () => {
    if (isRolling) return;

    const betAmountNum = parseFloat(betAmount.replace(',', '.'));
    const targetMultiplierNum = parseFloat(targetMultiplier);

    if (isNaN(betAmountNum) || isNaN(targetMultiplierNum)) return;
    if (betAmountNum > MAX_BET) return;
    if (betAmountNum > currentBalance) return;
    if (targetMultiplierNum <= 1) return;

    setIsRolling(true);
    setCurrentMultiplier(1.0);

    const finalMultiplier = generateRandomMultiplier();
    const startTime = performance.now();
    const duration = 800;

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
      const currentProgress = easeOut(progress);

      const current = 1 + (finalMultiplier - 1) * currentProgress;
      setCurrentMultiplier(parseFloat(current.toFixed(2)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        const isWin = finalMultiplier >= targetMultiplierNum;
        const profit = calculateProfit(
          betAmountNum,
          targetMultiplierNum,
          finalMultiplier
        );

        playResultSound(isWin);

        setStats((prev) => ({
          totalProfit: prev.totalProfit + profit,
          totalWins: prev.totalWins + (isWin ? 1 : 0),
          totalLosses: prev.totalLosses + (isWin ? 0 : 1),
        }));

        setBetHistory((prev) => [
          ...prev,
          {
            multiplier: finalMultiplier,
            betAmount: betAmountNum,
            targetMultiplier: targetMultiplierNum,
            profit,
            isWin,
            timestamp: Date.now(),
          },
        ]);

        setIsRolling(false);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gradient-game text-white">
      <TopBorder
        balance={currentBalance}
        onBackClick={() => {}}
        onHelpClick={() => setShowHelp(true)}
      />

      <main className="pt-20 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Balloon Board */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
              {/* Moved Target Multiplier and Win Chance above the counter */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Target Multiplier
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={targetMultiplier}
                      onChange={(e) => setTargetMultiplier(e.target.value)}
                      step="0.01"
                      min="1.01"
                      className="w-full bg-black/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none border border-blue-500/20"
                      disabled={isRolling}
                    />
                    <Target className="absolute right-3 top-3 text-blue-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Win Chance
                  </label>
                  <div className="relative bg-black/50 rounded-lg px-4 py-3 border border-blue-500/20">
                    <span className="text-lg font-medium text-blue-400">
                      {calculateWinChance()}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center h-48">
                <div
                  className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  style={{ fontFamily: 'monospace' }}
                >
                  {currentMultiplier ? currentMultiplier.toFixed(2) : '0.00'}×
                </div>
              </div>
            </div>

            {/* Right Side - Controls */}
            <div className="space-y-6">
              {/* Amount Input */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Bet Amount
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleBetAmountChange('half')}
                        className="p-2 rounded-lg bg-black/50 hover:bg-blue-500/20 transition-colors disabled:opacity-50 border border-blue-500/20"
                        disabled={isRolling}
                      >
                        <Minus className="w-5 h-5 text-blue-400" />
                      </button>
                      <input
                        type="text"
                        value={betAmount}
                        onChange={(e) => handleBetAmountInput(e.target.value)}
                        className="flex-1 bg-black/50 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-500 outline-none border border-blue-500/20"
                        disabled={isRolling}
                      />
                      <button
                        onClick={() => handleBetAmountChange('double')}
                        className="p-2 rounded-lg bg-black/50 hover:bg-blue-500/20 transition-colors disabled:opacity-50 border border-blue-500/20"
                        disabled={
                          isRolling ||
                          parseFloat(betAmount.replace(',', '.')) * 2 >
                            Math.min(currentBalance, MAX_BET)
                        }
                      >
                        <Plus className="w-5 h-5 text-blue-400" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-400 text-center">
                    Potential Win: ₹{calculatePotentialWin().toFixed(2)}
                  </div>

                  <button
                    onClick={placeBet}
                    disabled={
                      isRolling ||
                      parseFloat(betAmount.replace(',', '.')) > Math.min(currentBalance, MAX_BET)
                    }
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                      isRolling ||
                      parseFloat(betAmount.replace(',', '.')) > Math.min(currentBalance, MAX_BET)
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    }`}
                  >
                    {isRolling
                      ? 'Rolling...'
                      : parseFloat(betAmount.replace(',', '.')) > currentBalance
                      ? 'Insufficient Balance'
                      : parseFloat(betAmount.replace(',', '.')) > MAX_BET
                      ? 'Exceeds Maximum Bet'
                      : 'Place Bet'}
                  </button>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                <h2 className="text-xl font-bold mb-4">Stats</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                    <div className="text-sm text-gray-400">Total Profit</div>
                    <div
                      className={`text-xl font-bold ${
                        stats.totalProfit >= 0
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      ₹{stats.totalProfit.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                    <div className="text-sm text-gray-400">Wins</div>
                    <div className="text-xl font-bold text-green-500">
                      {stats.totalWins}
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4 border border-blue-500/20">
                    <div className="text-sm text-gray-400">Losses</div>
                    <div className="text-xl font-bold text-red-500">
                      {stats.totalLosses}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Full Width - Recent Bets */}
          <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <h2 className="text-xl font-bold mb-4">Recent Bets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {betHistory
                .slice(-8)
                .reverse()
                .map((bet, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      bet.isWin
                        ? 'bg-green-500/10 border border-green-500/20'
                        : 'bg-red-500/10 border border-red-500/20'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold">
                        {bet.multiplier.toFixed(2)}×
                      </span>
                      <span
                        className={`font-bold ${
                          bet.isWin ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {bet.profit >= 0 ? '+' : ''}₹{bet.profit.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Bet: ₹{bet.betAmount.toFixed(2)} | Target:{' '}
                      {bet.targetMultiplier.toFixed(2)}×
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#182838] rounded-xl max-w-lg w-full p-6 space-y-6">
            <h2 className="text-2xl font-bold text-[#3b82f6] flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              How to Play
            </h2>
            <div className="space-y-4">
              <div className="bg-[#0f1923] rounded-lg p-4">
                <ol className="list-decimal list-inside space-y-3 text-gray-200">
                  <li className="leading-relaxed">
                    <span className="font-semibold text-[#3b82f6]">
                      Choose Target Multiplier:
                    </span>{' '}
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li>Higher multipliers = bigger wins but harder to achieve</li>
                      <li>Be strategic with your choices!</li>
                    </ul>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-[#3b82f6]">
                      Watch and Win:
                    </span>{' '}
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li>The multiplier starts at 1.00× and increases</li>
                      <li>If it reaches your target, you win!</li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-3 bg-[#3b82f6] text-white rounded-lg font-semibold hover:bg-[#60a5fa] transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      <StarToggle 
        onDevModeEnabled={(wallet: string) => {
          setActiveWallet(wallet);
        }} 
      />
    </div>
  );
}

export default App;