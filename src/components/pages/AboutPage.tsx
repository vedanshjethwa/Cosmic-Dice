import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AboutPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Main Header */}
      <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
          <h1
            className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
            style={{
               fontFamily: "'Orbitron', sans-serif"
              }}
          >
            Cosmic
          </h1>
        </div>
      </div>
      
      {/* Page Header with Back Button */}
      <div className="bg-[#0A1929] border-b border-blue-500/10">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h2 className="text-xl font-bold text-white">About Us</h2>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
          <p className="text-gray-300 text-lg mb-4">
            Welcome to Cosmic Gaming, your ultimate destination for thrilling online games!
          </p>
          <p className="text-gray-400 mb-6">
            We are committed to providing a fair, secure, and enjoyable gaming experience for all our players.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0A1929] rounded-lg p-6 border border-blue-500/10">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Our Mission</h3>
              <p className="text-gray-400">
                To create an immersive and fair gaming environment where players can enjoy exciting games while maintaining responsible gaming practices.
              </p>
            </div>
            <div className="bg-[#0A1929] rounded-lg p-6 border border-blue-500/10">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Security First</h3>
              <p className="text-gray-400">
                We use advanced encryption and security measures to protect your data and ensure fair gameplay for all users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}