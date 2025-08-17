import React, { useState, useEffect } from 'react';
import { Border } from './border/Border';
import { HowToPlayModal } from './components/HowToPlayModal';
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
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalMultiplier, setTotalMultiplier] = useState(1);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [hasPopped, setHasPopped] = useState(false);
  const [betHistory, setBetHistory] = useState<BetRecord[]>([]);
  const [stats, setStats] = useState({
    totalProfit: 0,
    totalWins: 0,
    totalLosses: 0
  });
  
  const colors = [
    { gradient: 'from-pink-400 via-pink-500 to-rose-600', glow: 'pink-300', shine: 'pink-200' },
    { gradient: 'from-cyan-400 via-cyan-500 to-blue-600', glow: 'cyan-300', shine: 'cyan-200' },
    { gradient: 'from-yellow-400 via-amber-500 to-orange-600', glow: 'yellow-300', shine: 'yellow-200' },
    { gradient: 'from-emerald-400 via-emerald-500 to-green-600', glow: 'emerald-300', shine: 'emerald-200' },
    { gradient: 'from-violet-400 via-violet-500 to-purple-600', glow: 'violet-300', shine: 'violet-200' }
  ];

  const multipliers = [0.2, 0.5, 1, 2, 3, 4, 5];

  useEffect(() => {
    setBalloons(generateBalloons());
  }, []);

  const generateBalloons = () => {
    const newBalloons: Balloon[] = [];
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
    if (balance >= bet) {
      const walletElement = document.querySelector('.wallet-balance');
      if (walletElement) {
        walletElement.classList.remove('animate-money-pop');
        void walletElement.offsetWidth;
        walletElement.classList.add('animate-money-pop');
      }
      setBalance(prev => prev - bet);
      setIsPlaying(true);
      setTotalMultiplier(1);
      setBalloons(generateBalloons());
      setHasPopped(false);
      setShowResult(false);
    }
  };

  const playPopSound = () => {
    const popSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    popSound.play().catch(console.error);
  };

  const popBalloon = (balloon: Balloon) => {
    if (!isPlaying || balloon.revealed || hasPopped) return;

    playPopSound();
    setHasPopped(true);
    
    setBalloons(prev => prev.map(b => 
      b.id === balloon.id ? { ...b, revealed: true } : b
    ));
    
    const newMultiplier = balloon.multiplier;
    setTotalMultiplier(prev => prev * newMultiplier);
    
    const winnings = Math.floor(bet * newMultiplier);
    setLastWin(winnings);
    setBalance(prev => prev + winnings);
    setShowResult(true);
    setIsPlaying(false);

    // Update bet history
    const newBet: BetRecord = {
      id: Date.now(),
      amount: bet,
      multiplier: newMultiplier,
      winAmount: winnings,
      timestamp: new Date()
    };
    
    setBetHistory(prev => [newBet, ...prev].slice(0, 10));
    
    // Update stats
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
    const newBet = Math.max(1, Math.min(balance, amount));
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#0B1622] text-white">
      <Border 
        balance={balance} 
        onHelpClick={() => setShowInfo(true)} 
        onBackClick={() => console.log('Back clicked')} 
      />

      <HowToPlayModal isOpen={showInfo} onClose={() => setShowInfo(false)} />

      <div className="container mx-auto max-w-5xl py-8 px-4">
        <div className="bg-[#1A2634] rounded-3xl p-8 shadow-2xl border border-blue-500/20 relative">
          {showResult && (
            <div className="absolute inset-x-0 top-8 text-center z-10 animate-fadeIn">
              <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-300 to-blue-500">
                {lastWin > bet ? 'Congratulations! 🎉' : 'Better luck next time!'}
              </h2>
              <p className="text-2xl mb-4">
                You won <span className="font-bold text-transparent bg-clip-text 
                  bg-gradient-to-r from-blue-300 to-blue-500">₹{lastWin}</span>!
              </p>
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
                  className="relative group aspect-square p-2 sm:p-3"
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
                        <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-4xl font-bold text-white drop-shadow-lg animate-bounce">
                          {balloon.multiplier}x
                        </span>
                      )}
                    </div>

                    <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 w-[1px] h-6 sm:h-8
                      transition-all duration-300 transform-gpu origin-top
                      after:content-['']
                      after:absolute
                      after:w-full
                      after:h-full
                      after:bg-gradient-to-b
                      after:from-gray-300
                      after:to-gray-400
                      after:animate-string-sway
                      group-hover:h-8 sm:group-hover:h-10
                    "></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 bg-[#1A2634] rounded-xl border border-blue-500/20 p-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center gap-2 sm:gap-3 bg-[#0B1622] px-3 sm:px-6 py-2 sm:py-3 rounded-xl border border-blue-500/10 shadow-lg">
              <span className="text-base sm:text-lg font-medium text-white">Bet:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={decrementBet}
                  disabled={isPlaying || bet <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 
                    hover:bg-blue-500/20 border border-blue-500/30 text-blue-400
                    disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={bet}
                  onChange={(e) => handleBetChange(Number(e.target.value))}
                  disabled={isPlaying}
                  min={1}
                  max={balance}
                  className="w-24 bg-[#0B1622] rounded-lg px-3 py-1.5 
                    text-base sm:text-lg font-bold text-white text-center
                    border border-blue-500/30 focus:border-blue-500/50 focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={incrementBet}
                  disabled={isPlaying || bet >= balance}
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
              disabled={balance < bet || isPlaying}
              className="w-full sm:w-auto bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 
                hover:from-blue-500 hover:via-blue-600 hover:to-indigo-700
                px-8 sm:px-12 py-2 sm:py-3 rounded-xl font-bold text-base sm:text-lg
                disabled:opacity-50 transition-all duration-300 
                shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                disabled:hover:shadow-none border border-white/10
                transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isPlaying ? 'Playing...' : 'Start Game'}
            </button>
          </div>
        </div>

        {/* Recent Bets */}
        <div className="mt-8 bg-[#1A2634] rounded-xl p-6 border border-blue-500/20 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">Recent Bets</h2>
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
                        <td className="py-3 text-sm">₹{record.amount}</td>
                        <td className="py-3 text-sm">{record.multiplier}x</td>
                        <td className="py-3 text-sm">₹{record.winAmount}</td>
                        <td className={`py-3 text-sm font-medium ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                          {isProfitable ? '+' : ''}₹{profit}
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

        {/* Stats Summary */}
        <div className="mt-8 bg-[#1A2634] rounded-xl p-6 border border-blue-500/20 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0B1622] rounded-lg p-4 border border-blue-500/10">
              <div className="text-sm text-gray-400">Total Profit</div>
              <div className={`text-xl font-bold ${stats.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stats.totalProfit >= 0 ? '+' : ''}₹{stats.totalProfit}
              </div>
            </div>
            <div className="bg-[#0B1622] rounded-lg p-4 border border-blue-500/10">
              <div className="text-sm text-gray-400">Wins</div>
              <div className="text-xl font-bold text-green-500">{stats.totalWins}</div>
            </div>
            <div className="bg-[#0B1622] rounded-lg p-4 border border-blue-500/10">
              <div className="text-sm text-gray-400">Losses</div>
              <div className="text-xl font-bold text-red-500">{stats.totalLosses}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-auto">
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-blue-500/30"></div>
      </div>
    </div>
  );
}

export default App;