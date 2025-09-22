import React, { useState, useCallback } from 'react';
import { Minus, Plus, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Footer } from '../Footer';

export default function MinesweeperGame() {
  const { user, wallet, refreshWallet, updateBalance } = useAuth();
  const [betAmount, setBetAmount] = useState(10);
  const [gameHistory, setGameHistory] = useState([]);
  const [mineCount, setMineCount] = useState(5);
  const [gameGrid, setGameGrid] = useState(Array(25).fill(false));
  const [revealedTiles, setRevealedTiles] = useState(Array(25).fill(false));
  const [gameActive, setGameActive] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);

  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  const startGame = () => {
    if (currentBalance < betAmount) return;
    
    updateBalance(-betAmount);
    
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
      setGameHistory(prev => [{
        result: 'loss',
        amount: betAmount,
        winnings: -betAmount,
        timestamp: new Date()
      }, ...prev].slice(0, 5));
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
    updateBalance(winAmount);
    setGameActive(false);
    
    setGameHistory(prev => [{
      result: 'win',
      amount: betAmount,
      winnings: winAmount - betAmount,
      timestamp: new Date()
    }, ...prev].slice(0, 5));
  };

  return (
    <div className="game-container">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Grid */}
          <div className="lg:col-span-2">
            <div className="game-panel">
              <h2 className="text-2xl font-bold text-high-contrast mb-6 text-center">Cosmic Minesweeper</h2>
              
              <div className="mine-grid">
                {Array(25).fill(null).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => revealTile(index)}
                    disabled={!gameActive || revealedTiles[index]}
                    className={`mine-tile ${
                      revealedTiles[index]
                        ? gameGrid[index]
                          ? 'mine'
                          : 'safe'
                        : ''
                    }`}
                    whileHover={{ scale: gameActive && !revealedTiles[index] ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {revealedTiles[index] ? (
                      gameGrid[index] ? (
                        <span className="text-lg">💣</span>
                      ) : (
                        <span className="text-lg">💎</span>
                      )
                    ) : (
                      <span className="text-xs text-blue-400 opacity-70">{index + 1}</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Mines Configuration */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Mines Configuration</h3>
              
              <div className="space-y-4">
                <div className="bg-[#0f253c] rounded-xl p-4 border border-blue-500/20">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-medium-contrast">Mines</span>
                    <span className="text-blue-400 font-bold">{mineCount} mines</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={mineCount}
                    onChange={(e) => setMineCount(parseInt(e.target.value))}
                    disabled={gameActive}
                    className="w-full h-2 bg-[#3c3c3c] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-low-contrast mt-2">of 25 tiles</div>
                </div>
              </div>
            </div>

            {/* Game Status */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Game Status</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-medium-contrast">Safe Tiles:</span>
                  <span className="text-green-400 font-bold">{25 - mineCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-medium-contrast">Mines Left:</span>
                  <span className="text-red-400 font-bold">{mineCount}</span>
                </div>
                {gameActive && (
                  <div className="flex justify-between">
                    <span className="text-medium-contrast">Multiplier:</span>
                    <span className="text-purple-400 font-bold">{currentMultiplier.toFixed(2)}x</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bet Amount */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Bet Amount</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBetAmount(Math.max(1, betAmount - 10))}
                    disabled={gameActive}
                    className="btn-secondary w-12 h-12 p-0"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={gameActive}
                    className="form-input text-center text-lg font-bold flex-1"
                  />
                  
                  <button
                    onClick={() => setBetAmount(betAmount + 10)}
                    disabled={gameActive}
                    className="btn-secondary w-12 h-12 p-0"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-xs text-low-contrast text-center">
                  Min: ₹1 • Max: ₹{currentBalance.toLocaleString()}
                </div>

                {!gameActive ? (
                  <button
                    onClick={startGame}
                    disabled={betAmount > currentBalance}
                    className="btn-primary w-full text-lg py-4"
                  >
                    Start Game - ₹{betAmount}
                  </button>
                ) : (
                  <button
                    onClick={cashOut}
                    className="btn-gradient w-full text-lg py-4"
                  >
                    Cash Out - ₹{(betAmount * currentMultiplier).toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="section-divider" />
        <div className="game-panel">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-high-contrast">How to Play Cosmic Minesweeper</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Set mine count (1-24)</li>
                <li>• Place your bet</li>
                <li>• Click tiles to reveal</li>
                <li>• Avoid mines</li>
                <li>• Cash out anytime</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-green-400 mb-2">Strategy Tips</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Start with fewer mines</li>
                <li>• Cash out early for safety</li>
                <li>• More mines = higher risk</li>
                <li>• Trust your instincts</li>
                <li>• Set profit targets</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-purple-400 mb-2">Multipliers</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Each safe tile increases multiplier</li>
                <li>• More mines = higher multipliers</li>
                <li>• Risk vs reward balance</li>
                <li>• Cash out before hitting mine</li>
                <li>• Maximum potential: 100x+</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}