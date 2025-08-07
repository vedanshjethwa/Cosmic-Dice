import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Headphones, MessageCircle, Phone, Mail, Clock, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';
import { useChatStore } from '../ChatSupport/ChatStore';

export function SupportPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setIsOpen: setChatOpen } = useChatStore();

  const supportOptions = [
    {
      title: 'Live Chat Support',
      description: 'Get instant help from our support team',
      icon: <MessageCircle className="w-8 h-8 text-green-400" />,
      action: () => setChatOpen(true),
      available: '24/7',
      responseTime: 'Instant'
    },
    {
      title: 'Email Support',
      description: 'Send us detailed questions via email',
      icon: <Mail className="w-8 h-8 text-blue-400" />,
      action: () => window.location.href = 'mailto:support@cosmic777.com',
      available: '24/7',
      responseTime: '2-4 hours'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      icon: <Phone className="w-8 h-8 text-purple-400" />,
      action: () => window.location.href = 'tel:+1800-XXX-XXXX',
      available: '9 AM - 9 PM',
      responseTime: 'Immediate'
    }
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
        currentPath="/support"
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
                Cosmic - Live Support
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
              <Headphones className="w-12 h-12 text-blue-400" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Get Support
              </h2>
            </div>
            <p className="text-xl text-gray-300">
              Our support team is here to help you 24/7
            </p>
          </motion.div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all cursor-pointer group"
                onClick={option.action}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 group-hover:scale-110 transition-transform">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-gray-400 mb-4">{option.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock size={16} />
                      <span>Available: {option.available}</span>
                    </div>
                    <div className="text-green-400 font-medium">
                      Response: {option.responseTime}
                    </div>
                  </div>
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Contact Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="bg-[#0A1929] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">How do I deposit funds?</h4>
                <p className="text-gray-400 text-sm">
                  You can deposit funds using UPI, Net Banking, or Digital Wallets. Go to the Deposit section and choose your preferred method.
                </p>
              </div>
              <div className="bg-[#0A1929] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">How long do withdrawals take?</h4>
                <p className="text-gray-400 text-sm">
                  Withdrawals are typically processed within 24-48 hours. UPI withdrawals are usually faster.
                </p>
              </div>
              <div className="bg-[#0A1929] rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Are the games fair?</h4>
                <p className="text-gray-400 text-sm">
                  Yes, all our games use provably fair algorithms and are regularly audited for fairness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}