import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, Filter, Download, Search, Calendar, ArrowUpCircle, ArrowDownCircle, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
  game?: string;
}

export function TransactionsPage() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  const mockTransactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'deposit',
      amount: 1000,
      status: 'completed',
      date: '2024-03-15T10:30:00Z',
      description: 'UPI Deposit via PhonePe'
    },
    {
      id: 'TXN002',
      type: 'bet',
      amount: -50,
      status: 'completed',
      date: '2024-03-15T11:15:00Z',
      description: 'Game Bet',
      game: 'Cosmic Dice'
    },
    {
      id: 'TXN003',
      type: 'win',
      amount: 250,
      status: 'completed',
      date: '2024-03-15T11:16:00Z',
      description: 'Game Win',
      game: 'Cosmic Dice'
    },
    {
      id: 'TXN004',
      type: 'withdrawal',
      amount: -500,
      status: 'pending',
      date: '2024-03-15T14:20:00Z',
      description: 'Withdrawal to Bank Account'
    },
    {
      id: 'TXN005',
      type: 'bet',
      amount: -100,
      status: 'completed',
      date: '2024-03-14T16:45:00Z',
      description: 'Game Bet',
      game: 'Cosmic RPS'
    },
    {
      id: 'TXN006',
      type: 'deposit',
      amount: 2000,
      status: 'completed',
      date: '2024-03-14T09:00:00Z',
      description: 'Net Banking Deposit'
    },
    {
      id: 'TXN007',
      type: 'bet',
      amount: -75,
      status: 'completed',
      date: '2024-03-13T20:30:00Z',
      description: 'Game Bet',
      game: 'Cosmic Balloon'
    },
    {
      id: 'TXN008',
      type: 'win',
      amount: 375,
      status: 'completed',
      date: '2024-03-13T20:31:00Z',
      description: 'Game Win',
      game: 'Cosmic Balloon'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpCircle className="w-5 h-5 text-green-400" />;
      case 'withdrawal':
        return <ArrowDownCircle className="w-5 h-5 text-red-400" />;
      case 'bet':
        return <Gamepad2 className="w-5 h-5 text-orange-400" />;
      case 'win':
        return <ArrowUpCircle className="w-5 h-5 text-blue-400" />;
      default:
        return <History className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'failed':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transaction.game && transaction.game.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const totalBalance = mockTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalDeposits = mockTransactions.filter(tx => tx.type === 'deposit').reduce((sum, tx) => sum + tx.amount, 0);
  const totalWithdrawals = Math.abs(mockTransactions.filter(tx => tx.type === 'withdrawal').reduce((sum, tx) => sum + tx.amount, 0));
  const totalWinnings = mockTransactions.filter(tx => tx.type === 'win').reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Single Header */}
      <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h1
              className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
              style={{
                 fontFamily: "'Orbitron', sans-serif"
                }}
            >
              Cosmic - Transaction History
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="text-sm text-gray-400 mb-1">Total Balance</div>
            <div className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₹{totalBalance.toLocaleString()}
            </div>
          </div>
          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="text-sm text-gray-400 mb-1">Total Deposits</div>
            <div className="text-2xl font-bold text-green-400">
              ₹{totalDeposits.toLocaleString()}
            </div>
          </div>
          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="text-sm text-gray-400 mb-1">Total Withdrawals</div>
            <div className="text-2xl font-bold text-red-400">
              ₹{totalWithdrawals.toLocaleString()}
            </div>
          </div>
          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="text-sm text-gray-400 mb-1">Total Winnings</div>
            <div className="text-2xl font-bold text-blue-400">
              ₹{totalWinnings.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Transaction Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-[#0A1929] border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Transactions</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="bet">Bets</option>
                <option value="win">Wins</option>
              </select>

              {/* Date Range Filter */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-[#0A1929] border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              {/* Export Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                <Download size={16} />
                Export
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-64 bg-[#0A1929] text-white rounded-lg pl-10 pr-4 py-2 border border-blue-500/20 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#132F4C] rounded-xl border border-blue-500/20 overflow-hidden"
        >
          <div className="p-6 border-b border-blue-500/20">
            <h2 className="text-xl font-bold text-white">Transaction History</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0A1929]">
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium">Transaction ID</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Amount</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-blue-500/10 hover:bg-blue-500/5 transition-colors"
                  >
                    <td className="p-4">
                      <span className="font-mono text-sm text-blue-400">{transaction.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="capitalize text-white">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">
                      {new Date(transaction.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="text-white">{transaction.description}</div>
                        {transaction.game && (
                          <div className="text-xs text-blue-400 mt-1">{transaction.game}</div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <History className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </motion.div>

        {/* Transaction Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{mockTransactions.length}</div>
              <div className="text-sm text-gray-400">Total Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {mockTransactions.filter(tx => tx.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {mockTransactions.filter(tx => tx.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-400">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {mockTransactions.filter(tx => tx.status === 'failed').length}
              </div>
              <div className="text-sm text-gray-400">Failed</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}