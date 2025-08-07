import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, Clock, CheckCircle, Lock } from 'lucide-react';
import { api } from '../../lib/api';

interface Bonus {
  id: string;
  name: string;
  type: string;
  amount?: number;
  percentage?: number;
  max_amount?: number;
  wagering_requirement: number;
  valid_until?: string;
  conditions: any;
}

export function BonusSystem() {
  const [availableBonuses, setAvailableBonuses] = useState<Bonus[]>([]);
  const [userBonuses, setUserBonuses] = useState<any[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [claimingBonus, setClaimingBonus] = useState<string | null>(null);

  useEffect(() => {
    fetchBonuses();
  }, []);

  const fetchBonuses = async () => {
    try {
      const [availableResponse, userResponse] = await Promise.all([
        api.getAvailableBonuses(),
        api.getUserBonuses()
      ]);
      
      setAvailableBonuses(availableResponse.bonuses);
      setUserBonuses(userResponse.bonuses);
    } catch (error) {
      console.error('Failed to fetch bonuses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const claimBonus = async (bonusId: string) => {
    setClaimingBonus(bonusId);
    try {
      await api.claimBonus(bonusId);
      await fetchBonuses(); // Refresh bonuses
    } catch (error) {
      console.error('Failed to claim bonus:', error);
      alert('Failed to claim bonus');
    } finally {
      setClaimingBonus(null);
    }
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;

    try {
      await api.applyPromoCode(promoCode);
      setPromoCode('');
      await fetchBonuses(); // Refresh bonuses
      alert('Promo code applied successfully!');
    } catch (error) {
      console.error('Failed to apply promo code:', error);
      alert('Invalid or expired promo code');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Bonuses & Rewards
        </h1>
        <p className="text-gray-400">Claim exclusive bonuses and boost your gaming experience</p>
      </div>

      {/* Promo Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
      >
        <h2 className="text-xl font-bold text-white mb-4">Enter Promo Code</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            className="flex-1 bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={applyPromoCode}
            disabled={!promoCode.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Apply
          </button>
        </div>
      </motion.div>

      {/* Available Bonuses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Available Bonuses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableBonuses.map((bonus) => (
            <div
              key={bonus.id}
              className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-6 h-6 text-blue-400" />
                <h3 className="font-bold text-white">{bonus.name}</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-blue-400 capitalize">{bonus.type.replace('_', ' ')}</span>
                </div>
                
                {bonus.amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="text-green-400 font-bold">₹{bonus.amount}</span>
                  </div>
                )}
                
                {bonus.percentage && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Percentage</span>
                    <span className="text-green-400 font-bold">{bonus.percentage}%</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Wagering</span>
                  <span className="text-yellow-400">{bonus.wagering_requirement}x</span>
                </div>
                
                {bonus.valid_until && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expires</span>
                    <span className="text-red-400 text-sm">
                      {new Date(bonus.valid_until).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => claimBonus(bonus.id)}
                disabled={claimingBonus === bonus.id}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-all"
              >
                {claimingBonus === bonus.id ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto" />
                ) : (
                  'Claim Bonus'
                )}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Active Bonuses */}
      {userBonuses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Active Bonuses</h2>
          <div className="space-y-4">
            {userBonuses.map((userBonus) => (
              <div
                key={userBonus.id}
                className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">{userBonus.bonuses.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    userBonus.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    userBonus.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {userBonus.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-gray-400 text-sm">Bonus Amount</div>
                    <div className="text-green-400 font-bold">₹{userBonus.amount}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Wagering Progress</div>
                    <div className="text-blue-400 font-bold">
                      ₹{userBonus.wagered_amount} / ₹{userBonus.wagering_requirement}
                    </div>
                  </div>
                </div>

                {/* Wagering Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, (userBonus.wagered_amount / userBonus.wagering_requirement) * 100)}%` 
                    }}
                  />
                </div>
                
                {userBonus.expires_at && (
                  <div className="mt-4 text-sm text-gray-400">
                    Expires: {new Date(userBonus.expires_at).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}