import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
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
  const animationRef = useRef<number>();

  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  const zones = {
    low: { green: { start: 40, end: 60 }, yellow: { left: { start: 30, end: 40 }, right: { start: 60, end: 70 } } },
    mid: { green: { start: 42, end: 58 }, yellow: { left: { start: 32, end: 42 }, right: { start: 58, end: 68 } } },
    high: { green: { start: 45, end: 55 }, yellow: { left: { start: 35, end: 45 }, right: { start: 55, end: 65 } } }
  };

  const currentZones = zones[difficulty];

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
    if (position >= currentZones.green.start && position <= currentZones.green.end) {
      winnings = betAmount * (difficulty === 'low' ? 2 : difficulty === 'mid' ? 5 : 10);
      setMessage(`Perfect Hit! +₹${winnings}`);
      updateBalance(winnings);
      handleGameResult('green', difficulty);
    } else if (
      (position >= currentZones.yellow.left.start && position <= currentZones.yellow.left.end) ||
      (position >= currentZones.yellow.right.start && position <= currentZones.yellow.right.end)
    ) {
      winnings = betAmount * 0.5;
      setMessage(`Almost there! -₹${betAmount - winnings}`);
      updateBalance(winnings);
      handleGameResult('yellow', difficulty);
    } else {
      setMessage('You missed! Try again.');
      handleGameResult('miss', difficulty);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2a] via-[#132f4c] to-[#0a1a2a] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Area */}
          <div className="bg-[#132f4c] rounded-2xl p-8 shadow-2xl border border-blue-500/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Time your prediction perfectly!</h2>
              <p className="text-gray-400">Tap when the pulse enters the green zone</p>
            </div>

            {/* Pulse Bar */}
            <div className="h-32 flex items-center justify-center relative mb-8">
              <div className="w-full h-6 bg-[#0f253c] relative border-2 border-blue-500/30 shadow-lg rounded-full overflow-hidden">
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
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg shadow-blue-400/50 transform -translate-x-1/2 animate-spin"
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
                  className={`px-6 py-3 rounded-xl font-medium transition-all border-2 ${
                    difficulty === level
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-400 shadow-lg shadow-blue-500/30'
                      : gameState === 'running'
                      ? 'bg-[#3c3c3c] text-gray-500 cursor-not-allowed border-gray-600'
                      : 'bg-[#112a44] text-gray-300 hover:text-white border-blue-500/30 hover:border-blue-400/50'
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
                  className="px-4 py-2 bg-[#112a44] hover:bg-[#1a3a5f] border border-blue-500/30 hover:border-blue-400/50 rounded-xl transition-all disabled:opacity-50"
                >
                  ½
                </button>
                <div className="bg-[#0f253c] px-6 py-3 rounded-xl border border-blue-500/30">
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={gameState === 'running'}
                    className="w-24 bg-transparent text-center font-bold focus:outline-none text-white text-lg"
                    min="1"
                    max={currentBalance}
                  />
                </div>
                <button
                  onClick={() => setBetAmount(Math.min(currentBalance, betAmount * 2))}
                  disabled={gameState === 'running'}
                  className="px-4 py-2 bg-[#112a44] hover:bg-[#1a3a5f] border border-blue-500/30 hover:border-blue-400/50 rounded-xl transition-all disabled:opacity-50"
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
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl relative group overflow-hidden ${
                  betAmount <= 0 || betAmount > currentBalance
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 shadow-blue-500/40'
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
            <div className="bg-[#132f4c] rounded-2xl p-6 shadow-xl border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#112a44] rounded-xl p-4 text-center border border-blue-500/20">
                  <div className="text-sm text-gray-400 mb-1">Total Profit</div>
                  <div className="text-xl font-bold text-green-400">₹0</div>
                </div>
                <div className="bg-[#112a44] rounded-xl p-4 text-center border border-green-500/20">
                  <div className="text-sm text-gray-400 mb-1">Total Win</div>
                  <div className="text-xl font-bold text-blue-400">₹0</div>
                </div>
                <div className="bg-[#112a44] rounded-xl p-4 text-center border border-red-500/20">
                  <div className="text-sm text-gray-400 mb-1">Total Loss</div>
                  <div className="text-xl font-bold text-red-400">₹0</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Info Section */}
        <div className="mt-8 bg-[#132f4c] rounded-2xl p-6 shadow-xl border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">How to Play Prediction Pulse</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Watch the pulse move</li>
                <li>• Tap when in colored zones</li>
                <li>• Green zone = maximum reward</li>
                <li>• Yellow zone = partial reward</li>
                <li>• Miss = lose bet</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-green-400 mb-2">Difficulty Levels</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Low: 2x reward, wider zones</li>
                <li>• Mid: 5x reward, medium zones</li>
                <li>• High: 10x reward, narrow zones</li>
                <li>• Higher difficulty = bigger rewards</li>
                <li>• Timing is everything</li>
              </ul>
            </div>
            <div className="bg-[#112a44] rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-bold text-purple-400 mb-2">Strategy Tips</h4>
              <ul className="text-gray-300 text-sm space-y-1">
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