import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Smartphone, Building, ArrowUpCircle } from 'lucide-react';
import { api } from '../../lib/api';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DepositModal({ isOpen, onClose, onSuccess }: DepositModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('UPI');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const paymentMethods = [
    { id: 'UPI', name: 'UPI', icon: Smartphone, min: 100, max: 100000 },
    { id: 'Net Banking', name: 'Net Banking', icon: Building, min: 500, max: 200000 },
    { id: 'Paytm Wallet', name: 'Paytm Wallet', icon: CreditCard, min: 100, max: 50000 }
  ];

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);
    if (!selectedMethodData) {
      setError('Please select a payment method');
      return;
    }

    const amountNum = parseFloat(amount);
    if (amountNum < selectedMethodData.min || amountNum > selectedMethodData.max) {
      setError(`Amount must be between ₹${selectedMethodData.min} and ₹${selectedMethodData.max}`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const orderResponse = await api.createDepositOrder(amountNum, selectedMethod);
      
      // Initialize Razorpay
      const options = {
        key: orderResponse.key,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        order_id: orderResponse.orderId,
        name: 'Cosmic777',
        description: 'Deposit to Cosmic Wallet',
        handler: async (response: any) => {
          try {
            await api.verifyDeposit(
              orderResponse.orderId,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            onSuccess();
          } catch (error) {
            setError('Payment verification failed');
          }
        },
        prefill: {
          email: 'user@cosmic777.com'
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Deposit failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#132F4C] rounded-2xl w-full max-w-md border border-blue-500/20"
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
          <h2 className="text-xl font-bold text-white">Deposit Funds</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Payment Methods */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Payment Method
            </label>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-500/20 hover:border-blue-500/40'
                  }`}
                >
                  <method.icon className="w-6 h-6 text-blue-400" />
                  <div className="text-left">
                    <div className="text-white font-medium">{method.name}</div>
                    <div className="text-gray-400 text-sm">
                      ₹{method.min} - ₹{method.max.toLocaleString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Amounts */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Quick Amounts
            </label>
            <div className="grid grid-cols-5 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="py-2 px-3 bg-[#0A1929] hover:bg-blue-600/20 text-white rounded-lg transition-colors text-sm"
                >
                  ₹{quickAmount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#0A1929] text-white rounded-lg px-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
              placeholder="Enter amount"
              min="100"
              max="200000"
            />
          </div>

          <button
            onClick={handleDeposit}
            disabled={isLoading || !amount}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <ArrowUpCircle size={20} />
                Deposit ₹{amount || '0'}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}