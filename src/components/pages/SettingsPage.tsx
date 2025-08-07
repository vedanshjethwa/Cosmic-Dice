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
  Mail,
  Save,
  Edit3,
  CreditCard,
  Settings as SettingsIcon
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
  const [autoLogout, setAutoLogout] = useState(true);

  // Profile settings
  const [profileData, setProfileData] = useState({
    username: 'CosmicPlayer777',
    email: 'player@cosmic777.com',
    phone: '+91 98765 43210',
    country: 'India'
  });

  const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: (value: boolean) => void; disabled?: boolean }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const handleSaveProfile = () => {
    // Save profile logic here
    console.log('Profile saved:', profileData);
  };

  const settingsSections = [
    {
      title: 'Account Settings',
      icon: <User className="w-6 h-6 text-blue-400" />,
      items: [
        {
          icon: <Edit3 className="w-5 h-5 text-gray-400" />,
          title: 'Edit Profile',
          description: 'Update your personal information',
          action: () => navigate('/profile')
        },
        {
          icon: <Lock className="w-5 h-5 text-gray-400" />,
          title: 'Change Password',
          description: 'Update your account password',
          action: () => console.log('Change password')
        },
        {
          icon: <Shield className="w-5 h-5 text-gray-400" />,
          title: 'Two-Factor Authentication',
          description: 'Add extra security to your account',
          toggle: { enabled: twoFactorEnabled, onChange: setTwoFactorEnabled }
        }
      ]
    },
    {
      title: 'Notification Settings',
      icon: <Bell className="w-6 h-6 text-green-400" />,
      items: [
        {
          icon: <Smartphone className="w-5 h-5 text-gray-400" />,
          title: 'Push Notifications',
          description: 'Receive notifications on your device',
          toggle: { enabled: notifications, onChange: setNotifications }
        },
        {
          icon: <Mail className="w-5 h-5 text-gray-400" />,
          title: 'Email Notifications',
          description: 'Get updates via email',
          toggle: { enabled: emailNotifications, onChange: setEmailNotifications }
        },
        {
          icon: soundEnabled ? <Volume2 className="w-5 h-5 text-gray-400" /> : <VolumeX className="w-5 h-5 text-gray-400" />,
          title: 'Sound Effects',
          description: 'Enable game sound effects',
          toggle: { enabled: soundEnabled, onChange: setSoundEnabled }
        }
      ]
    },
    {
      title: 'Language & Region',
      icon: <Globe className="w-6 h-6 text-purple-400" />,
      items: [
        {
          icon: <Globe className="w-5 h-5 text-gray-400" />,
          title: 'Language',
          description: 'Choose your preferred language',
          select: {
            value: language,
            onChange: setLanguage,
            options: [
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' },
              { value: 'fr', label: 'Français' },
              { value: 'de', label: 'Deutsch' },
              { value: 'hi', label: 'हिंदी' }
            ]
          }
        },
        {
          icon: <CreditCard className="w-5 h-5 text-gray-400" />,
          title: 'Currency',
          description: 'Select your preferred currency',
          select: {
            value: currency,
            onChange: setCurrency,
            options: [
              { value: 'INR', label: '₹ Indian Rupee' },
              { value: 'USD', label: '$ US Dollar' },
              { value: 'EUR', label: '€ Euro' }
            ]
          }
        }
      ]
    },
    {
      title: 'Wallet Settings',
      icon: <Wallet className="w-6 h-6 text-yellow-400" />,
      items: [
        {
          icon: showBalance ? <Eye className="w-5 h-5 text-gray-400" /> : <EyeOff className="w-5 h-5 text-gray-400" />,
          title: 'Show Balance',
          description: 'Display wallet balance in header',
          toggle: { enabled: showBalance, onChange: setShowBalance }
        },
        {
          icon: <CreditCard className="w-5 h-5 text-gray-400" />,
          title: 'Payment Methods',
          description: 'Manage your payment options',
          action: () => navigate('/payment-methods')
        },
        {
          icon: <Shield className="w-5 h-5 text-gray-400" />,
          title: 'Transaction Limits',
          description: 'Set daily and monthly limits',
          action: () => console.log('Configure limits')
        }
      ]
    },
    {
      title: 'Linked Accounts',
      icon: <Link className="w-6 h-6 text-cyan-400" />,
      items: [
        {
          icon: <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>,
          title: 'Google Account',
          description: 'Connect your Google account',
          action: () => console.log('Connect Google')
        },
        {
          icon: <div className="w-5 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">f</div>,
          title: 'Facebook Account',
          description: 'Connect your Facebook account',
          action: () => console.log('Connect Facebook')
        }
      ]
    }
  ];

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
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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
            className="space-y-8"
          >
            {/* Settings Sections */}
            {settingsSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-[#132F4C] rounded-2xl border border-blue-500/20 overflow-hidden"
              >
                <div className="p-6 border-b border-blue-500/20">
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <h2 className="text-xl font-bold text-white">{section.title}</h2>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <div>
                          <div className="text-white font-medium">{item.title}</div>
                          <div className="text-gray-400 text-sm">{item.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.toggle && (
                          <ToggleSwitch 
                            enabled={item.toggle.enabled} 
                            onChange={item.toggle.onChange} 
                          />
                        )}
                        {item.select && (
                          <select
                            value={item.select.value}
                            onChange={(e) => item.select.onChange(e.target.value)}
                            className="bg-[#0A1929] border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
                          >
                            {item.select.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}
                        {item.action && (
                          <button 
                            onClick={item.action}
                            className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg"
                          >
                            Configure →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Support Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#132F4C] rounded-2xl border border-blue-500/20 overflow-hidden"
            >
              <div className="p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Support & Help</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-white font-medium">Help Center</div>
                      <div className="text-gray-400 text-sm">Browse our help articles</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/how-to-guides')}
                    className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg"
                  >
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
                  <button 
                    onClick={() => navigate('/feedback')}
                    className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 bg-blue-500/10 rounded-lg"
                  >
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
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-2xl border border-red-500/30 overflow-hidden"
            >
              <div className="p-6 border-b border-red-500/30">
                <div className="flex items-center gap-3">
                  <LogOut className="text-red-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Account Actions</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Sign Out</div>
                    <div className="text-gray-400 text-sm">Sign out of your account on this device</div>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                    Sign Out
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Delete Account</div>
                    <div className="text-gray-400 text-sm">Permanently delete your account and data</div>
                  </div>
                  <button className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}