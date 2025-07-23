import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  type: 'loss' | 'deposit' | 'profit';
}

function StatCard({ title, value, change, type }: StatCardProps) {
  const getGradient = () => {
    switch (type) {
      case 'loss':
        return 'from-red-500/20 to-red-900/20 border-red-500/20';
      case 'deposit':
        return 'from-blue-500/20 to-blue-900/20 border-blue-500/20';
      case 'profit':
        return 'from-green-500/20 to-green-900/20 border-green-500/20';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'loss':
        return 'text-red-400';
      case 'deposit':
        return 'text-blue-400';
      case 'profit':
        return 'text-green-400';
    }
  };

  return (
    <div className={`bg-gradient-to-b ${getGradient()} rounded-xl p-4 border backdrop-blur-sm`}>
      <div className="text-gray-400 text-sm mb-2">{title}</div>
      <div className={`text-xl font-bold ${getTextColor()}`}>
        ${value.toLocaleString()}
      </div>
      <div className="flex items-center gap-1 mt-2">
        {change >= 0 ? (
          <TrendingUp className="w-4 h-4 text-green-400" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-400" />
        )}
        <span className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
}

export function StatsSection() {
  const chartData = [
    { date: '2024-03-01', hours: 4.5, loss: 500, deposit: 2000, profit: 750 },
    { date: '2024-03-02', hours: 6.2, loss: 300, deposit: 1500, profit: 900 },
    { date: '2024-03-03', hours: 3.8, loss: 400, deposit: 1800, profit: 600 },
    { date: '2024-03-04', hours: 7.1, loss: 600, deposit: 2500, profit: 1100 },
    { date: '2024-03-05', hours: 5.4, loss: 450, deposit: 1900, profit: 800 },
    { date: '2024-03-06', hours: 8.3, loss: 550, deposit: 2200, profit: 950 },
    { date: '2024-03-07', hours: 4.9, loss: 350, deposit: 1700, profit: 700 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A1929]/90 backdrop-blur-sm p-4 rounded-lg border border-blue-500/20">
          <p className="text-gray-400 mb-2">
            {new Date(label).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </p>
          {payload.map((entry: any) => (
            <p
              key={entry.name}
              className={`text-sm ${
                entry.name === 'loss'
                  ? 'text-red-400'
                  : entry.name === 'deposit'
                  ? 'text-blue-400'
                  : 'text-green-400'
              }`}
            >
              {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}: ${entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6 lg:mt-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Gaming Activity
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Loss"
          value={2500}
          change={-5.2}
          type="loss"
        />
        <StatCard
          title="Deposit"
          value={10000}
          change={12.5}
          type="deposit"
        />
        <StatCard
          title="Profit"
          value={3750}
          change={8.3}
          type="profit"
        />
      </div>

      {/* Chart */}
      <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/20">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDeposit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                }
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="loss"
                stroke="#EF4444"
                fillOpacity={1}
                fill="url(#colorLoss)"
              />
              <Area
                type="monotone"
                dataKey="deposit"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorDeposit)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#22C55E"
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}