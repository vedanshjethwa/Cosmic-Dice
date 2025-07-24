import React from 'react';
import { Trophy } from 'lucide-react';

const MOCK_LEADERS = [
  { name: "Alex", score: 2500, rank: 1 },
  { name: "Sarah", score: 2100, rank: 2 },
  { name: "Mike", score: 1800, rank: 3 },
  { name: "Emma", score: 1600, rank: 4 },
  { name: "John", score: 1400, rank: 5 },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      
      <div className="relative">
        <div className="flex items-center space-x-2 mb-6">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold">Leaderboard</h2>
        </div>

        <div className="space-y-3">
          {MOCK_LEADERS.map((leader) => (
            <div
              key={leader.name}
              className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  leader.rank === 1 ? 'bg-yellow-400' :
                  leader.rank === 2 ? 'bg-gray-300' :
                  leader.rank === 3 ? 'bg-amber-700' : 'bg-gray-600'
                } font-bold text-gray-900`}>
                  {leader.rank}
                </span>
                <span className="font-medium">{leader.name}</span>
              </div>
              <span className="font-bold">${leader.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;