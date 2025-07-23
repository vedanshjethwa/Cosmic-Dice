import React, { useState } from 'react';
import { X, Gift } from 'lucide-react';

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RedeemModal({ isOpen, onClose }: RedeemModalProps) {
  const [code, setCode] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A1929] rounded-2xl w-full max-w-md relative overflow-hidden border border-blue-500/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Redeem Code</h2>
          </div>

          <p className="text-gray-400 mb-6">
            Unlock epic benefits and take your gaming experience to the next level today!
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-2">
                Enter a Promotional Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-black/50 text-white border border-blue-500/30 rounded-lg py-2.5 px-4 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Enter your code here"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg py-3 px-4 font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0A1929]">
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}