import React, { useState, useEffect, useRef } from 'react';
import { HowToPlayModal } from './components/HowToPlayModal';
import { StarToggle } from './star/StarToggle';
import { calculateWinChance, BET_TIERS } from './star/winChance';
import { Minus, Plus } from 'lucide-react';

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

function App() {
  const [bet, setBet] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalMultiplier, setTotalMultiplier] = useState(1);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [hasPopped, setHasPopped] = useState(false);
  const [betHistory, setBetHistory] = useState<BetRecord[]>([]);
  const [testWinRate, setTestWinRate] = useState<number | null>(null);
  const [stats, setStats] = useState({
    totalProfit: 0,
    totalWins: 0,
    totalLosses: 0
  });

  const popSoundRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    popSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    popSoundRef.current.preload = 'auto';
  }, []);
  
  const colors = [
    { gradient: 'from-pink-400 via-pink-500 to-rose-600', glow: 'pink-300', shine: 'pink-200' },
    { gradient: 'from-cyan-400 via-cyan-500 to-blue-600', glow: 'cyan-300', shine: 'cyan-200' },
    { gradient: 'from-yellow-400 via-amber-500 to-orange-600', glow: 'yellow-300', shine: 'yellow-200' },
    { gradient: 'from-emerald-400 via-emerald-500 to-green-600', glow: 'emerald-300', shine: 'emerald-200' },
    { gradient: 'from-violet-400 via-violet-500 to-purple-600', glow: 'violet-300', shine: 'violet-200' }
  ];

  const getWinChance = (betAmount: number): number => {
    return calculateWinChance(betAmount, testWinRate);
  };

  const handleTestMode = (winRate: number) => {
    setTestWinRate(winRate);
  };

  const generateMultipliers = (betAmount: number): number[] => {
    const winChance = getWinChance(betAmount);
    const maxMultiplier = 5;

    const multipliers = [0.2, 0.5];
    
    if (Math.random() < winChance) {
      multipliers.push(...[1, 1.5, 2]);
    }
    if (Math.random() < winChance / 2) {
      multipliers.push(...[2.5, 3]);
    }
    if (Math.random() < winChance / 4) {
      multipliers.push(...[3.5, 4]);
    }
    if (Math.random() < winChance / 8) {
      multipliers.push(...[4.5, 5]);
    }

    while (multipliers.length < 7) {
      multipliers.push(0.2);
    }

    return multipliers;
  };

  useEffect(() => {
    setBalloons(generateBalloons());
  }, []);

  const generateBalloons = () => {
    const newBalloons: Balloon[] = [];
    const multipliers = generateMultipliers(bet);
    
    for (let i = 0; i < 15; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
      newBalloons.push({
        id: i,
        color: randomColor.gradient,
        multiplier: randomMultiplier,
        revealed: false
      });
    }
    return newBalloons;
  };

  const startGame = () => {
    setIsPlaying(true);
    setTotalMultiplier(1);
    setBalloons(generateBalloons());
    setHasPopped(false);
    setShowResult(false);
  };

  const playPopSound = async () => {
    if (popSoundRef.current) {
      try {
        popSoundRef.current.currentTime = 0;
        await popSoundRef.current.play();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
  };

  const popBalloon = async (balloon: Balloon) => {
    if (!isPlaying || balloon.revealed || hasPopped) return;

    await playPopSound();
    setHasPopped(true);
    
    setBalloons(prev => prev.map(b => 
      b.id === balloon.id ? { ...b, revealed: true } : b
    ));
    
    const newMultiplier = balloon.multiplier;
    setTotalMultiplier(prev => prev * newMultiplier);
    
    const winnings = Math.floor(bet * newMultiplier * 100) / 100;
    
    setLastWin(winnings);
    setShowResult(true);
    setIsPlaying(false);

    const newBet: BetRecord = {
      id: Date.now(),
      amount: bet,
      multiplier: newMultiplier,
      winAmount: winnings,
      timestamp: new Date()
    };
    
    setBetHistory(prev => [newBet, ...prev].slice(0, 10));
    
    setStats(prev => {
      const profit = winnings - bet;
      return {
        totalProfit: Math.round((prev.totalProfit + profit) * 100) / 100,
        totalWins: profit >= 0 ? prev.totalWins + 1 : prev.totalWins,
        totalLosses: profit < 0 ? prev.totalLosses + 1 : prev.totalLosses
      };
    });
  };

  const handleBetChange = (value: string) => {
    if (isPlaying) return;
    
    const cleanValue = value.replace(/,/g, '');
    const numValue = parseFloat(cleanValue);
    
    if (isNaN(numValue)) {
      setBet(0);
      return;
    }

    const roundedValue = Math.round(numValue * 100) / 100;
    const newBet = Math.max(0, Math.min(100000, roundedValue));
    setBet(newBet);
  };

  const incrementBet = () => {
    if (isPlaying) return;
    const currentTierIndex = BET_TIERS.findIndex(tier => bet <= tier.amount);
    if (currentTierIndex < BET_TIERS.length - 1) {
      const nextTier = BET_TIERS[currentTierIndex + 1];
      handleBetChange(nextTier.amount.toString());
    }
  };

  const decrementBet = () => {
    if (isPlaying) return;
    const currentTierIndex = BET_TIERS.findIndex(tier => bet <= tier.amount);
    if (currentTierIndex > 0) {
      const prevTier = BET_TIERS[currentTierIndex - 1];
      handleBetChange(prevTier.amount.toString());
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getResultMessage = () => {
    const profit = lastWin - bet;
    if (profit > bet * 2) {
      return "Spectacular Win!";
    } else if (profit > 0) {
      return "Amazing Victory!";
    } else if (profit === 0) {
      return "Break Event!";
    } else {
      return "Try Again!";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f3a] via-[#2d3561] to-[#1a1f3a] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      <HowToPlayModal isOpen={showInfo} onClose={() => setShowInfo(false)} />

      <div className="container mx-auto max-w-7xl py-8 px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Game Area */}
          <div className="lg:w-2/3 order-1">
            <div className="bg-[#1e2749]/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-500/20 relative">
              {showResult && (
                <div className="absolute inset-x-0 top-4 sm:top-8 text-center z-10 animate-fadeIn">
                  <div className="inline-block">
                    <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text 
                      bg-gradient-to-r from-blue-400 to-blue-500">
                      {getResultMessage()}
                    </h2>
                    <p className="text-xl sm:text-2xl mb-2 sm:mb-4">
                      You won <span className="font-bold text-transparent bg-clip-text 
                        bg-gradient-to-r from-emerald-300 to-emerald-500">₹{lastWin.toFixed(2)}</span>
                      <span className="text-gray-400 text-sm sm:text-base ml-2">
                        ({lastWin > bet ? `+${((lastWin/bet - 1) * 100).toFixed(0)}%` : `${((lastWin/bet - 1) * 100).toFixed(0)}%`})
                      </span>
                    </p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6 relative z-10">
                {balloons.map(balloon => {
                  const colorObj = colors.find(c => c.gradient === balloon.color);
                  return (
                    <button
                      key={balloon.id}
                      onClick={() => popBalloon(balloon)}
                      disabled={!isPlaying || balloon.revealed || hasPopped}
                      className="relative group aspect-square p-1 sm:p-3"
                    >
                      <div
                        className={`
                          w-full h-full relative
                          transition-all duration-500 transform-gpu
                          ${balloon.revealed ? 'scale-0 opacity-0 rotate-12' : 'group-hover:scale-110 group-hover:-translate-y-2'}
                          ${!isPlaying && !balloon.revealed ? 'opacity-50 scale-95' : ''}
                          ${hasPopped && !balloon.revealed ? 'opacity-30 scale-95' : ''}
                          animate-balloon-float
                        `}
                      >
                        <div
                          className={`
                            absolute inset-0
                            bg-gradient-to-b ${balloon.color}
                            rounded-full
                            shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                            before:content-['']
                            before:absolute
                            before:inset-[8%]
                            before:bg-gradient-to-tl
                            before:from-transparent
                            before:to-${colorObj?.shine || 'white'}
                            before:opacity-40
                            before:rounded-full
                            after:content-['']
                            after:absolute
                            after:w-4
                            after:h-4
                            after:rounded-full
                            after:bg-gradient-to-br
                            after:from-white
                            after:to-transparent
                            after:opacity-60
                            after:top-[15%]
                            after:left-[15%]
                            group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]
                            group-hover:before:opacity-50
                            transition-all duration-300
                          `}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-75"></div>
                          
                          {!balloon.revealed && isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-xl sm:text-3xl font-bold text-white drop-shadow-lg animate-pulse">
                                ?
                              </div>
                            </div>
                          )}
                          {balloon.revealed && (
                            <span className="absolute inset-0 flex items-center justify-center text-xl sm:text-4xl font-bold text-white drop-shadow-lg animate-bounce">
                              {balloon.multiplier}x
                            </span>
                          )}
                        </div>

                        <div className="absolute -bottom-4 sm:-bottom-8 left-1/2 w-[1px] h-4 sm:h-8
                          transition-all duration-300 transform-gpu origin-top
                          after:content-['']
                          after:absolute
                          after:w-full
                          after:h-full
                          after:bg-gradient-to-b
                          after:from-gray-300
                          after:to-gray-400
                          after:animate-string-sway
                          group-hover:h-6 sm:group-hover:h-10
                        "></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3 order-2 space-y-6">
            {/* Place Your Bet */}
            <div className="bg-[#1e2749]/80 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
                Place Your Bet
              </h2>
              
              <div className="space-y-4">
                <div className="bg-[#0f1629]/50 px-4 py-3 rounded-xl border border-blue-500/10 shadow-lg">
                  <span className="text-sm text-gray-400 mb-1 block">Bet Amount</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrementBet}
                      disabled={isPlaying || bet <= 0}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 
                        hover:bg-blue-500/20 border border-blue-500/30 text-blue-400
                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="text"
                      value={bet.toFixed(2)}
                      onChange={(e) => handleBetChange(e.target.value)}
                      disabled={isPlaying}
                      className="w-full bg-[#0f1629]/50 rounded-lg px-3 py-2
                        text-lg font-bold text-white text-center
                        border border-blue-500/30 focus:border-blue-500/50 focus:outline-none
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      onClick={incrementBet}
                      disabled={isPlaying || bet >= 100000}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 
                        hover:bg-blue-500/20 border border-blue-500/30 text-blue-400
                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={startGame}
                  disabled={isPlaying || bet <= 0}
                  className="w-full bg-gradient-to-br from-blue-500 to-purple-500 
                    hover:from-blue-600 hover:to-purple-600
                    px-8 py-4 rounded-xl font-bold text-lg
                    disabled:opacity-50 transition-all duration-300 
                    shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                    disabled:hover:shadow-none border border-white/10
                    transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isPlaying ? 'Playing...' : 'Start Game'}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#1e2749]/80 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 shadow-2xl">
              <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
                Stats
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0f1629]/30 rounded-lg p-4 border border-blue-500/10">
                  <div className="text-sm text-gray-400">Total Profit</div>
                  <div className={`text-xl font-bold ${stats.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stats.totalProfit >= 0 ? '+' : ''}₹{stats.totalProfit.toFixed(2)}
                  </div>
                </div>
                <div className="bg-[#0f1629]/30 rounded-lg p-4 border border-blue-500/10">
                  <div className="text-sm text-gray-400">Wins</div>
                  <div className="text-xl font-bold text-green-500">{stats.totalWins}</div>
                </div>
                <div className="bg-[#0f1629]/30 rounded-lg p-4 border border-blue-500/10">
                  <div className="text-sm text-gray-400">Losses</div>
                  <div className="text-xl font-bold text-red-500">{stats.totalLosses}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bets - Full Width */}
        <div className="mt-8 bg-[#1e2749]/80 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
            Recent Bets
          </h2>
          {betHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-blue-500/10">
                    <th className="pb-2 font-medium">Time</th>
                    <th className="pb-2 font-medium">Bet</th>
                    <th className="pb-2 font-medium">Multiplier</th>
                    <th className="pb-2 font-medium">Payout</th>
                    <th className="pb-2 font-medium">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {betHistory.map((record) => {
                    const profit = record.winAmount - record.amount;
                    const isProfitable = profit >= 0;
                    
                    return (
                      <tr key={record.id} className="border-b border-blue-500/10 last:border-0">
                        <td className="py-3 text-sm">{formatTime(record.timestamp)}</td>
                        <td className="py-3 text-sm">₹{record.amount.toFixed(2)}</td>
                        <td className="py-3 text-sm">{record.multiplier}x</td>
                        <td className="py-3 text-sm">₹{record.winAmount.toFixed(2)}</td>
                        <td className={`py-3 text-sm font-medium ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                          {isProfitable ? '+' : ''}₹{profit.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No bets yet. Start playing to see your history!
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <StarToggle onActivate={handleTestMode} />
      </div>
    </div>
  );
}

export default App;