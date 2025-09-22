import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Info, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Footer } from '../Footer';

export default function PredictionPulseGame() {
  const { user, wallet, refreshWallet, updateBalance } = useAuth();
  const [betAmount, setBetAmount] = useState(10);
  const [gameHistory, setGameHistory] = useState([]);
  const [gameState, setGameState] = useState<'idle' | 'running' | 'result'>('idle');
  const [position, setPosition] = useState(0);
  const [difficulty, setDifficulty] = useState<'low' | 'mid' | 'high'>('low');
  const [message, setMessage] = useState('');
  const [currentSpeed, setCurrentSpeed] = useState(2.5);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalWin, setTotalWin] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const animationRef = useRef<number>();

  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  const zones = {
    low: { green: { start: 40, end: 60 }, yellow: { left: { start: 30, end: 40 }, right: { start: 60, end: 70 } } },
    mid: { green: { start: 42, end: 58 }, yellow: { left: { start: 32, end: 42 }, right: { start: 58, end: 68 } } },
    high: { green: { start: 45, end: 55 }, yellow: { left: { start: 35, end: 45 }, right: { start: 55, end: 65 } } }
  };

  const currentZones = zones[difficulty];

  const startGame = () => {
    if (betAmount > currentBalance || betAmount <= 0) return;
    
    updateBalance(-betAmount);
    setGameState('running');
    setPosition(0);
    setMessage('');
    setCurrentSpeed(2.5 + Math.random() * 0.5);
  };

  const handleTap = () => {
    if (gameState !== 'running') return;
    
    setGameState('result');

    let winnings = 0;
    let resultType = 'miss';
    
    if (position >= currentZones.green.start && position <= currentZones.green.end) {
      winnings = betAmount * (difficulty === 'low' ? 2 : difficulty === 'mid' ? 5 : 10);
      setMessage(`Perfect Hit! +₹${winnings}`);
      updateBalance(winnings);
      setTotalProfit(prev => prev + winnings - betAmount);
      setTotalWin(prev => prev + winnings);
      resultType = 'green';
    } else if (
      (position >= currentZones.yellow.left.start && position <= currentZones.yellow.left.end) ||
      (position >= currentZones.yellow.right.start && position <= currentZones.yellow.right.end)
    ) {
      winnings = betAmount * 0.5;
      setMessage(`Almost there! -₹${betAmount - winnings}`);
      updateBalance(winnings);
      setTotalLoss(prev => prev + (betAmount - winnings));
      resultType = 'yellow';
    } else {
      setMessage('You missed! Try again.');
      setTotalLoss(prev => prev + betAmount);
      resultType = 'miss';
    }

    setGameHistory(prev => [{
      result: resultType,
      amount: betAmount,
      winnings: winnings - betAmount,
      timestamp: new Date(),
      difficulty
    }, ...prev].slice(0, 5));
  };

  useEffect(() => {
    if (gameState === 'running') {
      const animate = () => {
        setPosition(prev => {
          const newPos = prev + currentSpeed;
          return newPos >= 100 ? 0 : newPos;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, currentSpeed]);

  return (
    <div className="game-container">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Area */}
          <div className="game-panel">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-high-contrast mb-2">Time your prediction perfectly!</h2>
              <p className="text-medium-contrast">Tap when the pulse enters the green zone</p>
            </div>

            {/* Pulse Bar */}
            <div className="h-32 flex items-center justify-center relative mb-8">
              <div className="w-full h-6 bg-[#0f253c] relative border-2 border-blue-500/30 rounded-full overflow-hidden">
                {/* Green Zone */}
                <div 
                  className="absolute inset-y-0 bg-gradient-to-r from-green-400/30 to-green-500/30 rounded-full"
                  style={{
                    left: `${currentZones.green.start}%`,
                    right: `${100 - currentZones.green.end}%`
                  }}
                />
                
                {/* Yellow Zones */}
                <div 
                  className="absolute inset-y-0 bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 rounded-full"
                  style={{
                    left: `${currentZones.yellow.left.start}%`,
                    right: `${100 - currentZones.yellow.left.end}%`
                  }}
                />
                <div 
                  className="absolute inset-y-0 bg-gradient-to-r from-yellow-400/30 to-yellow-500/30 rounded-full"
                  style={{
                    left: `${currentZones.yellow.right.start}%`,
                    right: `${100 - currentZones.yellow.right.end}%`
                  }}
                />
                
                {gameState === 'running' && (
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg shadow-blue-400/50 transform -translate-x-1/2 animate-pulse-spin"
                    style={{ left: `${position}%` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                  className={`px-6 py-3 rounded-xl font-medium transition-all border-2 ${
                    difficulty === level
                      ? 'btn-primary'
                      : gameState === 'running'
                      ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed border-gray-600'
                      : 'btn-secondary'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                  <span className="block text-sm opacity-75">
                    {level === 'low' ? '2x' : level === 'mid' ? '5x' : '10x'}
                  </span>
                </button>
              ))}
            </div>

            {message && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center font-bold text-xl text-high-contrast mb-6"
              >
                {message}
              </motion.div>
            )}
          </div>

          {/* Stats Section */}
          <div className="space-y-6">
            {/* Bet Controls */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Bet Amount</h3>
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => setBetAmount(Math.max(1, Math.floor(betAmount / 2)))}
                  disabled={gameState === 'running'}
                  className="btn-secondary"
                >
                  ½
                </button>
                <div className="flex-1 max-w-xs">
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={gameState === 'running'}
                    className="form-input text-center font-bold text-lg"
                    min="1"
                    max={currentBalance}
                  />
                </div>
                <button
                  onClick={() => setBetAmount(Math.min(currentBalance, betAmount * 2))}
                  disabled={gameState === 'running'}
                  className="btn-secondary"
                >
                  2×
                </button>
              </div>

              <button
                onClick={() => {
                  if (gameState === 'running') {
                    handleTap();
                  } else {
                    startGame();
                  }
                }}
                disabled={betAmount <= 0 || betAmount > currentBalance}
                className="btn-primary w-full py-4 text-lg font-bold"
              >
                {gameState === 'running' ? 'TAP!' : 'Start Game'}
              </button>
            </div>

            {/* Stats */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="stats-panel">
                  <div className="stats-value text-green-400">₹{totalProfit}</div>
                  <div className="stats-label">Total Profit</div>
                </div>
                <div className="stats-panel">
                  <div className="stats-value text-blue-400">₹{totalWin}</div>
                  <div className="stats-label">Total Win</div>
                </div>
                <div className="stats-panel">
                  <div className="stats-value text-red-400">₹{totalLoss}</div>
                  <div className="stats-label">Total Loss</div>
                </div>
              </div>
            </div>

            {/* Recent Bets */}
            <div className="game-panel">
              <h3 className="text-xl font-bold text-high-contrast mb-6">Recent Bets</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {gameHistory.length === 0 ? (
                  <div className="text-center text-low-contrast py-8">
                    No bets yet. Start playing!
                  </div>
                ) : (
                  gameHistory.map((bet, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        bet.result === 'green' ? 'bg-green-500/20 border-green-500/30' :
                        bet.result === 'yellow' ? 'bg-yellow-500/20 border-yellow-500/30' :
                        'bg-red-500/20 border-red-500/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className={`font-medium ${
                            bet.result === 'green' ? 'text-green-400' :
                            bet.result === 'yellow' ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {bet.result === 'green' ? 'Perfect Hit!' :
                             bet.result === 'yellow' ? 'Almost!' : 'Missed'}
                          </span>
                          <span className="text-sm text-low-contrast ml-2">
                            ({bet.difficulty.toUpperCase()})
                          </span>
                        </div>
                        <span className="font-bold">
                          {bet.winnings >= 0 ? `+₹${bet.winnings}` : `-₹${Math.abs(bet.winnings)}`}
                        </span>
                      </div>
                      <div className="text-sm text-low-contrast mt-1">
                        Bet: ₹{bet.amount} • {new Date(bet.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Game Info Section */}
        <div className="section-divider" />
        <div className="game-panel">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-high-contrast">How to Play Prediction Pulse</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Watch the pulse move</li>
                <li>• Tap when in colored zones</li>
                <li>• Green zone = maximum reward</li>
                <li>• Yellow zone = partial reward</li>
                <li>• Miss = lose bet</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-green-400 mb-2">Difficulty Levels</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Low: 2x reward, wider zones</li>
                <li>• Mid: 5x reward, medium zones</li>
                <li>• High: 10x reward, narrow zones</li>
                <li>• Higher difficulty = bigger rewards</li>
                <li>• Timing is everything</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-purple-400 mb-2">Strategy Tips</h4>
              <ul className="text-medium-contrast text-sm space-y-1">
                <li>• Practice timing on low difficulty</li>
                <li>• Watch pulse speed patterns</li>
                <li>• Start with small bets</li>
                <li>• Focus on green zones</li>
                <li>• Stay calm and focused</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}