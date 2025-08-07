import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowDownCircle, Building, CreditCard } from 'lucide-react';
import { api } from '../../lib/api';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  availableBalance: number;
}

export function WithdrawModal({ isOpen, onClose, onSuccess, availableBalance }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    upiId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) < 1000) {
      setError('Minimum withdrawal amount is ₹1000');
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      setError('Insufficient balance');
      return;
    }

    if (paymentMethod === 'bank_transfer') {
      if (!paymentDetails.accountNumber || !paymentDetails.ifscCode || !paymentDetails.accountHolderName) {
        setError('Please fill all bank details');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentDetails.upiId) {
        setError('Please enter UPI ID');
        return;
      }
    }

    setIsLoading(true);
    setError('');

    try {
      await api.createWithdrawalRequest(parseFloat(amount), paymentMethod, paymentDetails);
      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Withdrawal request failed');
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
          <h2 className="text-xl font-bold text-white">Withdraw Funds</h2>
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

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              Available Balance: ₹{availableBalance.toLocaleString()}
            </p>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Withdrawal Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#0A1929] text-white rounded-lg px-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
              placeholder="Enter amount (min ₹1000)"
              min="1000"
              max={availableBalance}
            />
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Withdrawal Method
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-blue-500/20 hover:border-blue-500/40'
                }`}
              >
                <Building className="w-6 h-6 text-blue-400" />
                <div className="text-left">
                  <div className="text-white font-medium">Bank Transfer</div>
                  <div className="text-gray-400 text-sm">Direct to your bank account</div>
                </div>
              </button>
              
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                  paymentMethod === 'upi'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-blue-500/20 hover:border-blue-500/40'
                }`}
              >
                <Smartphone className="w-6 h-6 text-blue-400" />
                <div className="text-left">
                  <div className="text-white font-medium">UPI</div>
                  <div className="text-gray-400 text-sm">Instant UPI transfer</div>
                </div>
              </button>
            </div>
          </div>

          {/* Payment Details */}
          {paymentMethod === 'bank_transfer' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Account Holder Name"
                value={paymentDetails.accountHolderName}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                className="w-full bg-[#0A1929] text-white rounded-lg px-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                placeholder="Account Number"
                value={paymentDetails.accountNumber}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                className="w-full bg-[#0A1929] text-white rounded-lg px-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                placeholder="IFSC Code"
                value={paymentDetails.ifscCode}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, ifscCode: e.target.value }))}
                className="w-full bg-[#0A1929] text-white rounded-lg px-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
              />
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div>
              <input
                type="text"
                placeholder="UPI ID (e.g., user@paytm)"
                value={paymentDetails.upiId}
                onChange={(e) => setPaymentDetails(prev => ({ ...prev, upiId: e.target.value }))}
                className="w-full bg-[#0A1929] text-white rounded-lg px-4 py-3 border border-blue-500/20 focus:outline-none focus:border-blue-400"
              />
            </div>
          )}

          <button
            onClick={handleWithdraw}
            disabled={isLoading || !amount}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <ArrowDownCircle size={20} />
                Withdraw ₹{amount || '0'}
              </>
            )}
          </button>

          <div className="text-xs text-gray-400 text-center">
            Withdrawals are processed within 24-48 hours
          </div>
        </div>
      </motion.div>
    </div>
  );
}