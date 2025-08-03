import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, LogOut, Menu } from 'lucide-react';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

export function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Profile Information', action: () => navigate('/profile') },
        { label: 'Change Password', action: () => {} },
        { label: 'Two-Factor Authentication', action: () => {} },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { 
          label: 'Push Notifications', 
          toggle: true, 
          value: notifications, 
          onChange: setNotifications 
        },
        { 
          label: 'Sound Effects', 
          toggle: true, 
          value: soundEnabled, 
          onChange: setSoundEnabled 
        },
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { label: 'Privacy Settings', action: () => {} },
        { label: 'Data Export', action: () => {} },
        { label: 'Account Deletion', action: () => {} },
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { 
          label: 'Theme', 
          select: true, 
          value: theme, 
          options: [
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' },
            { value: 'auto', label: 'Auto' }
          ],
          onChange: setTheme 
        },
      ]
    },
    {
      title: 'Language & Region',
      icon: Globe,
      items: [
        { 
          label: 'Language', 
          select: true, 
          value: language, 
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
            { value: 'de', label: 'Deutsch' }
          ],
          onChange: setLanguage 
        },
        { label: 'Time Zone', action: () => {} },
      ]
    },
    {
      title: 'Support',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', action: () => {} },
        { label: 'Contact Support', action: () => {} },
        { label: 'Report a Bug', action: () => navigate('/feedback') },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
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
              Cosmic - Settings
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-[#132F4C] rounded-xl border border-blue-500/20">
              <div className="p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <section.icon className="text-blue-400" size={24} />
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between py-3">
                    <span className="text-gray-300">{item.label}</span>
                    
                    {item.toggle && (
                      <button
                        onClick={() => item.onChange?.(!item.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.value ? 'bg-blue-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                    
                    {item.select && (
                      <select
                        value={item.value}
                        onChange={(e) => item.onChange?.(e.target.value)}
                        className="bg-[#0A1929] border border-blue-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                      >
                        {item.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {item.action && !item.toggle && !item.select && (
                      <button
                        onClick={item.action}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Configure →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Danger Zone */}
          <div className="bg-red-900/20 rounded-xl border border-red-500/30">
            <div className="p-6 border-b border-red-500/30">
              <div className="flex items-center gap-3">
                <LogOut className="text-red-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Danger Zone</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between py-3">
                <div>
                  <span className="text-gray-300 block">Sign Out</span>
                  <span className="text-gray-500 text-sm">Sign out of your account</span>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
    </div>
  );
}