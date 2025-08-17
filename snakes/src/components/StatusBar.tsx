import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Target, Zap, TrendingUp, MapPin } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const StatusBar: React.FC = () => {
  const { balance, snakeCount, totalMultiplier, gameStatus, currentBet, currentPosition, getRiskLevel } = useGameStore();
  const riskLevel = getRiskLevel();

  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Wallet className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Balance</div>
            <div className="font-bold text-green-400">${balance.toFixed(2)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`p-2 bg-${riskLevel.color}-500/20 rounded-lg`}>
            <Target className={`w-5 h-5 text-${riskLevel.color}-400`} />
          </div>
          <div>
            <div className="text-xs text-slate-400">Risk Level</div>
            <div className={`font-bold text-${riskLevel.color}-400`}>
              {riskLevel.level} ({snakeCount})
            </div>
          </div>
        </div>

        {(gameStatus === 'playing' || gameStatus === 'rolling') && (
          <>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Position</div>
                <div className="font-bold text-blue-400">{currentPosition + 1}/25</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Multiplier</div>
                <div className="font-bold text-purple-400">{totalMultiplier.toFixed(2)}x</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Potential</div>
                <div className="font-bold text-yellow-400">${(currentBet * totalMultiplier).toFixed(2)}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default StatusBar;