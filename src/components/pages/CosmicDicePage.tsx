import React, { useState } from 'react';
import { ArrowLeft, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CosmicDicePageProps {
  onBack: () => void;
}

export const CosmicDicePage: React.FC<CosmicDicePageProps> = ({ onBack }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<'over' | 'under' | null>(null);
  const [targetNumber, setTargetNumber] = useState(3.5);
  const [betAmount, setBetAmount] = useState(10);
  const [balance, setBalance] = useState(1000);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

  const rollDice = async () => {
    if (!prediction) return;
    
    setIsRolling(true);
    setGameResult(null);
    
    // Simulate rolling animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceValue(result);
    
    // Determine win/lose
    const won = (prediction === 'over' && result > targetNumber) || 
                (prediction === 'under' && result < targetNumber);
    
    setGameResult(won ? 'win' : 'lose');
    
    if (won) {
      setBalance(prev => prev + betAmount);
    } else {
      setBalance(prev => prev - betAmount);
    }
    
    setIsRolling(false);
  };

  const DiceIcon = diceValue ? diceIcons[diceValue - 1] : Dice1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-lg hover:bg-purple-600/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Cosmic Dice
        </h1>
        <div className="text-right">
          <div className="text-sm text-gray-400">Balance</div>
          <div className="text-xl font-bold text-green-400">${balance}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Game Area */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Dice Display */}
          <div className="bg-black/20 rounded-2xl p-8 border border-purple-500/20">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-6">Roll the Dice</h2>
              
              <div className="flex justify-center mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isRolling ? 'rolling' : diceValue}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ 
                      scale: 1, 
                      rotate: isRolling ? 360 : 0 
                    }}
                    exit={{ scale: 0 }}
                    transition={{ 
                      duration: isRolling ? 2 : 0.5,
                      ease: "easeInOut"
                    }}
                    className={`p-4 rounded-2xl ${
                      gameResult === 'win' ? 'bg-green-500/20 border-green-500' :
                      gameResult === 'lose' ? 'bg-red-500/20 border-red-500' :
                      'bg-purple-500/20 border-purple-500'
                    } border-2`}
                  >
                    <DiceIcon className="w-24 h-24 text-white" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {diceValue && !isRolling && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold mb-2">{diceValue}</div>
                  <div className={`text-lg font-semibold ${
                    gameResult === 'win' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {gameResult === 'win' ? 'You Win!' : 'You Lose!'}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-black/20 rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-6">Place Your Bet</h2>
            
            {/* Bet Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Bet Amount</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
                min="1"
                max={balance}
              />
            </div>

            {/* Target Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Target Number</label>
              <input
                type="number"
                value={targetNumber}
                onChange={(e) => setTargetNumber(Number(e.target.value))}
                className="w-full px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
                min="1"
                max="6"
                step="0.1"
              />
            </div>

            {/* Prediction Buttons */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Prediction</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPrediction('over')}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    prediction === 'over'
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  Over {targetNumber}
                </button>
                <button
                  onClick={() => setPrediction('under')}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    prediction === 'under'
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  }`}
                >
                  Under {targetNumber}
                </button>
              </div>
            </div>

            {/* Roll Button */}
            <button
              onClick={rollDice}
              disabled={!prediction || isRolling || betAmount > balance}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>
          </div>
        </div>

        {/* Game Rules */}
        <div className="mt-8 bg-black/20 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-bold mb-4">How to Play</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Rules:</h4>
              <ul className="space-y-1">
                <li>• Choose your bet amount</li>
                <li>• Set a target number (1-6)</li>
                <li>• Predict if the dice will roll over or under</li>
                <li>• Roll and see if you win!</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Payouts:</h4>
              <ul className="space-y-1">
                <li>• Correct prediction = 2x your bet</li>
                <li>• Wrong prediction = lose your bet</li>
                <li>• Higher risk = higher reward</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};