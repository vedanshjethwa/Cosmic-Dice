import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { borders } from '../styles/borders';
import { Tooltip } from './Tooltip';

interface GameAreaProps {
  betAmount: number;
  setBetAmount: (amount: number) => void;
  onResult: (result: 'green' | 'yellow' | 'miss', difficulty: 'low' | 'mid' | 'high') => void;
  balance: number;
}

interface ZoneConfig {
  green: { start: number; end: number };
  yellow: { left: { start: number; end: number }; right: { start: number; end: number } };
}

// Adjusted zone configurations for perfect centering
const BASE_DIFFICULTY_CONFIGS: Record<'low' | 'mid' | 'high', ZoneConfig> = {
  low: {
    green: { start: 40, end: 60 }, // Centered 20% width
    yellow: {
      left: { start: 30, end: 40 },
      right: { start: 60, end: 70 }
    }
  },
  mid: {
    green: { start: 42, end: 58 }, // Centered 16% width
    yellow: {
      left: { start: 32, end: 42 },
      right: { start: 58, end: 68 }
    }
  },
  high: {
    green: { start: 45, end: 55 }, // Centered 10% width
    yellow: {
      left: { start: 35, end: 45 },
      right: { start: 55, end: 65 }
    }
  }
};

const SPEED_RANGE = { min: 2.5, max: 3.0 };
const ZONE_SHIFT_RANGE = 5;
const MIN_BET = 10;
const MAX_BET = 10000;

