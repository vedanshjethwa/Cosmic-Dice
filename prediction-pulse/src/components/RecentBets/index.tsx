import React from 'react';
import { History } from 'lucide-react';

interface BetHistoryProps {
  history: Array<{
    result: 'green' | 'yellow' | 'miss';
    amount: number;
    winnings: number;
    timestamp: Date;
    difficulty: 'low' | 'mid' | 'high';
  }>;
}

const RecentBets: React.FC<BetHistoryProps> = ({ history }) => {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black rounded-xl p-6 relative overflow-hidden border border-blue-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(45,55,72,0.3)] to-[rgba(66,153,225,0.15)]" />
      
      <div className="relative">
        <div className="flex items-center space-x-2 mb-6">
          <History className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-[#1E90FF] bg-clip-text text-transparent">
            Recent Bets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((bet, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                bet.result === 'green' ? 'bg-green-500/10 border border-green-500/20' :
                bet.result === 'yellow' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                'bg-red-500/10 border border-red-500/20'
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
                  <span className="text-sm text-gray-400 ml-2">
                    ({bet.difficulty.toUpperCase()})
                  </span>
                </div>
                <span className="font-bold">
                  {bet.winnings >= 0 ? `+₹${bet.winnings}` : `-₹${Math.abs(bet.winnings)}`}
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Bet: ₹{bet.amount} • {new Date(bet.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-4">
              No bets yet. Start playing!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentBets;