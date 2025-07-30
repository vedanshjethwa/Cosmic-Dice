import React, { useState, useCallback } from 'react';
import GameArea from './components/GameArea';
import RecentBets from './components/RecentBets';
import HelpModal from './components/HelpModal';

function App() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(10);
  const [gameHistory, setGameHistory] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  const handleGameResult = useCallback((result: 'green' | 'yellow' | 'miss', difficulty: 'low' | 'mid' | 'high') => {
    const multipliers = {
      low: { green: 2, yellow: 0.5 },
      mid: { green: 5, yellow: 0.5 },
      high: { green: 10, yellow: 0.5 }
    };

    const multiplier = result === 'miss' ? 0 : multipliers[difficulty][result];
    const winnings = betAmount * multiplier;
    
    setBalance(prev => prev + winnings - betAmount);
    setGameHistory(prev => [{
      result,
      amount: betAmount,
      winnings: winnings - betAmount,
      timestamp: new Date(),
      difficulty
    }, ...prev].slice(0, 5));
  }, [betAmount]);

  const handleStarActivate = useCallback((winRate: number) => {
    setBalance(prev => prev + Math.floor(winRate * 1000));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 space-y-6">
        <GameArea 
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          onResult={handleGameResult}
          balance={balance}
        />
        <RecentBets history={gameHistory} />
      </main>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}

export default App;