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

const BetHistory: React.FC<BetHistoryProps> = ({ history }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      
      <div className="relative">
        <div className="flex items-center space-x-2 mb-6">
          <History className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold">Recent Bets</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((bet, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                bet.result === 'green' ? 'bg-green-500/20 border border-green-500/30' :
                bet.result === 'yellow' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                'bg-red-500/20 border border-red-500/30'
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
                  {bet.winnings >= 0 ? `+$${bet.winnings}` : `-$${Math.abs(bet.winnings)}`}
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Bet: ${bet.amount} • {new Date(bet.timestamp).toLocaleTimeString()}
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
}

export default BetHistory;