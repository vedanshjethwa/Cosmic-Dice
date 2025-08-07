import React, { useState, useCallback } from 'react';
import GameArea from './components/GameArea';
import RecentBets from './components/RecentBets';
import HelpModal from './components/HelpModal';

function App() {
  const [balance, setBalance] = useState(83000);
  const [betAmount, setBetAmount] = useState(830);
  const [gameHistory, setGameHistory] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [mineCount, setMineCount] = useState(5);
  const [gameGrid, setGameGrid] = useState(Array(25).fill(false));
  const [revealedTiles, setRevealedTiles] = useState(Array(25).fill(false));
  const [gameActive, setGameActive] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);

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

  const startGame = () => {
    if (balance < betAmount) return;
    
    // Generate mine positions
    const mines = [];
    while (mines.length < mineCount) {
      const pos = Math.floor(Math.random() * 25);
      if (!mines.includes(pos)) {
        mines.push(pos);
      }
    }
    
    const newGrid = Array(25).fill(false);
    mines.forEach(pos => newGrid[pos] = true);
    
    setGameGrid(newGrid);
    setRevealedTiles(Array(25).fill(false));
    setGameActive(true);
    setCurrentMultiplier(1.0);
    setBalance(prev => prev - betAmount);
  };

  const revealTile = (index: number) => {
    if (!gameActive || revealedTiles[index]) return;
    
    const newRevealed = [...revealedTiles];
    newRevealed[index] = true;
    setRevealedTiles(newRevealed);
    
    if (gameGrid[index]) {
      // Hit a mine
      setGameActive(false);
      // Reveal all mines
      setRevealedTiles(Array(25).fill(true));
    } else {
      // Safe tile
      const safeTilesRevealed = newRevealed.filter((revealed, i) => revealed && !gameGrid[i]).length;
      const newMultiplier = 1 + (safeTilesRevealed * 0.2);
      setCurrentMultiplier(newMultiplier);
    }
  };

  const cashOut = () => {
    if (!gameActive) return;
    
    const winnings = betAmount * currentMultiplier;
    setBalance(prev => prev + winnings);
    setGameActive(false);
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
              Cosmic Mines
            </h1>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-6 py-3">
            <span className="text-blue-400 font-medium">₹{balance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Grid */}
          <div className="lg:col-span-2">
            <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 shadow-2xl">
              <div className="grid grid-cols-5 gap-3 mb-6">
                {Array(25).fill(null).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => revealTile(index)}
                    disabled={!gameActive || revealedTiles[index]}
                    className={`premium-mine-tile aspect-square rounded-2xl border-2 transition-all duration-300 flex items-center justify-center text-lg font-bold relative overflow-hidden group ${
                      revealedTiles[index]
                        ? gameGrid[index]
                          ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                          : 'bg-gradient-to-br from-green-500 to-green-700 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                        : 'bg-gradient-to-br from-[#2a3441] to-[#1a2332] border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-105'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    {revealedTiles[index] ? (
                      gameGrid[index] ? (
                        <span className="text-2xl">💣</span>
                      ) : (
                        <span className="text-2xl">💎</span>
                      )
                    ) : (
                      <span className="text-blue-400 opacity-50">{index + 1}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Mines Configuration */}
            <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                🎯 Mines Configuration
              </h3>
              
              <div className="space-y-4">
                <div className="bg-[#0f1923]/50 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400">Mines</span>
                    <span className="text-blue-400 font-bold">{mineCount} mines</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={mineCount}
                    onChange={(e) => setMineCount(parseInt(e.target.value))}
                    disabled={gameActive}
                    className="premium-slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-400 mt-2">of 25 tiles</div>
                </div>
              </div>
            </div>

            {/* Game Status */}
            <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                🟢 Game Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Safe Tiles:</span>
                  <span className="text-green-400 font-bold">{25 - mineCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mines Left:</span>
                  <span className="text-red-400 font-bold">{mineCount}</span>
                </div>
                {gameActive && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Multiplier:</span>
                    <span className="text-purple-400 font-bold">{currentMultiplier.toFixed(2)}x</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bet Amount */}
            <div className="premium-panel bg-gradient-to-br from-[#1a2332]/80 to-[#0f1923]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                💰 Bet Amount
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBetAmount(Math.max(1, betAmount - 10))}
                    disabled={gameActive}
                    className="premium-control-btn w-12 h-12 bg-gradient-to-br from-[#2a3441] to-[#1a2332] hover:from-[#3a4451] hover:to-[#2a3441] rounded-xl border border-purple-500/30 hover:border-purple-400/50 flex items-center justify-center transition-all group disabled:opacity-50"
                  >
                    <Minus className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  </button>
                  
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={gameActive}
                    className="premium-input flex-1 bg-gradient-to-br from-[#2a3441] to-[#1a2332] text-white text-center py-3 px-4 rounded-xl border border-purple-500/30 focus:border-purple-400/50 focus:outline-none disabled:opacity-50 text-lg font-bold"
                  />
                  
                  <button
                    onClick={() => setBetAmount(betAmount + 10)}
                    disabled={gameActive}
                    className="premium-control-btn w-12 h-12 bg-gradient-to-br from-[#2a3441] to-[#1a2332] hover:from-[#3a4451] hover:to-[#2a3441] rounded-xl border border-purple-500/30 hover:border-purple-400/50 flex items-center justify-center transition-all group disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  </button>
                </div>
                
                <div className="text-xs text-gray-400 text-center">
                  Min: ₹1 • Max: ₹{balance.toLocaleString()}
                </div>

                {!gameActive ? (
                  <button
                    onClick={startGame}
                    disabled={betAmount > balance}
                    className="premium-action-btn w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-green-500/30 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Start Game - ₹{betAmount}
                  </button>
                ) : (
                  <button
                    onClick={cashOut}
                    className="premium-action-btn w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
                  >
                    Cash Out - ₹{(betAmount * currentMultiplier).toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}

export default App;