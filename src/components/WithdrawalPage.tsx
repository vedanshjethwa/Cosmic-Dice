import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, HelpCircle, ArrowLeft } from 'lucide-react';
import { Footer } from './Footer';

interface WithdrawalFormData {
  walletAddress: string;
  comment: string;
  amount: string;
}

export function WithdrawalPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WithdrawalFormData>({
    walletAddress: '',
    comment: '',
    amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Withdrawal requested:', formData);
  };

  const handleMaxAmount = () => {
    setFormData((prev) => ({ ...prev, amount: '5000.00' })); // Example max amount
  };

  return (
    <div className="min-h-screen text-white">
      {/* Single Header */}
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
              style={{
                 fontFamily: "'Orbitron', sans-serif"
                }}
            >
              Cosmic - Withdraw Funds
            </h1>
          </div>
        </div>
      </div>
      
      <div className="p-4 lg:p-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-[#132F4C] rounded-2xl p-4 lg:p-6 shadow-xl border border-blue-500/20 mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Wallet Address */}
              <div>
                <label className="block text-white mb-2 flex items-center gap-2">
                  <Wallet size={20} />
                  Wallet Address
                </label>
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  placeholder="Enter your wallet address"
                  className="w-full bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-white mb-2">
                  Comment (optional)
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Add a note to this transaction"
                  className="w-full bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 h-24 resize-none"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-white mb-2">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-3 px-4 pr-20 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    required
                    min="1000"
                    step="0.01"
                  />
                  <button
                    type="button"
                    onClick={handleMaxAmount}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Withdraw Funds
              </button>

              {/* Info Section */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Minimum withdrawal</span>
                  <span className="text-white">₹1000.00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Network fee</span>
                  <span className="text-white">₹50.50</span>
                </div>
              </div>
            </form>
          </div>

          {/* Help Button */}
          <button 
            className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
            onClick={() => {/* Open chat support */}}
          >
            <HelpCircle size={24} />
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}