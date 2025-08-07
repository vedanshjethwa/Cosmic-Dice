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
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#182838] to-[#0f1923] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a2332] to-[#0f1923] p-6 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl border border-blue-500/30 transition-all"
            >
              ←
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Cosmic Balloon
            </h1>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-6 py-3">
            <span className="text-blue-400 font-medium">Balance: ₹1,000.00</span>
          </div>
        </div>
      </div>

      <HowToPlayModal isOpen={showInfo} onClose={() => setShowInfo(false)} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 shadow-2xl relative overflow-hidden">
              {showResult && (
                <div className="absolute inset-x-0 top-8 text-center z-10 animate-fadeIn">
                  <div className="inline-block">
                    <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {getResultMessage()}
                    </h2>
                    <p className="text-2xl mb-4">
                      You won <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">₹{lastWin.toFixed(2)}</span>
                      <span className="text-gray-400 text-base ml-2">
                        ({lastWin > bet ? `+${((lastWin/bet - 1) * 100).toFixed(0)}%` : `${((lastWin/bet - 1) * 100).toFixed(0)}%`})
                      </span>
                    </p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 relative z-10">
                {balloons.map(balloon => {
                  const colorObj = colors.find(c => c.gradient === balloon.color);
                  return (
                    <button
                      key={balloon.id}
                      onClick={() => popBalloon(balloon)}
                      disabled={!isPlaying || balloon.revealed || hasPopped}
                      className="premium-balloon relative group aspect-square p-3"
                    >
                      <div
                        className={`
                          w-full h-full relative
                          transition-all duration-500 transform-gpu
                          ${balloon.revealed ? 'scale-0 opacity-0 rotate-12' : 'group-hover:scale-110 group-hover:-translate-y-3'}
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
                            shadow-[0_12px_32px_rgba(0,0,0,0.5)]
                            before:content-['']
                            before:absolute
                            before:inset-[8%]
                            before:bg-gradient-to-tl
                            before:from-transparent
                            before:to-white
                            before:opacity-40
                            before:rounded-full
                            after:content-['']
                            after:absolute
                            after:w-6
                            after:h-6
                            after:rounded-full
                            after:bg-gradient-to-br
                            after:from-white
                            after:to-transparent
                            after:opacity-70
                            after:top-[15%]
                            after:left-[15%]
                            group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]
                            group-hover:before:opacity-60
                            transition-all duration-300
                            border-2 border-white/20
                          `}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-75"></div>
                          
                          {!balloon.revealed && isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-2xl font-bold text-white drop-shadow-lg animate-pulse">
                                ?
                              </div>
                            </div>
                          )}
                          {balloon.revealed && (
                            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white drop-shadow-lg animate-bounce">
                              {balloon.multiplier}x
                            </span>
                          )}
                        </div>

                        <div className="absolute -bottom-8 left-1/2 w-[2px] h-8
                          transition-all duration-300 transform-gpu origin-top
                          after:content-['']
                          after:absolute
                          after:w-full
                          after:h-full
                          after:bg-gradient-to-b
                          after:from-gray-300
                          after:to-gray-500
                          after:animate-string-sway
                          group-hover:h-10
                        "></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Place Your Bet */}
            <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Place Your Bet</h3>
              
              <div className="space-y-6">
                <div className="bg-[#0f1923]/50 px-4 py-3 rounded-xl border border-blue-500/20 shadow-lg">
                  <span className="text-sm text-gray-400 mb-2 block">Bet Amount</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrementBet}
                      disabled={isPlaying || bet <= 0}
                      className="premium-control-btn w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2a3441] to-[#1a2332] hover:from-[#3a4451] hover:to-[#2a3441] border border-blue-500/30 hover:border-blue-400/50 text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="text"
                      value={bet.toFixed(2)}
                      onChange={(e) => handleBetChange(e.target.value)}
                      disabled={isPlaying}
                      className="premium-input flex-1 bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl px-4 py-3 text-lg font-bold text-white text-center border border-blue-500/30 focus:border-blue-400/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                    <button
                      onClick={incrementBet}
                      disabled={isPlaying || bet >= 100000}
                      className="premium-control-btn w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2a3441] to-[#1a2332] hover:from-[#3a4451] hover:to-[#2a3441] border border-blue-500/30 hover:border-blue-400/50 text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={startGame}
                  disabled={isPlaying || bet <= 0}
                  className="premium-action-btn w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 rounded-xl font-bold text-lg disabled:opacity-50 transition-all shadow-lg hover:shadow-blue-500/30 border border-white/10 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {isPlaying ? 'Playing...' : 'Start Game'}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-blue-500/20 text-center">
                  <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                  <div className={`text-xl font-bold ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stats.totalProfit >= 0 ? '+' : ''}₹{stats.totalProfit.toFixed(2)}
                  </div>
                </div>
                <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-green-500/20 text-center">
                  <div className="text-sm text-gray-400 mb-1">Wins</div>
                  <div className="text-xl font-bold text-green-400">{stats.totalWins}</div>
                </div>
                <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-red-500/20 text-center">
                  <div className="text-sm text-gray-400 mb-1">Losses</div>
                  <div className="text-xl font-bold text-red-400">{stats.totalLosses}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bets */}
        <div className="mt-8 premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Recent Bets</h3>
          {betHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-blue-500/20">
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Bet</th>
                    <th className="pb-3 font-medium">Multiplier</th>
                    <th className="pb-3 font-medium">Payout</th>
                    <th className="pb-3 font-medium">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {betHistory.map((record) => {
                    const profit = record.winAmount - record.amount;
                    const isProfitable = profit >= 0;
                    
                    return (
                      <tr key={record.id} className="border-b border-blue-500/10 last:border-0 hover:bg-blue-500/5 transition-colors">
                        <td className="py-4 text-sm">{formatTime(record.timestamp)}</td>
                        <td className="py-4 text-sm">₹{record.amount.toFixed(2)}</td>
                        <td className="py-4 text-sm font-bold text-blue-400">{record.multiplier}x</td>
                        <td className="py-4 text-sm">₹{record.winAmount.toFixed(2)}</td>
                        <td className={`py-4 text-sm font-bold ${isProfitable ? 'text-green-400' : 'text-red-400'}`}>
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