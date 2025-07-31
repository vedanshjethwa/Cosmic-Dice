import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Clock, AlertTriangle, Heart, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';

export function ResponsibleGamingPage() {
  const navigate = useNavigate();

  const warningSignsData = [
    'Spending more money than you can afford',
    'Gaming for longer periods than intended',
    'Feeling anxious or depressed about gaming',
    'Neglecting work, family, or social activities',
    'Borrowing money to fund gaming',
    'Lying about time or money spent gaming',
    'Chasing losses with bigger bets',
    'Unable to stop when winning or losing'
  ];

  const supportResources = [
    {
      name: 'National Gambling Helpline',
      phone: '1800-XXX-XXXX',
      website: 'www.gamblinghelp.org',
      description: '24/7 confidential support for gambling problems'
    },
    {
      name: 'Gamblers Anonymous',
      phone: '1800-XXX-YYYY',
      website: 'www.gamblersanonymous.org',
      description: 'Support groups and recovery programs'
    },
    {
      name: 'Mental Health Support',
      phone: '1800-XXX-ZZZZ',
      website: 'www.mentalhealth.gov',
      description: 'Professional counseling and therapy services'
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
              Cosmic - Responsible Gaming
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
              Play Responsibly
            </h2>
          </div>
          <p className="text-xl text-gray-300">
            Gaming should be fun and entertaining. Learn how to maintain healthy gaming habits.
          </p>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Key Principles of Responsible Gaming</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Take Regular Breaks</h4>
                  <p className="text-gray-400">
                    Step away from gaming every 30-60 minutes. Set timers to remind yourself 
                    to take breaks and maintain perspective.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Set Spending Limits</h4>
                  <p className="text-gray-400">
                    Decide beforehand how much you can afford to lose. Never exceed this amount, 
                    regardless of wins or losses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Don't Chase Losses</h4>
                  <p className="text-gray-400">
                    Accept losses as part of gaming. Trying to win back losses often leads to 
                    bigger losses and problematic behavior.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Maintain Balance</h4>
                  <p className="text-gray-400">
                    Gaming should not interfere with work, relationships, or other important 
                    aspects of your life.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Know When to Stop</h4>
                  <p className="text-gray-400">
                    Set win and loss limits before you start. When you reach either limit, 
                    stop playing for the day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Stay Informed</h4>
                  <p className="text-gray-400">
                    Understand the games you play, their odds, and the risks involved. 
                    Knowledge helps you make better decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Warning Signs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-8 border border-red-500/20 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <h3 className="text-2xl font-bold text-white">Warning Signs to Watch For</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warningSignsData.map((sign, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{sign}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <p className="text-red-400 font-semibold">
              If you recognize any of these signs in yourself or others, it's important to seek help immediately.
            </p>
          </div>
        </motion.div>

        {/* Support Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#132F4C] rounded-2xl p-8 border border-blue-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">Get Help & Support</h3>
          </div>
          <p className="text-gray-300 mb-6">
            If you or someone you know is struggling with gambling, help is available. 
            These resources provide confidential support and guidance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportResources.map((resource, index) => (
              <div key={index} className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/20">
                <h4 className="font-bold text-white mb-2">{resource.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium">{resource.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-400" />
                    <a href={`https://${resource.website}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                      {resource.website}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}