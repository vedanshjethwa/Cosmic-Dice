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
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  HelpCircle,
  FileText,
  AlertTriangle,
  Save,
  RefreshCw
} from 'lucide-react';

export function SettingsPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('en');
  const [soundEnabled, setSoundEnabled] = useState(true);
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

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Settings saved');
  };

  const handleResetSettings = () => {
    // Reset to defaults
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

        {/* Quick Links */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-white font-medium">Help Center</h3>
                <p className="text-gray-400 text-sm">Get help and support</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left">
              <FileText className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-white font-medium">Terms of Service</h3>
                <p className="text-gray-400 text-sm">Read our terms</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left">
              <Shield className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-white font-medium">Privacy Policy</h3>
                <p className="text-gray-400 text-sm">Your privacy matters</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-[#0A1929] rounded-lg hover:bg-blue-600/20 transition-colors text-left">
              <AlertTriangle className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-white font-medium">Responsible Gaming</h3>
                <p className="text-gray-400 text-sm">Gaming responsibly</p>
              </div>
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