import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  Award, 
  Copy, 
  Share2, 
  TrendingUp,
  Menu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function AffiliateProgramPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const affiliateData = {
    referralCode: 'COSMIC777USER',
    totalReferrals: 24,
    totalEarnings: 1250.00,
    pendingEarnings: 150.00,
    thisMonthEarnings: 450.00,
    commissionRate: 0.001, // 0.1%
    recentReferrals: [
      { name: 'User***', joinDate: '2024-03-15', status: 'Active', earnings: 45.50 },
      { name: 'Player***', joinDate: '2024-03-14', status: 'Active', earnings: 32.20 },
      { name: 'Gamer***', joinDate: '2024-03-13', status: 'Pending', earnings: 0 },
      { name: 'Cosmic***', joinDate: '2024-03-12', status: 'Active', earnings: 78.90 },
    ]
  };

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(affiliateData.referralCode);
      // Show success toast
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const shareReferralLink = async () => {
    const referralLink = `https://cosmic777.com/join?ref=${affiliateData.referralCode}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Cosmic777 Gaming',
          text: 'Join me on Cosmic777 for amazing gaming experiences!',
          url: referralLink,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(referralLink);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/affiliate-program"
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
                Cosmic - Affiliate Program
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-12 h-12 text-blue-400" />
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Affiliate Program
              </h2>
            </div>
            <p className="text-lg lg:text-xl text-gray-300">
              Earn lifetime commissions by referring friends to Cosmic777
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
          >
            <div className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">
                {affiliateData.totalReferrals}
              </div>
              <div className="text-gray-400 text-sm lg:text-base">Total Referrals</div>
            </div>
            <div className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-2">
                ₹{affiliateData.totalEarnings.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm lg:text-base">Total Earnings</div>
            </div>
            <div className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">
                ₹{affiliateData.thisMonthEarnings.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm lg:text-base">This Month</div>
            </div>
            <div className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-2">
                {(affiliateData.commissionRate * 100).toFixed(3)}%
              </div>
              <div className="text-gray-400 text-sm lg:text-base">Commission Rate</div>
            </div>
          </motion.div>

          {/* Referral Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#132F4C] rounded-xl p-6 lg:p-8 border border-blue-500/20 mb-8"
          >
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">Your Referral Code</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Referral Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={affiliateData.referralCode}
                    readOnly
                    className="flex-1 bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 px-4 font-mono"
                  />
                  <button
                    onClick={copyReferralCode}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 transition-colors flex items-center gap-2"
                  >
                    <Copy size={18} />
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Share Your Link
                </label>
                <button
                  onClick={shareReferralLink}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  Share Referral Link
                </button>
              </div>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#132F4C] rounded-xl border border-blue-500/20 mb-8"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-6 lg:p-8 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl lg:text-2xl font-bold text-white">How the Program Works</h3>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {isExpanded && (
              <div className="px-6 lg:px-8 pb-6 lg:pb-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                      1
                    </div>
                    <h4 className="font-bold text-white mb-2">Share Your Code</h4>
                    <p className="text-gray-300 text-sm">
                      Share your unique referral code with friends and family
                    </p>
                  </div>
                  <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                      2
                    </div>
                    <h4 className="font-bold text-white mb-2">They Join & Play</h4>
                    <p className="text-gray-300 text-sm">
                      Your referrals sign up and start playing games on our platform
                    </p>
                  </div>
                  <div className="bg-[#0A1929] rounded-xl p-6 border border-blue-500/10">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                      3
                    </div>
                    <h4 className="font-bold text-white mb-2">You Earn Commission</h4>
                    <p className="text-gray-300 text-sm">
                      Earn 0.1% lifetime commission on all their gaming activity
                    </p>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-blue-400 font-semibold mb-3">Program Benefits:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      Lifetime 0.1% commission on referred players' total bets
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      No limit on earnings potential
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-400" />
                      Monthly bonus rewards for top affiliates
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      Real-time tracking of your referrals and earnings
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>

          {/* Recent Referrals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#132F4C] rounded-xl p-6 lg:p-8 border border-blue-500/20"
          >
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">Recent Referrals</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-500/20">
                    <th className="text-left py-3 text-gray-400 font-medium">User</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Join Date</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Your Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateData.recentReferrals.map((referral, index) => (
                    <tr key={index} className="border-b border-blue-500/10">
                      <td className="py-4 text-white font-medium">{referral.name}</td>
                      <td className="py-4 text-gray-300">
                        {new Date(referral.joinDate).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          referral.status === 'Active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="py-4 text-green-400 font-bold">
                        ₹{referral.earnings.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}