const GameArea: React.FC<GameAreaProps> = ({ betAmount, setBetAmount, onResult, balance }) => {
  const [gameState, setGameState] = useState<'idle' | 'running' | 'result'>('idle');
  const [position, setPosition] = useState(0);
  const [difficulty, setDifficulty] = useState<'low' | 'mid' | 'high'>('low');
  const [message, setMessage] = useState('');
  const [lastTapTime, setLastTapTime] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [currentZones, setCurrentZones] = useState<ZoneConfig>(BASE_DIFFICULTY_CONFIGS.low);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const animationRef = useRef<number>();
  const { playSound } = useSound();

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState === 'running') return;
    const value = parseInt(e.target.value) || 0;
    setBetAmount(Math.min(Math.max(value, MIN_BET), Math.min(MAX_BET, balance)));
  };

  const handleDecreaseBet = () => {
    if (gameState === 'running') return;
    const newAmount = Math.max(MIN_BET, Math.floor(betAmount / 2));
    setBetAmount(newAmount);
  };

  const handleIncreaseBet = () => {
    if (gameState === 'running') return;
    const newAmount = Math.min(balance, Math.min(MAX_BET, betAmount * 2));
    setBetAmount(newAmount);
  };

  const generateRandomZones = (baseDifficulty: 'low' | 'mid' | 'high') => {
    const baseConfig = BASE_DIFFICULTY_CONFIGS[baseDifficulty];
    const shift = (Math.random() * 2 - 1) * ZONE_SHIFT_RANGE;

    return {
      green: {
        start: Math.max(0, Math.min(100, baseConfig.green.start + shift)),
        end: Math.max(0, Math.min(100, baseConfig.green.end + shift))
      },
      yellow: {
        left: {
          start: Math.max(0, Math.min(100, baseConfig.yellow.left.start + shift)),
          end: Math.max(0, Math.min(100, baseConfig.yellow.left.end + shift))
        },
        right: {
          start: Math.max(0, Math.min(100, baseConfig.yellow.right.start + shift)),
          end: Math.max(0, Math.min(100, baseConfig.yellow.right.end + shift))
        }
      }
    };
  };

  const generateRandomSpeed = () => {
    return SPEED_RANGE.min + Math.random() * (SPEED_RANGE.max - SPEED_RANGE.min);
  };

  const startGame = () => {
    if (betAmount > balance || betAmount <= 0) return;
    
    const newSpeed = generateRandomSpeed();
    const newZones = generateRandomZones(difficulty);
    
    setGameState('running');
    setPosition(0);
    setMessage('');
    setCurrentSpeed(newSpeed);
    setCurrentZones(newZones);
    playSound('start');
  };

  const handleTap = () => {
    if (gameState !== 'running') return;

    const now = Date.now();
    if (now - lastTapTime < 100) return;
    setLastTapTime(now);
    
    setGameState('result');
    playSound('tap');

    let winnings = 0;
    if (position >= currentZones.green.start && position <= currentZones.green.end) {
      winnings = betAmount * (difficulty === 'low' ? 2 : difficulty === 'mid' ? 5 : 10);
      setMessage(`Perfect Hit! +₹${winnings}`);
      playSound('win');
      setTotalProfit(prev => prev + winnings - betAmount);
      onResult('green', difficulty);
    } else if (
      (position >= currentZones.yellow.left.start && position <= currentZones.yellow.left.end) ||
      (position >= currentZones.yellow.right.start && position <= currentZones.yellow.right.end)
    ) {
      winnings = betAmount * 0.5;
      setMessage(`Almost there! -₹${betAmount - winnings}`);
      playSound('lose');
      setTotalLoss(prev => prev + (betAmount - winnings));
      onResult('yellow', difficulty);
    } else {
      setMessage('You missed! Try again.');
      playSound('lose');
      setTotalLoss(prev => prev + betAmount);
      onResult('miss', difficulty);
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
    <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-xl p-6 shadow-lg relative overflow-hidden border border-blue-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(45,55,72,0.3)] to-[rgba(66,153,225,0.15)]" />
      
      <div className="relative">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-[#1E90FF] bg-clip-text text-transparent">
              Time your prediction perfectly!
            </h2>
            <button
              onClick={() => setShowTooltip(!showTooltip)}
              className="p-1 hover:bg-blue-500/10 rounded-full transition-colors"
            >
              <Info className="w-5 h-5 text-blue-400" />
            </button>
          </div>
          {showTooltip && (
            <Tooltip>
              Tap when the pulse enters the colored zone to win. Timing is everything!
            </Tooltip>
          )}
          <p className="text-gray-400">Tap when the pulse enters the green zone</p>
        </div>

        <div className="h-32 flex items-center justify-center relative mb-8">
          <div className="w-full h-4 bg-black/50 rounded-full relative border border-blue-500/20">
            <div 
              className="absolute inset-y-0 bg-green-500/30 rounded-full"
              style={{
                left: `${currentZones.green.start}%`,
                right: `${100 - currentZones.green.end}%`
              }}
            />
            <div 
              className="absolute inset-y-0 bg-yellow-500/30 rounded-full"
              style={{
                left: `${currentZones.yellow.left.start}%`,
                right: `${100 - currentZones.yellow.left.end}%`
              }}
            />
            <div 
              className="absolute inset-y-0 bg-yellow-500/30 rounded-full"
              style={{
                left: `${currentZones.yellow.right.start}%`,
                right: `${100 - currentZones.yellow.right.end}%`
              }}
            />
            
            {gameState === 'running' && (
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 transform -translate-x-1/2"
                style={{ left: `${position}%` }}
              />
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          {(['low', 'mid', 'high'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              disabled={gameState === 'running'}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${borders.button} ${
                difficulty === level
                  ? 'bg-blue-500 text-white'
                  : gameState === 'running'
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-black/50 text-gray-300 hover:bg-gray-800'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
              <span className="block text-sm opacity-75">
                {level === 'low' ? '2x' : level === 'mid' ? '5x' : '10x'}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleDecreaseBet}
              disabled={gameState === 'running'}
              className={`px-4 py-2 bg-black/50 rounded-lg transition-colors ${borders.button} ${
                gameState === 'running'
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'hover:bg-gray-800'
              }`}
            >
              -
            </button>
            <div className={`bg-black/50 px-6 py-2 rounded-lg ${borders.input}`}>
              <input
                type="number"
                value={betAmount}
                onChange={handleBetChange}
                disabled={gameState === 'running'}
                className="w-24 bg-transparent text-center font-bold focus:outline-none"
                min={MIN_BET}
                max={Math.min(MAX_BET, balance)}
              />
            </div>
            <button
              onClick={handleIncreaseBet}
              disabled={gameState === 'running'}
              className={`px-4 py-2 bg-black/50 rounded-lg transition-colors ${borders.button} ${
                gameState === 'running'
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'hover:bg-gray-800'
              }`}
            >
              +
            </button>
          </div>

          {betAmount <= 0 ? (
            <div className="flex items-center justify-center text-red-400 space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>Bet amount must be greater than 0</span>
            </div>
          ) : betAmount > balance ? (
            <div className="flex items-center justify-center text-red-400 space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>Insufficient balance</span>
            </div>
          ) : (
            <button
              onClick={gameState === 'running' ? handleTap : startGame}
              className={`w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-colors relative group ${borders.button}`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/25 to-blue-400/0 group-hover:animate-shimmer" />
              {gameState === 'running' ? 'TAP!' : 'Start Game'}
            </button>
          )}
        </div>

        {message && (
          <div className="mt-4 text-center font-bold text-xl bg-gradient-to-r from-white to-[#1E90FF] bg-clip-text text-transparent">
            {message}
          </div>
        )}

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg bg-black/30 ${borders.card}`}>
            <div className="text-sm text-gray-400">Total Profit</div>
            <div className="text-xl font-bold text-green-500">₹{totalProfit}</div>
          </div>
          <div className={`p-4 rounded-lg bg-black/30 ${borders.card}`}>
            <div className="text-sm text-gray-400">Total Win</div>
            <div className="text-xl font-bold text-blue-500">₹{totalProfit > 0 ? totalProfit : 0}</div>
          </div>
          <div className={`p-4 rounded-lg bg-black/30 ${borders.card}`}>
            <div className="text-sm text-gray-400">Total Loss</div>
            <div className="text-xl font-bold text-red-500">₹{totalLoss}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameArea;