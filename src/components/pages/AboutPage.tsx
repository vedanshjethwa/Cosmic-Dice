import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Shield, Zap, Users, Headphones, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function AboutPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(2310);
  const [registeredUsers, setRegisteredUsers] = useState(511);
  const [totalPaid, setTotalPaid] = useState(2.1);
  const [newUsersJoined, setNewUsersJoined] = useState(19);

  // Real-time counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Update online users every 10 seconds
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 5) + 1);
      
      // Update new users joined counter
      setNewUsersJoined(Math.floor(Math.random() * 25) + 15);
      
      // Occasionally update registered users
      if (Math.random() > 0.7) {
        setRegisteredUsers(prev => prev + 1);
      }
      
      // Slowly increase total paid
      if (Math.random() > 0.8) {
        setTotalPaid(prev => prev + 0.1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/about"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
      {/* Single Header */}
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
              style={{
                 fontFamily: "'Orbitron', sans-serif"
                }}
            >
              Cosmic - About Us
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the future of online gaming with COSMIC777
          </p>
        </motion.div>

        {/* Main About Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#132F4C] rounded-2xl p-8 lg:p-12 border border-blue-500/20 mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            COSMIC777 - Best Online Crypto Casino
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            COSMIC777 is set to redefine the online gaming industry with its 100% original games and cutting-edge user experience. Launching in May 2025, 
            our platform is built for players who demand fairness, excitement, and innovation. At COSMIC777, we don't just offer games—we create unique, 
            high-quality experiences that you won't find anywhere else.
          </p>
        </motion.div>

        {/* What Makes Us Different */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8">What Makes Us Different</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Play className="w-8 h-8 text-blue-400" />
                <h4 className="text-xl font-bold text-white">Exclusive & Original Games</h4>
              </div>
              <p className="text-gray-300">
                Unlike other platforms, all six of our games—Dice, Mines, Limbo, Rock Paper Scissors, Balloon, and Heads & Tails—are 
                completely original and custom-built for an unmatched experience.
              </p>
            </div>

            <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-green-400" />
                <h4 className="text-xl font-bold text-white">Security & Transparency</h4>
              </div>
              <p className="text-gray-300">
                While many platforms copy, we innovate. Our systems are undergoing security audits, ensuring fair gameplay and 
                complete transparency.
              </p>
            </div>

            <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
                <h4 className="text-xl font-bold text-white">Seamless UPI Transactions</h4>
              </div>
              <p className="text-gray-300">
                Enjoy quick, hassle-free deposits and withdrawals with our UPI-only payment system—no delays, no complications.
              </p>
            </div>

            <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-purple-400" />
                <h4 className="text-xl font-bold text-white">Next-Level UI & Gameplay</h4>
              </div>
              <p className="text-gray-300">
                Our modern interface and smooth gaming experience make every session thrilling—especially in Dice & Balloon, where the 
                excitement never stops.
              </p>
            </div>

            <div className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Headphones className="w-8 h-8 text-cyan-400" />
                <h4 className="text-xl font-bold text-white">Reliable 24/7 Support</h4>
              </div>
              <p className="text-gray-300">
                Our dedicated support team ensures you always have a seamless and enjoyable gaming experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* COSMIC777 Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8">COSMIC777 Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2"
                key={onlineUsers}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {onlineUsers.toLocaleString()}
              </motion.div>
              <div className="text-lg font-semibold text-white mb-1">Total players online</div>
              <div className="text-sm text-gray-400">Updates every 10 seconds</div>
            </motion.div>

            <motion.div 
              className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="text-4xl lg:text-5xl font-bold text-green-400 mb-2"
                key={registeredUsers}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {registeredUsers}+
              </motion.div>
              <div className="text-lg font-semibold text-white mb-1">Total registered players</div>
              <div className="text-sm text-gray-400">Growing community</div>
            </motion.div>

            <motion.div 
              className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2"
                key={totalPaid}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ${totalPaid.toFixed(1)}L+
              </motion.div>
              <div className="text-lg font-semibold text-white mb-1">Total paid to players</div>
              <div className="text-sm text-gray-400">Transparent payouts</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Real-time User Join Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20 text-center mb-12"
        >
          <motion.div
            key={newUsersJoined}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-white mb-2"
          >
            🚀 {newUsersJoined} new users joined Cosmic in last 10 seconds
          </motion.div>
          <p className="text-gray-300">Join the fastest-growing gaming community!</p>
        </motion.div>

        {/* The Future Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#1A243D] to-[#132F4C] rounded-2xl p-8 lg:p-12 border border-blue-500/20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">The Future of Online Gaming Begins Here</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our platform represents the next evolution in online gaming, combining innovative technology with player-focused design. With our commitment 
            to transparency, security, and original content, COSMIC777 is not just another gaming platform—it's a revolution in how online gaming should be 
            experienced.
          </p>
        </motion.div>
      </div>
      
      {/* Privacy Policy Section */}
      <div id="privacy" className="max-w-6xl mx-auto p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#132F4C] rounded-2xl p-8 lg:p-12 border border-blue-500/20 mb-8"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Privacy Policy</h3>
          <div className="space-y-6 text-gray-300">
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-3">Information We Collect</h4>
              <p className="leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                make deposits, or contact our support team. This includes your name, email address, 
                payment information, and gaming activity.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-3">How We Use Your Information</h4>
              <p className="leading-relaxed">
                Your information is used to provide our services, process transactions, ensure fair play, 
                comply with legal requirements, and improve our platform. We never sell your personal data to third parties.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-3">Data Security</h4>
              <p className="leading-relaxed">
                We implement industry-standard security measures including 256-bit SSL encryption, 
                secure data storage, and regular security audits to protect your information.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Terms of Service Section */}
      <div id="terms" className="max-w-6xl mx-auto p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#132F4C] rounded-2xl p-8 lg:p-12 border border-blue-500/20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Terms of Service</h3>
          <div className="space-y-6 text-gray-300">
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-3">Eligibility</h4>
              <p className="leading-relaxed">
                You must be at least 18 years old and legally eligible to participate in online gaming 
                in your jurisdiction. By using our services, you confirm that you meet these requirements.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-3">Account Responsibilities</h4>
              <p className="leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials, 
                all activities under your account, and ensuring your account information is accurate and up-to-date.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-3">Fair Play</h4>
              <p className="leading-relaxed">
                All games must be played fairly. Any attempt to manipulate games, use unauthorized software, 
                or engage in fraudulent activity will result in account termination and forfeiture of funds.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-400 mb-3">Deposits and Withdrawals</h4>
              <p className="leading-relaxed">
                All transactions are subject to our verification procedures. We reserve the right to request 
                additional documentation for large transactions or suspicious activity.
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