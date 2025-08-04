import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle, 
  LogOut, 
  Menu,
  Lock,
  Wallet,
  Link,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Smartphone,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Settings states
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('INR');
  const [showBalance, setShowBalance] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/settings"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header */}
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
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Cosmic - Settings
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Account Settings */}
            <div className="bg-[#132F4C] rounded-2xl border border-blue-500/20 overflow-hidden">
              <div className="p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <User className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Account Settings</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Profile Information</div>
                      <div className="text-gray-400 text-sm">Update your personal details</div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/profile')}
                    className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg"
                  >
                    Edit →
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Change Password</div>
                      <div className="text-gray-400 text-sm">Update your account password</div>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg">
                    Change →
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Two-Factor Authentication</div>
                      <div className="text-gray-400 text-sm">Add extra security to your account</div>
                    </div>
                  </div>
                  <ToggleSwitch enabled={twoFactorEnabled} onChange={setTwoFactorEnabled} />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-[#132F4C] rounded-2xl border border-blue-500/20 overflow-hidden">
              <div className="p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <Bell className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Notification Settings</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Push Notifications</div>
                      <div className="text-gray-400 text-sm">Receive notifications on your device</div>
                    </div>
                  </div>
                  <ToggleSwitch enabled={notifications} onChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Email Notifications</div>
                      <div className="text-gray-400 text-sm">Get updates via email</div>
                    </div>
                  </div>
                  <ToggleSwitch enabled={emailNotifications} onChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {soundEnabled ? <Volume2 className="text-gray-400" size={20} /> : <VolumeX className="text-gray-400" size={20} />}
                    <div>
                      <div className="text-white font-medium">Sound Effects</div>
                      <div className="text-gray-400 text-sm">Enable game sound effects</div>
                    </div>
                  </div>
                  <ToggleSwitch enabled={soundEnabled} onChange={setSoundEnabled} />
                </div>
              </div>
            </div>

            {/* Language & Region */}
            <div className="bg-[#132F4C] rounded-2xl border border-blue-500/20 overflow-hidden">
              <div className="p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <Globe className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Language & Region</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Language</div>
                      <div className="text-gray-400 text-sm">Choose your preferred language</div>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-[#0A1929] border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="hi">हिंदी</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 text-xl">₹</div>
                    <div>
                      <div className="text-white font-medium">Currency</div>
                      <div className="text-gray-400 text-sm">Select your preferred currency</div>
                    </div>
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-[#0A1929] border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="INR">₹ Indian Rupee</option>
                    <option value="USD">$ US Dollar</option>
                    <option value="EUR">€ Euro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Wallet Settings */}
            <div className="bg-[#132F4C] rounded-2xl border border-blue-500/20 overflow-hidden">
              <div className="p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <Wallet className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Wallet Settings</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {showBalance ? <Eye className="text-gray-400" size={20} /> : <EyeOff className="text-gray-400" size={20} />}
                    <div>
                      <div className="text-white font-medium">Show Balance</div>
                      <div className="text-gray-400 text-sm">Display wallet balance in header</div>
                    </div>
                  </div>
                  <ToggleSwitch enabled={showBalance} onChange={setShowBalance} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wallet className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Payment Methods</div>
                      <div className="text-gray-400 text-sm">Manage your payment options</div>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg">
                    Manage →
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Transaction Limits</div>
                      <div className="text-gray-400 text-sm">Set daily and monthly limits</div>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg">
                    Configure →
                  </button>
                </div>
              </div>
            </div>

            {/* Linked Accounts */}
            <div className="bg-[#132F4C] rounded-2xl border border-blue-500/20 overflow-hidden">
              <div className="p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <Link className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Linked Accounts</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      G
                    </div>
                    <div>
                      <div className="text-white font-medium">Google Account</div>
                      <div className="text-gray-400 text-sm">Not connected</div>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg">
                    Connect →
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      F
                    </div>
                    <div>
                      <div className="text-white font-medium">Facebook Account</div>
                      <div className="text-gray-400 text-sm">Not connected</div>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg">
                    Connect →
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-[#132F4C] rounded-2xl border border-blue-500/20 overflow-hidden">
              <div className="p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <Palette className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Appearance</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Palette className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Theme</div>
                      <div className="text-gray-400 text-sm">Choose your preferred theme</div>
                    </div>
                  </div>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="bg-[#0A1929] border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-[#132F4C] rounded-2xl border border-blue-500/20 overflow-hidden">
              <div className="p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Support</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="text-gray-400" size={20} />
                    <div>
                      <div className="text-white font-medium">Help Center</div>
                      <div className="text-gray-400 text-sm">Browse our help articles</div>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg">
                    Visit →
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 text-xl">💬</div>
                    <div>
                      <div className="text-white font-medium">Contact Support</div>
                      <div className="text-gray-400 text-sm">Get help from our team</div>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg">
                    Contact →
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 text-xl">🐛</div>
                    <div>
                      <div className="text-white font-medium">Report a Bug</div>
                      <div className="text-gray-400 text-sm">Help us improve the platform</div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/feedback')}
                    className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg"
                  >
                    Report →
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-2xl border border-red-500/30 overflow-hidden">
              <div className="p-6 border-b border-red-500/30">
                <div className="flex items-center gap-3">
                  <LogOut className="text-red-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Danger Zone</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Sign Out</div>
                    <div className="text-gray-400 text-sm">Sign out of your account on this device</div>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}