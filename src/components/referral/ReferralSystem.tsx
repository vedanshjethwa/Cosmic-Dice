import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Share2, DollarSign, TrendingUp, Gift } from 'lucide-react';
import { api } from '../../lib/api';

interface ReferralStats {
  referralCode: string;
  directReferrals: number;
  indirectReferrals: number;
  totalEarnings: number;
  referralTree: {
    level1: any[];
    level2: any[];
  };
}

export function ReferralSystem() {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [earnings, setEarnings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const [statsResponse, earningsResponse] = await Promise.all([
        api.getReferralStats(),
        api.getReferralEarnings()
      ]);
      
      setStats(statsResponse);
      setEarnings(earningsResponse.earnings);
    } catch (error) {
      console.error('Failed to fetch referral data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralCode = async () => {
    if (!stats?.referralCode) return;
    
    try {
      await navigator.clipboard.writeText(stats.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareReferralLink = async () => {
    if (!stats?.referralCode) return;
    
    const referralLink = `${window.location.origin}/register?ref=${stats.referralCode}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Cosmic777 Gaming',
          text: 'Join me on Cosmic777 for amazing gaming experiences!',
          url: referralLink,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(referralLink);
        alert('Referral link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center p-8">
        <p className="text-red-400">Failed to load referral data</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Referral Program
        </h1>
        <p className="text-gray-400">Earn lifetime commissions by referring friends</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 text-center"
        >
          <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{stats.directReferrals}</div>
          <div className="text-gray-400 text-sm">Direct Referrals</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 text-center"
        >
          <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">{stats.indirectReferrals}</div>
          <div className="text-gray-400 text-sm">Indirect Referrals</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 text-center"
        >
          <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">₹{stats.totalEarnings.toFixed(2)}</div>
          <div className="text-gray-400 text-sm">Total Earnings</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 text-center"
        >
          <Gift className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">0.1%</div>
          <div className="text-gray-400 text-sm">Commission Rate</div>
        </motion.div>
      </div>

      {/* Referral Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
      >
        <h2 className="text-xl font-bold text-white mb-6">Your Referral Code</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Referral Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={stats.referralCode}
                readOnly
                className="flex-1 bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 px-4 font-mono"
              />
              <button
                onClick={copyReferralCode}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 transition-colors flex items-center gap-2"
              >
                <Copy size={18} />
                {copied ? 'Copied!' : 'Copy'}
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
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20"
      >
        <h2 className="text-xl font-bold text-white mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
              1
            </div>
            <h3 className="font-bold text-white mb-2">Share Your Code</h3>
            <p className="text-gray-400 text-sm">
              Share your unique referral code with friends and family
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
              2
            </div>
            <h3 className="font-bold text-white mb-2">They Join & Play</h3>
            <p className="text-gray-400 text-sm">
              Your referrals sign up and start playing games on our platform
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
              3
            </div>
            <h3 className="font-bold text-white mb-2">You Earn Commission</h3>
            <p className="text-gray-400 text-sm">
              Earn 0.1% lifetime commission on all their gaming activity
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Earnings */}
      {earnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <h2 className="text-xl font-bold text-white mb-6">Recent Earnings</h2>
          <div className="space-y-3">
            {earnings.slice(0, 10).map((earning, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#0A1929] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Referral Commission</div>
                    <div className="text-gray-400 text-sm">
                      {new Date(earning.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-green-400 font-bold">
                  +₹{parseFloat(earning.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}