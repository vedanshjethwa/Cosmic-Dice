import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpCircle, ArrowDownCircle, History, Eye, EyeOff } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { DepositModal } from './DepositModal';
import { WithdrawModal } from './WithdrawModal';
import { TransactionHistory } from './TransactionHistory';

export function WalletDashboard() {
  const { wallet, isLoading, refreshWallet } = useWallet();
  const [showBalance, setShowBalance] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="text-center p-8">
        <p className="text-red-400">Failed to load wallet data</p>
      </div>
    );
  }

  const totalBalance = wallet.realBalance + wallet.bonusBalance;

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Wallet className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-white">Total Balance</h2>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {showBalance ? <EyeOff className="w-6 h-6 text-white" /> : <Eye className="w-6 h-6 text-white" />}
            </button>
          </div>
          
          <div className="text-5xl font-bold text-white mb-6">
            {showBalance ? `₹${totalBalance.toLocaleString()}` : '₹••••••'}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/80 text-sm">Real Balance</div>
              <div className="text-white font-bold text-xl">
                {showBalance ? `₹${wallet.realBalance.toLocaleString()}` : '₹••••••'}
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/80 text-sm">Bonus Balance</div>
              <div className="text-white font-bold text-xl">
                {showBalance ? `₹${wallet.bonusBalance.toLocaleString()}` : '₹••••••'}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowDepositModal(true)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all flex items-center justify-center gap-3 border border-white/20"
            >
              <ArrowUpCircle className="w-6 h-6 text-white" />
              <span className="font-semibold text-white">Deposit</span>
            </button>
            <button 
              onClick={() => setShowWithdrawModal(true)}
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
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <ArrowUpCircle className="w-6 h-6 text-green-400" />
            <h3 className="font-semibold text-white">Total Deposits</h3>
          </div>
          <div className="text-2xl font-bold text-green-400">
            ₹{wallet.totalDeposited.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <ArrowDownCircle className="w-6 h-6 text-red-400" />
            <h3 className="font-semibold text-white">Total Withdrawals</h3>
          </div>
          <div className="text-2xl font-bold text-red-400">
            ₹{wallet.totalWithdrawn.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <History className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold text-white">Total Wagered</h3>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            ₹{wallet.totalWagered.toLocaleString()}
          </div>
        </div>

        <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-6 h-6 text-purple-400" />
            <h3 className="font-semibold text-white">Total Won</h3>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            ₹{wallet.totalWon.toLocaleString()}
          </div>
        </div>
      </motion.div>

      {/* Transaction History Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={() => setShowTransactions(!showTransactions)}
          className="w-full bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 hover:bg-[#1A243D] transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold text-white">Transaction History</span>
          </div>
          <span className="text-blue-400">View →</span>
        </button>
      </motion.div>

      {/* Transaction History */}
      {showTransactions && <TransactionHistory />}

      {/* Modals */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onSuccess={() => {
          setShowDepositModal(false);
          refreshWallet();
        }}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onSuccess={() => {
          setShowWithdrawModal(false);
          refreshWallet();
        }}
        availableBalance={wallet.realBalance}
      />
    </div>
  );
}