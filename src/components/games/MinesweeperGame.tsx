import React, { useState, useCallback } from 'react';
import { Minus, Plus, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Footer } from '../Footer';

export default function MinesweeperGame() {
  const { user, wallet, refreshWallet, updateBalance } = useAuth();
  const [betAmount, setBetAmount] = useState(830);
  const [gameHistory, setGameHistory] = useState([]);
  const [mineCount, setMineCount] = useState(5);
  const [gameGrid, setGameGrid] = useState(Array(25).fill(false));
  const [revealedTiles, setRevealedTiles] = useState(Array(25).fill(false));
  const [gameActive, setGameActive] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);

  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  const handleGameResult = useCallback(async (result: 'green' | 'yellow' | 'miss', difficulty: 'low' | 'mid' | 'high') => {
    const multipliers = {
      low: { green: 2, yellow: 0.5 },
      mid: { green: 5, yellow: 0.5 },
      high: { green: 10, yellow: 0.5 }
    };

    const multiplier = result === 'miss' ? 0 : multipliers[difficulty][result];
    const winAmount = betAmount * multiplier;
    
    updateBalance(winAmount - betAmount);
    
    setGameHistory(prev => [{
      result,
      amount: betAmount,
      winnings: winAmount - betAmount,
      timestamp: new Date(),
      difficulty
    }, ...prev].slice(0, 5));
  }, [betAmount, updateBalance]);

  const startGame = () => {
    if (currentBalance < betAmount) return;
    
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
      handleGameResult('miss', 'mid');
    } else {
      // Safe tile
      const safeTilesRevealed = newRevealed.filter((revealed, i) => revealed && !gameGrid[i]).length;
      const newMultiplier = 1 + (safeTilesRevealed * 0.2);
      setCurrentMultiplier(newMultiplier);
    }
  };

  const cashOut = async () => {
    if (!gameActive) return;
    
    const winAmount = betAmount * currentMultiplier;
    updateBalance(winAmount - betAmount);
    setGameActive(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Grid */}
          <div className="lg:col-span-2">
            <div className="cosmic-card p-8 shadow-2xl">
              <div className="grid grid-cols-5 gap-2 mb-6">
                {Array(25).fill(null).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => revealTile(index)}
                    disabled={!gameActive || revealedTiles[index]}
                    className={`w-12 h-12 border-2 transition-all duration-300 flex items-center justify-center text-sm font-bold relative overflow-hidden group ${
                      revealedTiles[index]
                        ? gameGrid[index]
                          ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                          : 'bg-gradient-to-br from-green-500 to-green-700 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                        : 'cosmic-card border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-105'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {revealedTiles[index] ? (
                      gameGrid[index] ? (
                        <span className="text-lg">💣</span>
                      ) : (
                        <span className="text-lg">💎</span>
                      )
                    ) : (
                      <span className="text-blue-400 opacity-70 font-bold text-xs">{index + 1}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Mines Configuration */}
            <div className="cosmic-card p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                🎯 Mines Configuration
              </h3>
              
              <div className="space-y-4">
                <div className="bg-[#334155] p-4 border border-blue-500/20">
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
                    className="w-full h-2 bg-[#475569] appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-400 mt-2">of 25 tiles</div>
                </div>
              </div>
            </div>

            {/* Game Status */}
            <div className="cosmic-card p-6 shadow-xl border-green-500/20">
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
            <div className="cosmic-card p-6 shadow-xl border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                💰 Bet Amount
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBetAmount(Math.max(1, betAmount - 10))}
                    disabled={gameActive}
                    className="w-12 h-12 cosmic-card hover:bg-[#475569] border border-purple-500/30 hover:border-purple-400/50 flex items-center justify-center transition-all group disabled:opacity-50"
                  >
                    <Minus className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  </button>
                  
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={gameActive}
                    className="flex-1 bg-[#334155] text-white text-center py-3 px-4 border border-purple-500/30 focus:border-purple-400/50 focus:outline-none disabled:opacity-50 text-lg font-bold"
                  />
                  
                  <button
                    onClick={() => setBetAmount(betAmount + 10)}
                    disabled={gameActive}
                    className="w-12 h-12 cosmic-card hover:bg-[#475569] border border-purple-500/30 hover:border-purple-400/50 flex items-center justify-center transition-all group disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  </button>
                </div>
                
                <div className="text-xs text-gray-400 text-center">
                  Min: ₹1 • Max: ₹{currentBalance.toLocaleString()}
                </div>

                {!gameActive ? (
                  <button
                    onClick={startGame}
                    disabled={betAmount > currentBalance}
                    className="w-full cosmic-button bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 font-bold text-lg transition-all shadow-lg hover:shadow-green-500/30 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Start Game - ₹{betAmount}
                  </button>
                ) : (
                  <button
                    onClick={cashOut}
                    className="w-full cosmic-button bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4 font-bold text-lg transition-all shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
                  >
                    Cash Out - ₹{(betAmount * currentMultiplier).toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="mt-8 cosmic-card p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">How to Play Cosmic Minesweeper</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="cosmic-card p-4">
              <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Set mine count (1-24)</li>
                <li>• Place your bet</li>
                <li>• Click tiles to reveal</li>
                <li>• Avoid mines</li>
                <li>• Cash out anytime</li>
              </ul>
            </div>
            <div className="cosmic-card p-4">
              <h4 className="font-bold text-green-400 mb-2">Strategy Tips</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Start with fewer mines</li>
                <li>• Cash out early for safety</li>
                <li>• More mines = higher risk</li>
                <li>• Trust your instincts</li>
                <li>• Set profit targets</li>
              </ul>
            </div>
            <div className="cosmic-card p-4">
              <h4 className="font-bold text-purple-400 mb-2">Multipliers</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Each safe tile increases multiplier</li>
                <li>• More mines = higher multipliers</li>
                <li>• Risk vs reward balance</li>
                <li>• Cash out before hitting mine</li>
                <li>• Maximum potential: 100x+</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Bets History */}
        <div className="mt-8 cosmic-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Games</h3>
          <div className="space-y-2">
            {gameHistory.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No games played yet</p>
            ) : (
              gameHistory.map((game, index) => (
                <div key={index} className="flex justify-between items-center cosmic-card p-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 ${
                      game.result === 'green' ? 'bg-green-500' : 
                      game.result === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-white">₹{game.amount}</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${game.winnings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {game.winnings >= 0 ? '+' : ''}₹{game.winnings.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {game.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}