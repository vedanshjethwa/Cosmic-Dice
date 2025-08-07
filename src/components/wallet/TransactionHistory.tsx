import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle, Gamepad2, Gift, Filter } from 'lucide-react';
import { api } from '../../lib/api';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  wallet_type: string;
  status: string;
  payment_method?: string;
  created_at: string;
  metadata?: any;
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = async (pageNum = 1, filterType = 'all') => {
    try {
      setIsLoading(true);
      const response = await api.getTransactionHistory(
        pageNum, 
        20, 
        filterType === 'all' ? undefined : filterType
      );
      
      if (pageNum === 1) {
        setTransactions(response.transactions);
      } else {
        setTransactions(prev => [...prev, ...response.transactions]);
      }
      
      setHasMore(response.pagination.hasMore);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(1, filter);
    setPage(1);
  }, [filter]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTransactions(nextPage, filter);
  };

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
      case 'bonus':
      case 'referral':
        return <Gift className="w-5 h-5 text-purple-400" />;
      default:
        return <ArrowUpCircle className="w-5 h-5 text-gray-400" />;
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

  const formatAmount = (amount: number, type: string) => {
    const isPositive = ['deposit', 'win', 'bonus', 'referral', 'manual_credit'].includes(type);
    return `${isPositive ? '+' : ''}₹${Math.abs(amount).toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#132F4C] rounded-xl border border-blue-500/20"
    >
      <div className="p-6 border-b border-blue-500/20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Transaction History</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#0A1929] border border-blue-500/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Transactions</option>
              <option value="deposit">Deposits</option>
              <option value="withdrawal">Withdrawals</option>
              <option value="bet">Bets</option>
              <option value="win">Wins</option>
              <option value="bonus">Bonuses</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {isLoading && transactions.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No transactions found
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <div className="font-medium text-white capitalize">
                      {transaction.type.replace('_', ' ')}
                      {transaction.payment_method && (
                        <span className="text-gray-400 text-sm ml-2">
                          via {transaction.payment_method}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(transaction.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    ['deposit', 'win', 'bonus', 'referral', 'manual_credit'].includes(transaction.type)
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {formatAmount(transaction.amount, transaction.type)}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}

            {hasMore && (
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}