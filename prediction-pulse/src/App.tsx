import React, { useState, useCallback } from 'react';
import GameArea from './components/GameArea';
import RecentBets from './components/RecentBets';
import HelpModal from './components/HelpModal';
import { StarToggle } from './components/StarToggle';

function App() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(10);
  const [gameHistory, setGameHistory] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [gameState, setGameState] = useState<'idle' | 'running' | 'result'>('idle');
  const [position, setPosition] = useState(0);
  const [difficulty, setDifficulty] = useState<'low' | 'mid' | 'high'>('low');
  const [message, setMessage] = useState('');

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
              Cosmic Tap Zone
            </h1>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-6 py-3">
            <span className="text-blue-400 font-medium">₹{balance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Area */}
          <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Time your prediction perfectly!</h2>
              <p className="text-gray-400">Tap when the pulse enters the green zone</p>
            </div>

            {/* Pulse Bar */}
            <div className="h-32 flex items-center justify-center relative mb-8">
              <div className="w-full h-6 bg-black/50 rounded-full relative border-2 border-blue-500/30 shadow-lg">
                {/* Green Zone */}
                <div className="absolute inset-y-0 bg-gradient-to-r from-green-400/30 to-green-500/30 rounded-full left-[40%] right-[40%]" />
                
                {/* Yellow Zones */}
                <div className="absolute inset-y-0 bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 rounded-full left-[30%] right-[60%]" />
                <div className="absolute inset-y-0 bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 rounded-full left-[60%] right-[30%]" />
                
                {gameState === 'running' && (
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg shadow-blue-400/50 transform -translate-x-1/2 animate-pulse"
                    style={{ left: `${position}%` }}
                  />
                )}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="flex justify-center gap-4 mb-8">
              {(['low', 'mid', 'high'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  disabled={gameState === 'running'}
                  className={`premium-difficulty-btn px-6 py-3 rounded-xl font-medium transition-all border-2 ${
                    difficulty === level
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400 shadow-lg shadow-blue-500/30'
                      : gameState === 'running'
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border-gray-600'
                      : 'bg-gradient-to-br from-[#2a3441] to-[#1a2332] text-gray-300 hover:text-white border-blue-500/30 hover:border-blue-400/50'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                  <span className="block text-sm opacity-75">
                    {level === 'low' ? '2x' : level === 'mid' ? '5x' : '10x'}
                  </span>
                </button>
              ))}
            </div>

            {/* Game Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setBetAmount(Math.max(1, Math.floor(betAmount / 2)))}
                  disabled={gameState === 'running'}
                  className="premium-control-btn px-4 py-2 bg-gradient-to-br from-[#2a3441] to-[#1a2332] hover:from-[#3a4451] hover:to-[#2a3441] rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all disabled:opacity-50"
                >
                  ½
                </button>
                <div className="premium-input-container bg-gradient-to-br from-[#2a3441] to-[#1a2332] px-6 py-3 rounded-xl border border-blue-500/30">
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={gameState === 'running'}
                    className="w-24 bg-transparent text-center font-bold focus:outline-none text-white text-lg"
                    min="1"
                    max={balance}
                  />
                </div>
                <button
                  onClick={() => setBetAmount(Math.min(balance, betAmount * 2))}
                  disabled={gameState === 'running'}
                  className="premium-control-btn px-4 py-2 bg-gradient-to-br from-[#2a3441] to-[#1a2332] hover:from-[#3a4451] hover:to-[#2a3441] rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all disabled:opacity-50"
                >
                  2×
                </button>
              </div>

              <button
                onClick={() => {
                  if (gameState === 'running') {
                    handleGameResult('green', difficulty);
                    setGameState('result');
                  } else {
                    setGameState('running');
                    setPosition(0);
                  }
                }}
                disabled={betAmount <= 0 || betAmount > balance}
                className={`premium-action-btn w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl relative group overflow-hidden ${
                  betAmount <= 0 || betAmount > balance
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105 shadow-blue-500/40'
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/25 to-blue-400/0 group-hover:animate-shimmer" />
                {gameState === 'running' ? 'TAP!' : 'Start Game'}
              </button>
            </div>

            {message && (
              <div className="mt-6 text-center font-bold text-xl bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                {message}
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="space-y-6">
            <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-blue-500/20 text-center">
                  <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                  <div className="text-xl font-bold text-green-400">₹0</div>
                </div>
                <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-green-500/20 text-center">
                  <div className="text-sm text-gray-400 mb-1">Total Win</div>
                  <div className="text-xl font-bold text-blue-400">₹0</div>
                </div>
                <div className="premium-stat-card bg-gradient-to-br from-[#2a3441] to-[#1a2332] rounded-xl p-4 border border-red-500/20 text-center">
                  <div className="text-sm text-gray-400 mb-1">Total Loss</div>
                  <div className="text-xl font-bold text-red-400">₹0</div>
                </div>
              </div>
            </div>

            <RecentBets history={gameHistory} />
          </div>
        </div>
      </div>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      <StarToggle onActivate={handleStarActivate} />
    </div>
  );
}

export default App;