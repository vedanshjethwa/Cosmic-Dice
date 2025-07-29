import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  HelpCircle,
  FileText,
  AlertTriangle,
  Save,
  RefreshCw,
  Headphones,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

interface SupportPageProps {
  title: string;
  content: React.ReactNode;
  onBack: () => void;
}

function SupportPage({ title, content, onBack }: SupportPageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4"
        >
          ← Back to Settings
        </button>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {title}
        </h1>
      </motion.div>
      <div className="bg-[#132F4C] rounded-xl p-8 border border-blue-500/20">
        {content}
      </div>
    </div>
  );
}

export function SettingsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('en');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentSupportPage, setCurrentSupportPage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    gameUpdates: true,
    promotions: true,
    security: true
  });
  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    showGameHistory: false,
    allowFriendRequests: true
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [autoLogout, setAutoLogout] = useState('30');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];

  const supportPages = {
    'help-center': {
      title: 'Help Center',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">How do I deposit funds?</h3>
              <p className="text-gray-300">You can deposit funds using UPI, Net Banking, or Digital Wallets. Go to your wallet and click 'Deposit' to get started.</p>
            </div>
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">How long do withdrawals take?</h3>
              <p className="text-gray-300">Withdrawals are typically processed within 1-3 business days. UPI withdrawals are usually faster.</p>
            </div>
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Are the games fair?</h3>
              <p className="text-gray-300">Yes, all our games use provably fair algorithms and are regularly audited for fairness and transparency.</p>
            </div>
          </div>
        </div>
      )
    },
    'gambling-helpline': {
      title: 'Gambling Helpline',
      content: (
        <div className="space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Need Help with Gambling?</h2>
            <p className="text-gray-300 mb-4">
              If you or someone you know is struggling with gambling addiction, help is available 24/7.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">National Gambling Helpline</h3>
              <p className="text-gray-300">Call: 1-800-GAMBLER (1-800-426-2537)</p>
              <p className="text-gray-300">Available 24/7, confidential support</p>
            </div>
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Online Resources</h3>
              <p className="text-gray-300">Visit: www.ncpgambling.org for additional resources and support</p>
            </div>
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Self-Assessment Tools</h3>
              <p className="text-gray-300">Take our confidential self-assessment to evaluate your gambling habits</p>
            </div>
          </div>
        </div>
      )
    },
    'live-support': {
      title: 'Live Support',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Chat with Our Support Team</h2>
          <div className="bg-[#0A1929] rounded-lg p-6">
            <p className="text-gray-300 mb-4">
              Our live support team is available 24/7 to help you with any questions or issues.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Start Live Chat
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Average Response Time</h3>
              <p className="text-green-400 text-2xl font-bold">&lt; 2 minutes</p>
            </div>
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Satisfaction Rate</h3>
              <p className="text-green-400 text-2xl font-bold">98.5%</p>
            </div>
          </div>
        </div>
      )
    },
    'self-exclusion': {
      title: 'Self Exclusion',
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Temporarily Block Your Account</h2>
            <p className="text-gray-300 mb-4">
              Self-exclusion allows you to temporarily block access to your account for a specified period.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Exclusion Periods</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• 24 hours</li>
                <li>• 7 days</li>
                <li>• 30 days</li>
                <li>• 6 months</li>
                <li>• 1 year</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-2">Important Notice</h3>
              <p className="text-gray-300">Once activated, self-exclusion cannot be reversed until the period expires.</p>
            </div>
          </div>
        </div>
      )
    },
    'terms-of-service': {
      title: 'Terms of Service',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Terms of Service</h2>
          <div className="space-y-4 text-gray-300">
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h3>
              <p>By accessing and using Cosmic777, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">2. Eligibility</h3>
              <p>You must be at least 18 years old and legally eligible to participate in gaming activities in your jurisdiction.</p>
            </section>
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">3. Account Responsibilities</h3>
              <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.</p>
            </section>
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">4. Fair Play</h3>
              <p>All games are provably fair and use certified random number generators to ensure fair outcomes.</p>
            </section>
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">5. Deposits and Withdrawals</h3>
              <p>All financial transactions are processed securely. Withdrawal requests may take 1-3 business days to process.</p>
            </section>
          </div>
        </div>
      )
    },
    'responsible-gaming': {
      title: 'Responsible Gaming',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Learn to Play Responsibly</h2>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-400 mb-4">Gaming Should Be Fun</h3>
            <p className="text-gray-300">
              Gaming is meant to be an entertaining activity. When it stops being fun, it's time to take a break.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Set Limits</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Set a budget before you start playing</li>
                <li>• Never chase your losses</li>
                <li>• Take regular breaks</li>
                <li>• Don't play when emotional or under influence</li>
              </ul>
            </div>
            <div className="bg-[#0A1929] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Warning Signs</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Spending more than you can afford</li>
                <li>• Gaming to escape problems</li>
                <li>• Lying about gaming activities</li>
                <li>• Neglecting responsibilities</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Your Privacy Matters</h2>
          <div className="space-y-4 text-gray-300">
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create an account, make deposits, or contact customer support.</p>
            </section>
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">How We Use Your Information</h3>
              <ul className="space-y-1">
                <li>• To provide and maintain our gaming services</li>
                <li>• To process transactions and prevent fraud</li>
                <li>• To comply with legal and regulatory requirements</li>
                <li>• To improve our services and user experience</li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">Data Security</h3>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">Your Rights</h3>
              <p>You have the right to access, update, or delete your personal information. Contact our support team for assistance with data requests.</p>
            </section>
            <section>
              <h3 className="text-xl font-semibold text-white mb-2">Cookies</h3>
              <p>We use cookies to enhance your browsing experience and analyze site traffic. You can control cookie settings through your browser.</p>
            </section>
          </div>
        </div>
      )
    }
  };

  const handleSaveSettings = () => {
    console.log('Settings saved');
  };

  const handleResetSettings = () => {
    setTheme('dark');
    setLanguage('en');
    setSoundEnabled(true);
    setNotifications({
      email: true,
      push: false,
      sms: false,
      gameUpdates: true,
      promotions: true,
      security: true
    });
    setPrivacy({
      showOnlineStatus: true,
      showGameHistory: false,
      allowFriendRequests: true
    });
    setTwoFactorEnabled(false);
    setAutoLogout('30');
  };

  if (currentSupportPage && supportPages[currentSupportPage as keyof typeof supportPages]) {
    const page = supportPages[currentSupportPage as keyof typeof supportPages];
    return (
      <SupportPage
        title={page.title}
        content={page.content}
        onBack={() => setCurrentSupportPage(null)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Customize your gaming experience and account preferences
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <User className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Account Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Appearance & Language</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Theme
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-[#0A1929] text-gray-400'
                  }`}
                >
                  <Moon size={16} />
                  Dark
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'light' ? 'bg-blue-600 text-white' : 'bg-[#0A1929] text-gray-400'
                  }`}
                >
                  <Sun size={16} />
                  Light
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {key === 'email' && 'Receive notifications via email'}
                    {key === 'push' && 'Browser push notifications'}
                    {key === 'sms' && 'SMS notifications for important updates'}
                    {key === 'gameUpdates' && 'New games and features'}
                    {key === 'promotions' && 'Special offers and bonuses'}
                    {key === 'security' && 'Security alerts and login notifications'}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    value ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Security & Privacy</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Auto Logout (minutes)
              </label>
              <select
                value={autoLogout}
                onChange={(e) => setAutoLogout(e.target.value)}
                className="w-full bg-[#0A1929] text-white border border-blue-500/30 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="0">Never</option>
              </select>
            </div>

            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {key === 'showOnlineStatus' && 'Let others see when you\'re online'}
                    {key === 'showGameHistory' && 'Make your game history visible to others'}
                    {key === 'allowFriendRequests' && 'Allow other players to send friend requests'}
                  </p>
                </div>
                <button
                  onClick={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    value ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Game Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Volume2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Game Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Sound Effects</h3>
                <p className="text-gray-400 text-sm">Enable game sound effects and music</p>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  soundEnabled ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                }`}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                {soundEnabled ? 'On' : 'Off'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Support & Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#132F4C] rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Support & Legal</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => setCurrentSupportPage('help-center')}
              className="flex items-center justify-between p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">Help Center</h3>
                  <p className="text-gray-400 text-sm">Get help and support</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button 
              onClick={() => setCurrentSupportPage('gambling-helpline')}
              className="flex items-center justify-between p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">Gambling Helpline</h3>
                  <p className="text-gray-400 text-sm">Get help for gambling addiction</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button 
              onClick={() => setCurrentSupportPage('live-support')}
              className="flex items-center justify-between p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">Live Support</h3>
                  <p className="text-gray-400 text-sm">Chat with our support team</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button 
              onClick={() => setCurrentSupportPage('self-exclusion')}
              className="flex items-center justify-between p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">Self Exclusion</h3>
                  <p className="text-gray-400 text-sm">Temporarily block your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button 
              onClick={() => setCurrentSupportPage('terms-of-service')}
              className="flex items-center justify-between p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">Terms of Service</h3>
                  <p className="text-gray-400 text-sm">Read our terms</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button 
              onClick={() => setCurrentSupportPage('responsible-gaming')}
              className="flex items-center justify-between p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">Responsible Gaming</h3>
                  <p className="text-gray-400 text-sm">Learn to play responsibly</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button 
              onClick={() => setCurrentSupportPage('privacy-policy')}
              className="flex items-center justify-between p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">Privacy Policy</h3>
                  <p className="text-gray-400 text-sm">Your privacy matters</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 justify-end"
        >
          <button
            onClick={handleResetSettings}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600/20 text-gray-300 rounded-lg hover:bg-gray-600/30 transition-colors"
          >
            <RefreshCw size={18} />
            Reset to Defaults
          </button>
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save size={18} />
            Save Settings
          </button>
        </motion.div>
      </div>
    </div>
  );
}