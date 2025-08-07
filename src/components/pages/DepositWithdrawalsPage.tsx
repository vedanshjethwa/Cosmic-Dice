import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  CreditCard, 
  Smartphone, 
  Building, 
  Shield, 
  CheckCircle, 
  Clock, 
  Info,
  AlertCircle,
  Menu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function DepositWithdrawalsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const depositMethods = [
    {
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
      name: 'Net Banking',
      icon: <Building className="w-6 h-6" />,
      description: 'Direct bank transfer from your account',
      minAmount: 500,
      maxAmount: 200000,
      processingTime: '2-5 minutes',
      fees: 'Free',
    },
    {
      name: 'Digital Wallet',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Paytm, PhonePe, Amazon Pay',
      minAmount: 100,
      maxAmount: 50000,
      processingTime: 'Instant',
      fees: 'Free',
    },
  ];

  const withdrawalMethods = [
    {
      name: 'Bank Transfer',
      icon: <Building className="w-6 h-6" />,
      description: 'Direct transfer to your bank account',
      minAmount: 1000,
      maxAmount: 200000,
      processingTime: '24-48 hours',
      fees: 'Free',
    },
    {
      name: 'UPI',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Instant UPI withdrawal',
      minAmount: 1000,
      maxAmount: 100000,
      processingTime: '2-24 hours',
      fees: 'Free',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/deposit-withdrawals"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
              >
                <Menu size={24} />
              </button>
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <h1
                className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Cosmic - Deposit & Withdrawals
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wallet className="w-12 h-12 text-blue-400" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Deposit & Withdrawal Guide
              </h2>
            </div>
            <p className="text-xl text-gray-300">
              Fast, secure, and convenient payment options for your gaming experience
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <button
              onClick={() => navigate('/deposit')}
              className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-8 hover:from-green-600/30 hover:to-green-800/30 transition-all group text-left"
            >
              <ArrowUpCircle className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-2">Deposit Funds</h3>
              <p className="text-gray-400">Add money to your wallet instantly using UPI, Net Banking, or Digital Wallets</p>
              <div className="mt-4 text-green-400 font-medium">Start Depositing →</div>
            </button>

            <button
              onClick={() => navigate('/withdrawal')}
              className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-2xl p-8 hover:from-red-600/30 hover:to-red-800/30 transition-all group text-left"
            >
              <ArrowDownCircle className="w-12 h-12 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-2">Withdraw Winnings</h3>
              <p className="text-gray-400">Cash out your winnings securely to your bank account or UPI</p>
              <div className="mt-4 text-red-400 font-medium">Start Withdrawal →</div>
            </button>
          </motion.div>

          {/* Deposit Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Deposit Methods</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {depositMethods.map((method, index) => (
                <div
                  key={index}
                  className={`bg-[#132F4C] rounded-2xl p-6 border ${
                    method.isRecommended ? 'border-green-500/30 bg-green-500/5' : 'border-blue-500/20'
                  } relative`}
                >
                  {method.isRecommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        RECOMMENDED
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      {method.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white">{method.name}</h4>
                  </div>
                  
                  <p className="text-gray-400 mb-6">{method.description}</p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Min Amount:</span>
                      <span className="text-white">₹{method.minAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Amount:</span>
                      <span className="text-white">₹{method.maxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processing:</span>
                      <span className="text-green-400">{method.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fees:</span>
                      <span className="text-blue-400">{method.fees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Withdrawal Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Withdrawal Methods</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {withdrawalMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-[#132F4C] rounded-2xl p-6 border border-blue-500/20"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-red-500/20 rounded-lg">
                      {method.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white">{method.name}</h4>
                  </div>
                  
                  <p className="text-gray-400 mb-6">{method.description}</p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Min Amount:</span>
                      <span className="text-white">₹{method.minAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Amount:</span>
                      <span className="text-white">₹{method.maxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processing:</span>
                      <span className="text-yellow-400">{method.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fees:</span>
                      <span className="text-blue-400">{method.fees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Important Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Deposit Guidelines</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>All deposits are processed instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>No fees on deposits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Secure SSL encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>24/7 customer support</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Withdrawal Guidelines</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Minimum withdrawal: ₹1000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Processing time: 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Identity verification may be required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Withdrawals to original payment method only</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}