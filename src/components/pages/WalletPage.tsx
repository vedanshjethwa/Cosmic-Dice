import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  History, 
  Eye, 
  EyeOff,
  CreditCard,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';

export function WalletPage() {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  
  const walletData = {
    balance: 5247.50,
    totalDeposits: 15000,
    totalWithdrawals: 8500,
    totalWinnings: 12750,
    recentTransactions: [
      {
        id: 'TXN001',
        type: 'deposit',
        amount: 1000,
        date: '2024-03-15',
        status: 'completed',
        description: 'UPI Deposit'
      },
      {
        id: 'TXN002',
        type: 'win',
        amount: 500,
        date: '2024-03-15',
        status: 'completed',
        description: 'Cosmic Dice Win'
      },
      {
        id: 'TXN003',
        type: 'withdrawal',
        amount: -750,
        date: '2024-03-14',
        status: 'pending',
        description: 'Bank Transfer'
      },
      {
        id: 'TXN004',
        type: 'bet',
        amount: -100,
        date: '2024-03-14',
        status: 'completed',
        description: 'Cosmic RPS Bet'
      },
      {
        id: 'TXN005',
        type: 'deposit',
        amount: 2000,
        date: '2024-03-13',
        status: 'completed',
        description: 'Net Banking'
      }
    ]
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpCircle className="w-5 h-5 text-green-400" />;
      case 'withdrawal':
        return <ArrowDownCircle className="w-5 h-5 text-red-400" />;
      case 'win':
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
      case 'bet':
        return <TrendingDown className="w-5 h-5 text-orange-400" />;
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
              Cosmic - My Wallet
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Wallet className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Available Balance</h2>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {showBalance ? <EyeOff className="w-6 h-6 text-white" /> : <Eye className="w-6 h-6 text-white" />}
              </button>
            </div>
            
            <div className="text-5xl font-bold text-white mb-6">
              {showBalance ? `₹${walletData.balance.toLocaleString()}` : '₹••••••'}
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <button 
                onClick={() => navigate('/deposit')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all flex items-center justify-center gap-3 border border-white/20"
              >
                <ArrowUpCircle className="w-6 h-6 text-white" />
                <span className="font-semibold text-white">Deposit</span>
              </button>
              <button 
                onClick={() => navigate('/withdrawal')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all flex items-center justify-center gap-3 border border-white/20"
              >
                <ArrowDownCircle className="w-6 h-6 text-white" />
                <span className="font-semibold text-white">Withdraw</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <ArrowUpCircle className="w-6 h-6 text-green-400" />
              <h3 className="font-semibold text-white">Total Deposits</h3>
            </div>
            <div className="text-2xl font-bold text-green-400">
              ₹{walletData.totalDeposits.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <ArrowDownCircle className="w-6 h-6 text-red-400" />
              <h3 className="font-semibold text-white">Total Withdrawals</h3>
            </div>
            <div className="text-2xl font-bold text-red-400">
              ₹{walletData.totalWithdrawals.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold text-white">Total Winnings</h3>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              ₹{walletData.totalWinnings.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#132F4C] rounded-xl border border-blue-500/20"
        >
          <div className="p-6 border-b border-blue-500/20 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
            <button 
              onClick={() => navigate('/transactions')}
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
            >
              <History size={16} />
              View All
            </button>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {walletData.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <div className="font-medium text-white capitalize">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(transaction.date).toLocaleDateString('en-IN')} • {transaction.id}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold text-white">Payment Methods</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Manage your payment methods for deposits and withdrawals
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors">
              Manage Methods
            </button>
          </div>

          <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <History className="w-6 h-6 text-purple-400" />
              <h3 className="font-semibold text-white">Transaction Limits</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              View and modify your daily and monthly transaction limits
            </p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors">
              View Limits
            </button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}