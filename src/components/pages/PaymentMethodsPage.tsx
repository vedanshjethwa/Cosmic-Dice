import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building, Shield, CheckCircle, Clock, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function PaymentMethodsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const paymentMethods = [
    {
      name: 'UPI (Unified Payments Interface)',
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      description: 'Instant payments via UPI apps like PhonePe, GPay, Paytm',
      features: ['Instant deposits', 'No additional fees', '24/7 availability', 'Secure transactions'],
      processingTime: 'Instant',
      minAmount: '₹100',
      maxAmount: '₹1,00,000',
      isRecommended: true
    },
    {
      name: 'Net Banking',
      icon: <Building className="w-8 h-8 text-blue-400" />,
      description: 'Direct bank transfer from your account',
      features: ['Direct bank connection', 'High security', 'Large transaction limits', 'Widely accepted'],
      processingTime: '2-5 minutes',
      minAmount: '₹500',
      maxAmount: '₹2,00,000',
      isRecommended: false
    },
    {
      name: 'Digital Wallets',
      icon: <CreditCard className="w-8 h-8 text-purple-400" />,
      description: 'Paytm, PhonePe, Amazon Pay, and other digital wallets',
      features: ['Quick setup', 'Mobile-friendly', 'Instant transfers', 'Cashback offers'],
      processingTime: 'Instant',
      minAmount: '₹100',
      maxAmount: '₹50,000',
      isRecommended: false
    }
  ];

  const securityFeatures = [
    'SSL 256-bit encryption for all transactions',
    'PCI DSS compliant payment processing',
    'Two-factor authentication support',
    'Real-time fraud detection',
    'Secure tokenization of payment data',
    'Regular security audits and monitoring'
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
        currentPath="/payment-methods"
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
                Cosmic - Payment Methods
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
              <CreditCard className="w-12 h-12 text-blue-400" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Payment Methods
              </h2>
            </div>
            <p className="text-xl text-gray-300">
              Secure, fast, and convenient payment options for your gaming experience
            </p>
          </motion.div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-[#132F4C] rounded-2xl p-8 border ${
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
                
                <div className="flex items-center gap-4 mb-6">
                  {method.icon}
                  <h3 className="text-2xl font-bold text-white">{method.name}</h3>
                </div>
                
                <p className="text-gray-400 mb-6">{method.description}</p>
                
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Processing Time:</span>
                      <div className="text-white font-medium">{method.processingTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Min Amount:</span>
                      <div className="text-white font-medium">{method.minAmount}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Max Amount:</span>
                      <div className="text-white font-medium">{method.maxAmount}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Features:</h4>
                  {method.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-8 border border-green-500/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold text-white">Security & Safety</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Processing Times */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Processing Times</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10">
                <h4 className="font-bold text-green-400 mb-2">Deposits</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• UPI: Instant</li>
                  <li>• Net Banking: 2-5 minutes</li>
                  <li>• Digital Wallets: Instant</li>
                </ul>
              </div>
              <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10">
                <h4 className="font-bold text-yellow-400 mb-2">Withdrawals</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• UPI: 2-24 hours</li>
                  <li>• Bank Transfer: 24-48 hours</li>
                  <li>• Digital Wallets: 2-12 hours</li>
                </ul>
              </div>
              <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10">
                <h4 className="font-bold text-blue-400 mb-2">Verification</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Account: Instant</li>
                  <li>• KYC: 24-48 hours</li>
                  <li>• Large withdrawals: 2-5 days</li>
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