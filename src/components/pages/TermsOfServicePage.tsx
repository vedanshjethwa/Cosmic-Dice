import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, Users, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function TermsOfServicePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/terms"
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
                Cosmic - Terms of Service
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
              <Scale className="w-12 h-12 text-blue-400" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Terms of Service
              </h2>
            </div>
            <p className="text-xl text-gray-300">
              Please read these terms carefully before using our services
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Last updated: January 2024
            </p>
          </motion.div>

          {/* Acceptance of Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Acceptance of Terms</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              By accessing and using Cosmic777.com, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
              <p className="text-blue-400 text-sm">
                These terms constitute a legally binding agreement between you and Cosmic777.com
              </p>
            </div>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold text-white">Eligibility Requirements</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Age Requirement</h4>
                  <p className="text-gray-300 text-sm">You must be at least 18 years old to use our services</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Legal Jurisdiction</h4>
                  <p className="text-gray-300 text-sm">You must be legally eligible to participate in online gaming in your jurisdiction</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Account Responsibility</h4>
                  <p className="text-gray-300 text-sm">You are responsible for maintaining the confidentiality of your account</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Account Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Account Terms</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-blue-400 mb-3">Account Creation</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• One account per person is allowed</li>
                  <li>• All information provided must be accurate and truthful</li>
                  <li>• You must verify your identity when requested</li>
                  <li>• Duplicate accounts will be closed</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-400 mb-3">Account Security</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Keep your login credentials secure and confidential</li>
                  <li>• Notify us immediately of any unauthorized access</li>
                  <li>• You are responsible for all activities under your account</li>
                  <li>• Use strong passwords and enable two-factor authentication</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Gaming Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Gaming Rules & Fair Play</h3>
            <div className="space-y-4">
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/20">
                <h4 className="text-green-400 font-semibold mb-2">Allowed Activities</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Playing games fairly and honestly</li>
                  <li>• Using legitimate payment methods</li>
                  <li>• Following game rules and guidelines</li>
                  <li>• Reporting bugs or issues to support</li>
                </ul>
              </div>
              <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/20">
                <h4 className="text-red-400 font-semibold mb-2">Prohibited Activities</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Using bots, scripts, or automated tools</li>
                  <li>• Colluding with other players</li>
                  <li>• Exploiting bugs or glitches</li>
                  <li>• Money laundering or fraudulent activities</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Payments & Withdrawals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Payments & Withdrawals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Deposits</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• All deposits are final and non-refundable</li>
                  <li>• Minimum deposit amount is ₹100</li>
                  <li>• Funds must come from legitimate sources</li>
                  <li>• We may request verification for large deposits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Withdrawals</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Minimum withdrawal amount is ₹1000</li>
                  <li>• Identity verification may be required</li>
                  <li>• Processing time: 24-48 hours</li>
                  <li>• Withdrawals to original payment method only</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Limitation of Liability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-8 border border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold text-white">Important Disclaimers</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Gaming Risks</h4>
                <p className="text-gray-300 text-sm">
                  Gaming involves risk and may result in financial loss. Only play with money you can afford to lose.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Service Availability</h4>
                <p className="text-gray-300 text-sm">
                  We strive for 99.9% uptime but cannot guarantee uninterrupted service availability.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Contact Information</h4>
                <p className="text-gray-300 text-sm">
                  For questions about these terms, contact us at legal@cosmic777.com
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