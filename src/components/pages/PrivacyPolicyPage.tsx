import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function PrivacyPolicyPage() {
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
        currentPath="/privacy-policy"
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
                Cosmic - Privacy Policy
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
              <Shield className="w-12 h-12 text-green-400" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Privacy Policy
              </h2>
            </div>
            <p className="text-xl text-gray-300">
              Your privacy and data security are our top priorities
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Last updated: January 2024
            </p>
          </motion.div>

          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Information We Collect</h3>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-blue-400 mb-3">Personal Information</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Name, email address, and contact information</li>
                  <li>• Date of birth and identity verification documents</li>
                  <li>• Payment information and transaction history</li>
                  <li>• Account preferences and settings</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-400 mb-3">Gaming Information</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Game play history and statistics</li>
                  <li>• Betting patterns and preferences</li>
                  <li>• Session duration and frequency</li>
                  <li>• Device and browser information</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* How We Use Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">How We Use Your Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Service Provision</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Process your gaming transactions</li>
                  <li>• Maintain your account and preferences</li>
                  <li>• Provide customer support</li>
                  <li>• Ensure fair play and security</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Legal Compliance</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Comply with regulatory requirements</li>
                  <li>• Prevent fraud and money laundering</li>
                  <li>• Verify identity and age</li>
                  <li>• Maintain transaction records</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Data Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold text-white">Data Protection & Security</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/20">
                  <h5 className="text-green-400 font-semibold mb-2">Technical Safeguards</h5>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• 256-bit SSL encryption</li>
                    <li>• Secure data centers</li>
                    <li>• Regular security audits</li>
                    <li>• Access controls and monitoring</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                  <h5 className="text-blue-400 font-semibold mb-2">Operational Safeguards</h5>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Employee training programs</li>
                    <li>• Limited data access policies</li>
                    <li>• Incident response procedures</li>
                    <li>• Regular backup and recovery</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Your Rights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Access & Control</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Request access to your data</li>
                    <li>• Update or correct information</li>
                    <li>• Delete your account and data</li>
                    <li>• Export your data</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Communication Preferences</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Opt-out of marketing emails</li>
                    <li>• Control notification settings</li>
                    <li>• Manage communication preferences</li>
                    <li>• Request data portability</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-purple-400 text-sm">
                To exercise any of these rights, please contact our support team at privacy@cosmic777.com
              </p>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}