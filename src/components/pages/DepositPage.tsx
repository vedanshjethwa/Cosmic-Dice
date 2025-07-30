import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Wallet, 
  CreditCard, 
  Smartphone, 
  DollarSign, 
  Clock, 
  Shield, 
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  fees: string;
  isRecommended?: boolean;
}

export function DepositPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('upi');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Instant deposits via UPI (PhonePe, GPay, Paytm)',
      minAmount: 100,
      maxAmount: 100000,
      processingTime: 'Instant',
      fees: 'Free',
      isRecommended: true,
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Direct bank transfer from your account',
      minAmount: 500,
      maxAmount: 200000,
      processingTime: '2-5 minutes',
      fees: 'Free',
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: <Wallet className="w-6 h-6" />,
      description: 'Paytm, PhonePe, Amazon Pay',
      minAmount: 100,
      maxAmount: 50000,
      processingTime: 'Instant',
      fees: 'Free',
    },
  ];

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

  const handleDeposit = async () => {
    const depositAmount = parseFloat(amount);
    if (!depositAmount || !selectedPaymentMethod) return;

    if (depositAmount < selectedPaymentMethod.minAmount || depositAmount > selectedPaymentMethod.maxAmount) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Handle successful deposit
      console.log('Deposit successful');
    }, 3000);
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <h1
            className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
            style={{
               fontFamily: "'Orbitron', sans-serif"
              }}
          >
            Cosmic
          </h1>
        </div>
      </div>
      
      {/* Page Header with Back Button */}
      <div className="bg-[#0A1929] border-b border-blue-500/10">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <h2 className="text-xl font-bold text-white">Deposit Funds</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20 mb-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Choose Payment Method</h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-blue-500/20 hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          selectedMethod === method.id ? 'bg-blue-500/20' : 'bg-gray-700/50'
                        }`}>
                          {method.icon}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{method.name}</h3>
                            {method.isRecommended && (
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{method.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>₹{method.minAmount} - ₹{method.maxAmount.toLocaleString()}</span>
                            <span>•</span>
                            <span>{method.processingTime}</span>
                            <span>•</span>
                            <span>{method.fees}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-400'
                      }`}>
                        {selectedMethod === method.id && (
                          <CheckCircle className="w-full h-full text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Amount Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
            >
              <h2 className="text-xl font-bold text-white mb-6">Enter Amount</h2>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-5 gap-2 mb-6">
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

              {/* Amount Input */}
              <div className="relative mb-4">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  min={selectedPaymentMethod?.minAmount}
                  max={selectedPaymentMethod?.maxAmount}
                />
              </div>

              {selectedPaymentMethod && (
                <div className="text-sm text-gray-400 mb-6">
                  Minimum: ₹{selectedPaymentMethod.minAmount} • Maximum: ₹{selectedPaymentMethod.maxAmount.toLocaleString()}
                </div>
              )}

              <button
                onClick={handleDeposit}
                disabled={isProcessing || !amount || parseFloat(amount) < (selectedPaymentMethod?.minAmount || 0)}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet size={20} />
                    Deposit ₹{amount || '0'}
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Processing Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">Processing Times</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">UPI</span>
                  <span className="text-green-400">Instant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Net Banking</span>
                  <span className="text-yellow-400">2-5 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Digital Wallet</span>
                  <span className="text-green-400">Instant</span>
                </div>
              </div>
            </motion.div>

            {/* Security Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">Security & Safety</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Secure payment gateway</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>No card details stored</span>
                </div>
              </div>
            </motion.div>

            {/* Limits Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">Deposit Limits</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Limit</span>
                  <span className="text-white">₹2,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Limit</span>
                  <span className="text-white">₹50,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Minimum Deposit</span>
                  <span className="text-white">₹100</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-400 text-xs">
                    Deposits are subject to verification for amounts above ₹50,000
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}