import React, { useState, useEffect, useRef } from 'react';
import { Minus, Plus, History, Trophy, Sparkles, Zap } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { Border } from './border/Border';
import { StarToggle } from './components/StarToggle';

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

function App() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [selectedSide, setSelectedSide] = useState<'heads' | 'tails'>('heads');
  const [bet, setBet] = useState(1);
  const [balance, setBalance] = useState(8000);
  const [showImpact, setShowImpact] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [betHistory, setBetHistory] = useState<BetHistoryItem[]>([]);
  const [stats, setStats] = useState<GameStats>({
    totalWins: 0,
    totalLosses: 0,
    totalProfit: 0,
  });
  const [isTestMode, setIsTestMode] = useState(false);
  const [testWinRate, setTestWinRate] = useState(0.5);
  const [isFastMode, setIsFastMode] = useState(false);

  const soundsLoaded = useRef(false);
  const coinFlipSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'));
  const coinLandSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3'));
  const winSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'));
  const loseSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2961/2961-preview.mp3'));

  const MIN_BET = 0;
  const MAX_BET = 100000;

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

  const getWinChance = (betAmount: number): number => {
    if (isTestMode) return testWinRate;

    for (let i = BET_TIERS.length - 1; i >= 0; i--) {
      if (betAmount >= BET_TIERS[i].amount) {
        return BET_TIERS[i].winChance;
      }
    }
    return BET_TIERS[0].winChance;
  };

  useEffect(() => {
    if (!soundsLoaded.current) {
      const sounds = [
        coinFlipSound.current,
        coinLandSound.current,
        winSound.current,
        loseSound.current,
      ];

      const loadPromises = sounds.map(sound => {
        sound.load();
        sound.preload = 'auto';
        return new Promise((resolve) => {
          sound.addEventListener('canplaythrough', resolve, { once: true });
        });
      });

      Promise.all(loadPromises).then(() => {
        soundsLoaded.current = true;
      });

      return () => {
        sounds.forEach((sound) => {
          sound.pause();
          sound.currentTime = 0;
        });
      };
    }
  }, []);

  const playSound = async (sound: HTMLAudioElement) => {
    try {
      if (soundsLoaded.current) {
        sound.currentTime = 0;
        await sound.play();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleTestModeActivate = (winRate: number) => {
    setIsTestMode(true);
    setTestWinRate(winRate);
  };

  const adjustBet = (operation: 'increase' | 'decrease') => {
    if (operation === 'increase') {
      const newBet = Math.min(MAX_BET, bet * 2);
      setBet(Math.min(newBet, balance));
    } else {
      const newBet = Math.max(MIN_BET, bet / 2);
      setBet(newBet);
    }
  };

  const handleBetChange = (value: number) => {
    const cappedValue = Math.min(Math.max(MIN_BET, value), MAX_BET);
    setBet(Math.min(cappedValue, balance));
  };

  const flipCoin = async () => {
    if (isFlipping || bet > balance || bet <= 0) return;

    setIsFlipping(true);
    setShowImpact(false);

    if (!isFastMode) {
      await playSound(coinFlipSound.current);
    }

    const flipDuration = isFastMode ? 300 : 1500;

    setTimeout(async () => {
      if (!isFastMode) {
        await playSound(coinLandSound.current);
      }
      setShowImpact(true);

      const winChance = getWinChance(bet);
      const isWin = Math.random() < winChance;
      const newResult = isWin
        ? selectedSide
        : selectedSide === 'heads'
        ? 'tails'
        : 'heads';
      setResult(newResult);

      const rawProfit = isWin ? bet : -bet;
      const profit = isWin ? Math.min(rawProfit, balance) : rawProfit;
      setBalance((prev) => prev + profit);

      const newBetHistoryItem = {
        betAmount: bet,
        multiplier: isWin ? 2 : 0,
        isWin,
        profit,
      };

      setBetHistory((prev) => {
        const newHistory = [...prev, newBetHistoryItem];
        return newHistory.slice(-10); // Keep only last 10 bets
      });

      setStats((prevStats) => ({
        totalWins: prevStats.totalWins + (isWin ? 1 : 0),
        totalLosses: prevStats.totalLosses + (isWin ? 0 : 1),
        totalProfit: prevStats.totalProfit + profit,
      }));

      if (!isFastMode) {
        await playSound(isWin ? winSound.current : loseSound.current);
      }

      setIsFlipping(false);
    }, flipDuration);
  };

  const HelpModal = () => (
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
                  Choose Your Side:
                </span>{' '}
                Select either Heads or Tails before the flip (use number keys 1
                or 2 for quick selection)
              </li>
              <li className="leading-relaxed">
                <span className="font-semibold text-[#3b82f6]">
                  Place Your Bet:
                </span>{' '}
                Enter your bet amount using the controls (minimum ₹0, maximum
                ₹100,000)
              </li>
              <li className="leading-relaxed">
                <span className="font-semibold text-[#3b82f6]">
                  Flip the Coin:
                </span>{' '}
                Click the 'Flip' button to start the game
              </li>
              <li className="leading-relaxed">
                <span className="font-semibold text-[#3b82f6]">
                  Win Double:
                </span>{' '}
                If your chosen side matches the result, you win 2x your bet
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#182838] to-[#0f1923]">
      <Border
        balance={balance}
        onBackClick={() => console.log('Back clicked')}
        onHelpClick={() => setShowHelp(true)}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Game Section - Split into two columns on desktop */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Visual Game Elements */}
            <div className="w-full md:w-1/2 bg-[#182838]/80 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
              {/* Coin Section */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-[#3b82f6]/10 blur-3xl rounded-full ${
                      showImpact ? 'animate-impact' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-[#3b82f6]/5 blur-2xl rounded-full animate-glow" />
                  <div
                    className={`w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-1000 ${
                      isFlipping ? 'animate-flip' : ''
                    }`}
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
                    }}
                  >
                    <img
                      src="https://media-hosting.imagekit.io/2f36d5203b8d4f92/download.png?Expires=1839243587&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OYLiklQHV-Anmk-ZHrm48ZzJ5X-QOtQJYPXQ32UR9SA01yNloiaz5qcNsOGuPhdfb6ucej4X39JsasuM0BJYJbjUA3W0ZFL9QzsTjQlTXWzHc3xrWlgWNGjRDpPkyXstXdpgKWI0hDkRcdY5XD2qUVhNfu57hWZma8Umvs1XQPO4LZcGsNAQcj87nGDtDa0c63daVhp1JbAG8grV5GCuTXWBhHgxMMGkWccFTzRifZ5AJiHcbTfMX5MNbec9t~qFWH-gSZDicNQhQQzXdIadnoEpzkZgzYoMXltbToTJaWc6NeAOqKLvs4oGXMlto1Yf5q69u6oGupBrDWXbA-VhHw__"
                      alt="Heads"
                      className={`absolute w-full h-full object-cover rounded-full border-8 border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.3)] ${
                        isFlipping
                          ? 'animate-face-switch'
                          : result === 'heads'
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                    <img
                      src="https://media-hosting.imagekit.io/06f942dfa71f4746/ChatGPT%20Image%20Apr%2014,%202025,%2006_44_12%20PM-modified.png?Expires=1839244559&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fsbz~lV8NXqAOnwC0vxBXziIL3ss-oau945xTjXBUNqAmKaYLdelamOTaCTUwWztMw9aEA2Ynu1WVcrIi6cUHE7YjnQgmeXegUF0cLGRTog1BxWBCQ27rr5ssl8-yxkuZi3ikl9t-r0LR8NcuDvZ1-qj47ez70NBsXbogA~MW1augxt9JK6RgWSr~Ku0GlGQe20yj6Uzx~qZ~a2rNoo5SWXjZbEcCPQY~1RR1XBtyBY~z4uT37AqqNLG48j6oxYd9fj6av~pt1Lk7uZoDj916kM~lyIoDubhob~lujxy1YZuqoS2~UYjZ~KjcZ6TD57PeRboQZORAhzt3Sn11HTOTQ__"
                      alt="Tails"
                      className={`absolute w-full h-full object-cover rounded-full border-8 border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.3)] ${
                        isFlipping
                          ? 'animate-face-switch'
                          : result === 'tails'
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Side Selection */}
              <div className="flex justify-center gap-8">
                <button
                  onClick={() => setSelectedSide('heads')}
                  className={`relative group ${
                    selectedSide === 'heads' ? 'scale-110' : 'opacity-50'
                  } transition-all`}
                >
                  <div className="text-sm mb-2 text-[#3b82f6] text-center">
                    Head (1)
                  </div>
                  <div
                    className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
                      selectedSide === 'heads'
                        ? 'border-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'border-[#182838]'
                    }`}
                  >
                    <img
                      src="https://media-hosting.imagekit.io/2f36d5203b8d4f92/download.png?Expires=1839243587&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=OYLiklQHV-Anmk-ZHrm48ZzJ5X-QOtQJYPXQ32UR9SA01yNloiaz5qcNsOGuPhdfb6ucej4X39JsasuM0BJYJbjUA3W0ZFL9QzsTjQlTXWzHc3xrWlgWNGjRDpPkyXstXdpgKWI0hDkRcdY5XD2qUVhNfu57hWZma8Umvs1XQPO4LZcGsNAQcj87nGDtDa0c63daVhp1JbAG8grV5GCuTXWBhHgxMMGkWccFTzRifZ5AJiHcbTfMX5MNbec9t~qFWH-gSZDicNQhQQzXdIadnoEpzkZgzYoMXltbToTJaWc6NeAOqKLvs4oGXMlto1Yf5q69u6oGupBrDWXbA-VhHw__"
                      alt="Heads"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
                <button
                  onClick={() => setSelectedSide('tails')}
                  className={`relative group ${
                    selectedSide === 'tails' ? 'scale-110' : 'opacity-50'
                  } transition-all`}
                >
                  <div className="text-sm mb-2 text-[#3b82f6] text-center">
                    Tail (2)
                  </div>
                  <div
                    className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
                      selectedSide === 'tails'
                        ? 'border-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                        : 'border-[#182838]'
                    }`}
                  >
                    <img
                      src="https://media-hosting.imagekit.io/06f942dfa71f4746/ChatGPT%20Image%20Apr%2014,%202025,%2006_44_12%20PM-modified.png?Expires=1839244559&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=fsbz~lV8NXqAOnwC0vxBXziIL3ss-oau945xTjXBUNqAmKaYLdelamOTaCTUwWztMw9aEA2Ynu1WVcrIi6cUHE7YjnQgmeXegUF0cLGRTog1BxWBCQ27rr5ssl8-yxkuZi3ikl9t-r0LR8NcuDvZ1-qj47ez70NBsXbogA~MW1augxt9JK6RgWSr~Ku0GlGQe20yj6Uzx~qZ~a2rNoo5SWXjZbEcCPQY~1RR1XBtyBY~z4uT37AqqNLG48j6oxYd9fj6av~pt1Lk7uZoDj916kM~lyIoDubhob~lujxy1YZuqoS2~UYjZ~KjcZ6TD57PeRboQZORAhzt3Sn11HTOTQ__"
                      alt="Tails"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column - Game Controls */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              {/* Betting Controls */}
              <div className="bg-[#182838]/80 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
                <div className="space-y-6">
                  {/* Bet Amount Control */}
                  <div className="flex items-center gap-3 justify-center">
                    <button
                      onClick={() => adjustBet('decrease')}
                      className="w-14 h-14 bg-[#0f1923] text-[#3b82f6] rounded-lg flex items-center justify-center hover:bg-[#1e3346] transition-colors border border-[#3b82f6]/20 shadow-lg hover:shadow-[#3b82f6]/20"
                    >
                      <Minus size={24} />
                    </button>
                    <NumericFormat
                      value={bet}
                      onValueChange={(values) => handleBetChange(values.floatValue || 0)}
                      decimalScale={2}
                      fixedDecimalScale
                      thousandSeparator=","
                      prefix="₹"
                      allowNegative={false}
                      className="w-40 h-14 bg-[#0f1923] text-[#3b82f6] text-center text-2xl font-bold rounded-lg border border-[#3b82f6]/20 focus:outline-none focus:border-[#3b82f6] transition-colors"
                    />
                    <button
                      onClick={() => adjustBet('increase')}
                      className="w-14 h-14 bg-[#0f1923] text-[#3b82f6] rounded-lg flex items-center justify-center hover:bg-[#1e3346] transition-colors border border-[#3b82f6]/20 shadow-lg hover:shadow-[#3b82f6]/20"
                    >
                      <Plus size={24} />
                    </button>
                  </div>

                  {/* Speed Toggle and Flip Button */}
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setIsFastMode(!isFastMode)}
                      className={`w-full py-4 rounded-lg text-lg font-semibold transition-all transform flex items-center justify-center gap-2 ${
                        isFastMode
                          ? 'bg-[#3b82f6] text-white'
                          : 'bg-[#0f1923] text-[#3b82f6] border border-[#3b82f6]'
                      }`}
                    >
                      <Zap size={20} />
                      Fast Mode
                    </button>

                    <button
                      onClick={flipCoin}
                      disabled={isFlipping || bet > balance || bet <= 0}
                      className={`w-full py-4 rounded-lg text-xl font-bold transition-all transform ${
                        isFlipping || bet > balance || bet <= 0
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white hover:scale-[1.02] shadow-lg hover:shadow-[#3b82f6]/20'
                      }`}
                    >
                      {isFlipping ? 'Flipping...' : 'Flip'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="bg-[#182838]/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#3b82f6]" />
                  Stats
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#0f1923] rounded-lg p-4">
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
                  <div className="bg-[#0f1923] rounded-lg p-4">
                    <div className="text-sm text-gray-400">Wins</div>
                    <div className="text-xl font-bold text-green-500">
                      {stats.totalWins}
                    </div>
                  </div>
                  <div className="bg-[#0f1923] rounded-lg p-4">
                    <div className="text-sm text-gray-400">Losses</div>
                    <div className="text-xl font-bold text-red-500">
                      {stats.totalLosses}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bets Section - Full Width */}
          <div className="mt-8 bg-[#182838]/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <History className="w-5 h-5 text-[#3b82f6]" />
              Recent Bets
            </h2>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {betHistory.length === 0 ? (
                <div className="text-gray-400 text-center p-4 bg-[#0f1923] rounded-lg">
                  No bets yet. Start playing!
                </div>
              ) : (
                betHistory
                  .slice()
                  .reverse()
                  .map((bet, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded ${
                        bet.isWin ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-white">
                          {bet.multiplier.toFixed(2)}×
                        </div>
                        <div className="text-xs text-gray-400">
                          ₹{bet.betAmount.toFixed(2)} bet
                        </div>
                      </div>
                      <div
                        className={`text-sm font-bold ${
                          bet.isWin ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {bet.profit >= 0 ? '+' : ''}₹{bet.profit.toFixed(2)}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>

      <StarToggle onActivate={handleTestModeActivate} />

      {showHelp && <HelpModal />}
    </div>
  );
}

export default App;