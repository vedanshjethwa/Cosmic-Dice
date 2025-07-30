import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, Shield, Zap, Users, Headphones, Play, ArrowLeft } from 'lucide-react';

export function AboutPage() {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Play className="w-8 h-8" />,
      title: 'Exclusive & Original Games',
      description:
        'Unlike other platforms, all six of our games—Dice, Mines, Limbo, Rock Paper Scissors, Balloon, and Heads & Tails—are completely original and custom-built for an unmatched experience.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security & Transparency',
      description:
        'While many platforms copy, we innovate. Our systems are undergoing security audits, ensuring fair gameplay and complete transparency.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Seamless UPI Transactions',
      description:
        'Enjoy quick, hassle-free deposits and withdrawals with our UPI-only payment system—no delays, no complications.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Next-Level UI & Gameplay',
      description:
        'Our modern interface and smooth gaming experience make every session thrilling—especially in Dice & Balloon, where the excitement never stops.',
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Reliable 24/7 Support',
      description:
        'Our dedicated support team ensures you always have a seamless and enjoyable gaming experience.',
    },
  ];

  // State for dynamic stats
  const [stats, setStats] = useState([
    {
      label: 'Total players online',
      value: '1,524',
      description: 'Updates every 10 seconds',
    },
    {
      label: 'Total registered players',
      value: '511+',
      description: 'Growing community',
    },
    {
      label: 'Total paid to players',
      value: '$2L+',
      description: 'Transparent payouts',
    },
  ]);

  // Function to generate random number between min and max
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Update stats dynamically
  useEffect(() => {
    // Update online players every 10 seconds
    const onlinePlayersInterval = setInterval(() => {
      const newOnlinePlayers = getRandomNumber(800, 2500);
      setStats((prevStats) => [
        {
          ...prevStats[0],
          value: formatNumber(newOnlinePlayers),
        },
        prevStats[1],
        prevStats[2],
      ]);
    }, 10000);

    // Update registered players weekly (simulated here with faster interval for demo)
    const registeredPlayersInterval = setInterval(() => {
      setStats((prevStats) => [
        prevStats[0],
        {
          ...prevStats[1],
          value: formatNumber(getRandomNumber(511, 800)) + '+',
        },
        prevStats[2],
      ]);
    }, 30000); // In real app, this would be weekly (604800000 ms)

    // Update total paid monthly (simulated here with faster interval for demo)
    const totalPaidInterval = setInterval(() => {
      setStats((prevStats) => [
        prevStats[0],
        prevStats[1],
        {
          ...prevStats[2],
          value: '$' + getRandomNumber(2, 5) + 'L+',
        },
      ]);
    }, 45000); // In real app, this would be monthly (2629800000 ms)

    return () => {
      clearInterval(onlinePlayersInterval);
      clearInterval(registeredPlayersInterval);
      clearInterval(totalPaidInterval);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 text-white">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </button>
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-gray-400 text-base lg:text-lg">
            Discover the future of online gaming with COSMIC777
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Main About Section */}
        <div className="bg-[#132F4C] rounded-xl p-4 lg:p-8 mb-6 lg:mb-8 border border-blue-500/20">
        <h2 className="text-xl lg:text-3xl font-bold mb-4 lg:mb-6 text-white">
          COSMIC777 - Best Online Crypto Casino
        </h2>
        <div className="space-y-4 lg:space-y-6 text-gray-300 leading-relaxed text-sm lg:text-base">
          <p>
            COSMIC777 is set to redefine the online gaming industry with its
            100% original games and cutting-edge user experience. Launching in
            May 2025, our platform is built for players who demand fairness,
            excitement, and innovation. At COSMIC777, we don't just offer
            games—we create unique, high-quality experiences that you won't find
            anywhere else.
          </p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 lg:mb-8"
      >
        <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-white">
          What Makes Us Different
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 hover:border-blue-500/40 transition-colors"
            >
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h4 className="text-base lg:text-lg font-bold mb-3 text-white">
                {feature.title}
              </h4>
              <p className="text-gray-400 text-sm lg:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-6 lg:mb-8"
      >
        <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-white">COSMIC777 Stats</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              className="bg-[#132F4C] rounded-xl p-4 lg:p-6 border border-blue-500/20 text-center"
            >
              <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-white font-medium mb-1 text-sm lg:text-base">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 lg:p-8 border border-blue-500/20"
      >
        <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white">
          The Future of Online Gaming Begins Here
        </h3>
        <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
          Our platform represents the next evolution in online gaming, combining
          innovative technology with player-focused design. With our commitment
          to transparency, security, and original content, COSMIC777 is not just
          another gaming platform—it's a revolution in how online gaming should
          be experienced.
        </p>
      </motion.div>
    </div>
  );
}
