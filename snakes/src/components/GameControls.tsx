import React from 'react';
import { motion } from 'framer-motion';
import { Play, DollarSign, RotateCcw, TrendingUp, Target, Dice6 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const GameControls: React.FC = () => {
  const { 
    gameStatus, 
    startGame, 
    rollDice,
    cashOut, 
    resetGame, 
    balance, 
    totalMultiplier,
    currentBet,
    snakeCount,
    setBet,
    setSnakeCount,
    getRiskLevel,
    currentPosition,
    isRolling
  } = useGameStore();

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseFloat(e.target.value) || 0, 0), balance);
    setBet(value);
  };

  const handleSnakeCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSnakeCount(parseInt(e.target.value));
  };

  const potentialWin = currentBet * totalMultiplier;
  const riskLevel = getRiskLevel();

  return (
    <div className="space-y-6">
      {/* Game Setup */}
      {gameStatus === 'idle' && (
        <motion.div
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Game Setup</h3>
          
          <div className="space-y-4">
            {/* Bet Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Bet Amount
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={currentBet}
                    onChange={handleBetChange}
                    className="w-full bg-slate-700/50 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-600"
                    placeholder="Enter bet amount"
                    step="0.01"
                    min="0"
                    max={balance}
                  />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setBet(Math.max(0.01, currentBet / 2))}
                    className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 text-sm transition-colors"
                  >
                    ½
                  </button>
                  <button
                    onClick={() => setBet(Math.min(currentBet * 2, balance))}
                    className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 text-sm transition-colors"
                  >
                    2×
                  </button>
                  <button
                    onClick={() => setBet(balance)}
                    className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 text-sm transition-colors"
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>

            {/* Snake Count */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Number of Snakes
              </label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={snakeCount}
                  onChange={handleSnakeCountChange}
                  className="w-full bg-slate-700/50 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-600 appearance-none"
                >
                  {Array.from({ length: 24 }, (_, i) => i + 1).map(count => (
                    <option key={count} value={count}>
                      {count} Snake{count > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Risk Level Indicator */}
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${riskLevel.color}-500`}></div>
                <span className={`text-sm text-${riskLevel.color}-400 font-medium`}>
                  {riskLevel.level} Risk
                </span>
                <span className="text-xs text-slate-400">
                  ({riskLevel.range})
                </span>
              </div>
            </div>

            <motion.button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              onClick={() => startGame(currentBet, snakeCount)}
              whileTap={{ scale: 0.98 }}
              disabled={currentBet <= 0 || currentBet > balance}
            >
              <Play className="w-5 h-5" />
              Start Game - ${currentBet.toFixed(2)}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Active Game Controls */}
      {(gameStatus === 'playing' || gameStatus === 'rolling') && (
        <motion.div
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Current Game</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-slate-400">Position</div>
              <div className="text-2xl font-bold text-blue-400">
                {currentPosition + 1}/25
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Current Multiplier</div>
              <div className="text-2xl font-bold text-green-400">
                {totalMultiplier.toFixed(2)}x
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-sm text-slate-400">Potential Win</div>
            <div className="text-3xl font-bold text-yellow-400">
              ${potentialWin.toFixed(2)}
            </div>
          </div>

          <div className="space-y-3">
            <motion.button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={rollDice}
              whileTap={{ scale: 0.98 }}
              disabled={isRolling || gameStatus === 'rolling'}
            >
              <Dice6 className="w-5 h-5" />
              {isRolling ? 'Rolling...' : 'Roll Dice (1-3)'}
            </motion.button>

            <motion.button
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50"
              onClick={cashOut}
              whileTap={{ scale: 0.98 }}
              disabled={totalMultiplier <= 1 || isRolling}
            >
              <TrendingUp className="w-5 h-5" />
              Cash Out - ${potentialWin.toFixed(2)}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Game Over */}
      {(gameStatus === 'won' || gameStatus === 'lost') && (
        <motion.div
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-6">
            {gameStatus === 'won' ? (
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">🎉 You Won!</div>
                <div className="text-lg text-slate-300 mb-1">
                  Final Position: {currentPosition + 1}/25
                </div>
                <div className="text-lg text-slate-300 mb-1">
                  Multiplier: {totalMultiplier.toFixed(2)}x
                </div>
                <div className="text-xl font-semibold text-yellow-400">
                  Won: ${potentialWin.toFixed(2)}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-3xl font-bold text-red-400 mb-2">🐍 Snake Bite!</div>
                <div className="text-lg text-slate-300 mb-1">
                  Position Reached: {currentPosition + 1}/25
                </div>
                <div className="text-lg text-slate-300">
                  Better luck next time!
                </div>
                <div className="text-lg text-red-400">
                  Lost: ${currentBet.toFixed(2)}
                </div>
              </div>
            )}
          </div>

          <motion.button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            onClick={resetGame}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default GameControls;