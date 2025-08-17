import React from 'react';
import { BarChart2 } from 'lucide-react';

interface StatsProps {
  history: Array<{
    result: 'win' | 'early' | 'late';
    amount: number;
    timestamp: Date;
  }>;
}

const Stats: React.FC<StatsProps> = ({ history }) => {
  const winRate = history.length > 0
    ? (history.filter(h => h.result === 'win').length / history.length * 100).toFixed(1)
    : '0.0';

  const totalWinnings = history
    .filter(h => h.result === 'win')
    .reduce((sum, h) => sum + h.amount, 0);

  return (
    <div className="bg-gray-800 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      
      <div className="relative">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart2 className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold">Your Stats</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Win Rate</div>
            <div className="text-2xl font-bold">{winRate}%</div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Total Winnings</div>
            <div className="text-2xl font-bold">${totalWinnings}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;