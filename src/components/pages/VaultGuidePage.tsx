import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, ArrowUpCircle, ArrowDownCircle, Shield, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';

export function VaultGuidePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Header */}
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
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Cosmic - How to Use the Vault
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wallet className="w-12 h-12 text-blue-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Your Cosmic Vault
            </h2>
          </div>
          <p className="text-xl text-gray-300">
            Learn how to manage your funds and maximize your gaming experience
          </p>
        </motion.div>

        {/* Main Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">What is the Vault?</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            The wallet stores your funds securely. You need to recharge before playing any games. 
            Each game uses coins deducted from your wallet balance. You can also withdraw your 
            winnings anytime through our secure payment system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/20">
              <ArrowUpCircle className="w-8 h-8 text-green-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Deposit Funds</h4>
              <p className="text-gray-400 text-sm">
                Add money to your vault using UPI, Net Banking, or Digital Wallets. 
                Instant processing for most payment methods.
              </p>
            </div>

            <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20">
              <Wallet className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Play Games</h4>
              <p className="text-gray-400 text-sm">
                Use your vault balance to place bets in any of our cosmic games. 
                Winnings are automatically added back to your vault.
              </p>
            </div>

            <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/20">
              <ArrowDownCircle className="w-8 h-8 text-red-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2">Withdraw Winnings</h4>
              <p className="text-gray-400 text-sm">
                Cash out your winnings anytime. Secure transfers directly to your 
                bank account or digital wallet.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Step by Step Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Step-by-Step Guide</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Create Your Account</h4>
                <p className="text-gray-400">
                  Sign up with your email and verify your account to get started.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Add Funds to Your Vault</h4>
                <p className="text-gray-400">
                  Use the deposit feature to add money. Minimum deposit is ₹100.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Start Playing</h4>
                <p className="text-gray-400">
                  Choose any game and place your bets. Your vault balance will be used automatically.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Withdraw Your Winnings</h4>
                <p className="text-gray-400">
                  Cash out anytime with our secure withdrawal system. Minimum withdrawal is ₹1000.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-8 border border-green-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-green-400" />
            <h3 className="text-2xl font-bold text-white">Security & Safety</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Secure Storage</h4>
              <p className="text-gray-300 text-sm">
                Your funds are stored in secure, encrypted wallets with bank-level security protocols.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Instant Transactions</h4>
              <p className="text-gray-300 text-sm">
                Deposits are processed instantly, while withdrawals are completed within 24 hours.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">24/7 Monitoring</h4>
              <p className="text-gray-300 text-sm">
                Our systems monitor all transactions 24/7 to ensure your funds are always safe.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Customer Support</h4>
              <p className="text-gray-300 text-sm">
                Our support team is available 24/7 to help with any vault-related questions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}