import React from 'react';
import {
  X,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  History,
} from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit?: () => void;
  onWithdraw?: () => void;
}

export function WalletModal({ isOpen, onClose, onDeposit, onWithdraw }: WalletModalProps) {
  const walletData = {
    balance: 5000,
    transactions: [
      {
        id: 1,
        type: 'deposit',
        amount: 1000,
        date: '2024-03-10',
        status: 'completed',
      },
      {
        id: 2,
        type: 'withdrawal',
        amount: -500,
        date: '2024-03-09',
        status: 'pending',
      },
      {
        id: 3,
        type: 'deposit',
        amount: 2000,
        date: '2024-03-08',
        status: 'completed',
      },
    ],
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A1929] rounded-2xl w-full max-w-2xl relative overflow-hidden border border-blue-500/20">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Wallet className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Your Wallet</h2>
          </div>

          {/* Balance Card */}
          <div className="bg-blue-900/30 rounded-xl p-6 mb-6 border border-blue-500/20">
            <div className="text-gray-400 mb-2">Available Balance</div>
            <div className="text-3xl font-bold text-white">
              ${walletData.balance.toLocaleString()}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={onDeposit}
              className="flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg py-3 px-4 transition-colors border border-green-500/20"
            >
              <ArrowUpCircle size={20} />
              <span>Deposit</span>
            </button>
            <button 
              onClick={onWithdraw}
              className="flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg py-3 px-4 transition-colors border border-red-500/20"
            >
              <ArrowDownCircle size={20} />
              <span>Withdraw</span>
            </button>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Recent Transactions
              </h3>
              <button className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                <History size={16} />
                <span>View All</span>
              </button>
            </div>
            <div className="space-y-3">
              {walletData.transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-900/20 border border-blue-500/10"
                >
                  <div className="flex items-center gap-3">
                    {tx.type === 'deposit' ? (
                      <ArrowUpCircle className="text-green-400" size={20} />
                    ) : (
                      <ArrowDownCircle className="text-red-400" size={20} />
                    )}
                    <div>
                      <div className="font-medium text-white">
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </div>
                      <div className="text-sm text-gray-400">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={
                        tx.type === 'deposit'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }
                    >
                      {tx.type === 'deposit' ? '+' : ''}
                      {tx.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 capitalize">
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
