import React, { useState } from 'react';
import { Users, ChevronDown, ChevronUp, DollarSign, Award } from 'lucide-react';

export function AffiliateSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Affiliate Program</h2>
      </div>

      {/* About Our Program */}
      <div className="bg-[#1A243D] rounded-xl border border-blue-500/20 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">About Our Program</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-2">
              <h4 className="text-white font-medium">How to Earn</h4>
              <p className="text-gray-400">
                Share your unique referral code with friends and earn lifetime
                commissions on their gameplay!
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium">Requirements</h4>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  Referred player must deposit minimum $5
                </li>
                <li>
                  Earn 0.001% lifetime commission on referred players' total bets
                </li>
              </ul>
            </div>

            <div className="mt-6 bg-blue-900/30 rounded-lg p-4 border border-blue-500/20">
              <h4 className="text-white font-medium mb-2">Pro Tip</h4>
              <p className="text-gray-400">
                The more active players you refer, the higher your potential
                earnings. There's no limit to how much you can earn!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#1A243D] rounded-xl p-6 border border-blue-500/20">
          <h3 className="text-gray-400 mb-2">Total Referrals</h3>
          <p className="text-2xl font-bold text-white">24</p>
        </div>
        <div className="bg-[#1A243D] rounded-xl p-6 border border-blue-500/20">
          <h3 className="text-gray-400 mb-2">Total Earnings</h3>
          <p className="text-2xl font-bold text-green-400">$1,250.00</p>
        </div>
      </div>
    </div>
  );
}