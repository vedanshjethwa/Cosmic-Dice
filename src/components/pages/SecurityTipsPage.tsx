import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Smartphone, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';

export function SecurityTipsPage() {
  const navigate = useNavigate();

  const securityTips = [
    {
      icon: <Lock className="w-8 h-8 text-green-400" />,
      title: 'Always Look for HTTPS (🔒)',
      description: 'Ensure the website URL starts with "https://" and shows a lock icon',
      details: [
        'Check for the padlock icon in your browser address bar',
        'Verify the URL is exactly correct (no typos or suspicious characters)',
        'Never enter personal information on non-HTTPS sites',
        'HTTPS encrypts data between your browser and our servers'
      ]
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-400" />,
      title: 'Never Share Passwords',
      description: 'Keep your login credentials completely private and secure',
      details: [
        'Never share your password with anyone, including support staff',
        'Use a unique password that you don\'t use elsewhere',
        'Create strong passwords with letters, numbers, and symbols',
        'Change your password immediately if you suspect it\'s compromised'
      ]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-400" />,
      title: 'Use 2FA if Available',
      description: 'Enable two-factor authentication for extra security',
      details: [
        'Use authenticator apps like Google Authenticator or Authy',
        'SMS-based 2FA is better than no 2FA, but apps are more secure',
        'Keep backup codes in a safe place',
        'Enable 2FA on your email account as well'
      ]
    }
  ];

  const additionalTips = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
      title: 'Keep Software Updated',
      description: 'Regularly update your browser, operating system, and security software'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
      title: 'Use Secure Networks',
      description: 'Avoid public Wi-Fi for gaming. Use your mobile data or secure home network'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-400" />,
      title: 'Monitor Your Account',
      description: 'Regularly check your transaction history and report any suspicious activity'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-yellow-400" />,
      title: 'Log Out Properly',
      description: 'Always log out when finished, especially on shared or public computers'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-red-400" />,
      title: 'Beware of Phishing',
      description: 'Never click suspicious links or download files from unknown sources'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-cyan-400" />,
      title: 'Verify Communications',
      description: 'Always verify emails or messages claiming to be from us through official channels'
    }
  ];

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
              Cosmic - Security Tips
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
            <Shield className="w-12 h-12 text-green-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Stay Safe & Secure
            </h2>
          </div>
          <p className="text-xl text-gray-300">
            Essential security practices to protect your account and personal information
          </p>
        </motion.div>

        {/* Main Security Tips */}
        <div className="space-y-8 mb-12">
          {securityTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20"
            >
              <div className="flex items-center gap-4 mb-6">
                {tip.icon}
                <h3 className="text-2xl font-bold text-white">{tip.title}</h3>
              </div>
              <p className="text-gray-300 text-lg mb-6">{tip.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tip.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-400 text-sm">{detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Security Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Additional Security Measures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalTips.map((tip, index) => (
              <div key={index} className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  {tip.icon}
                  <h4 className="font-bold text-white">{tip.title}</h4>
                </div>
                <p className="text-gray-400 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-8 border border-red-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <h3 className="text-2xl font-bold text-white">If Your Account is Compromised</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Immediate Actions:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Change your password immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Contact our support team</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Check your transaction history</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Enable 2FA if not already active</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Contact Information:</h4>
              <div className="bg-[#0A1929] rounded-lg p-4 border border-red-500/20">
                <p className="text-red-400 font-semibold mb-2">Emergency Support:</p>
                <p className="text-gray-300 text-sm mb-2">Email: security@cosmic777.com</p>
                <p className="text-gray-300 text-sm mb-2">Phone: 1800-XXX-XXXX</p>
                <p className="text-gray-300 text-sm">Available 24/7 for security issues</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}