import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Globe,
  ExternalLink,
  Headphones,
  MessageCircle,
  Wallet,
  CreditCard,
  HelpCircle,
  Shield,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    casino: {
      title: 'Casino',
      icon: <CreditCard className="w-5 h-5" />,
      links: [
        { name: 'Casino Games', href: 'https://example.com/casino-games' },
        { name: 'Slots', href: 'https://example.com/slots' },
        { name: 'Roulette', href: 'https://example.com/roulette' },
        { name: 'Promos & Competitions', href: 'https://example.com/promos' },
      ],
    },
    support: {
      title: 'Support',
      icon: <Headphones className="w-5 h-5" />,
      links: [
        {
          name: 'Help Center',
          href: 'https://example.com/help-center',
          external: true,
        },
        {
          name: 'Gambling Helpline',
          href: 'https://example.com/gambling-helpline',
          external: true,
        },
        { name: 'Live Support', href: 'https://example.com/live-support', icon: <MessageCircle className="w-4 h-4" /> },
        { name: 'Self Exclusion', href: 'https://example.com/self-exclusion', icon: <Shield className="w-4 h-4" /> },
      ],
    },
    about: {
      title: 'About Us',
      icon: <BookOpen className="w-5 h-5" />,
      links: [
        { name: 'Affiliate Program', href: 'https://example.com/affiliate' },
        { name: 'Privacy Policy', href: 'https://example.com/privacy-policy' },
        { name: 'Terms of Service', href: 'https://example.com/terms-of-service' },
      ],
    },
    payment: {
      title: 'Payment Info',
      icon: <Wallet className="w-5 h-5" />,
      links: [
        { name: 'Deposit & Withdrawals', href: 'https://example.com/deposit-withdrawals' },
        { name: 'How to Use the Vault', href: 'https://example.com/how-to-use-vault' },
        { name: 'How Much to Bet With', href: 'https://example.com/how-much-to-bet' },
      ],
    },
    guides: {
      title: 'Guides',
      icon: <HelpCircle className="w-5 h-5" />,
      links: [
        { name: 'How-to Guides', href: 'https://example.com/how-to-guides' },
        { name: 'Online Casino Guide', href: 'https://example.com/online-casino-guide' },
        { name: 'Responsible Gaming', href: 'https://example.com/responsible-gaming', icon: <AlertTriangle className="w-4 h-4" /> },
        { name: 'Security Tips', href: 'https://example.com/security-tips', icon: <Shield className="w-4 h-4" /> },
      ],
    },
  };

  const socialLinks = [
    { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
    { Icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
    { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { Icon: Youtube, label: 'Youtube', href: 'https://youtube.com' },
    { Icon: Mail, label: 'Email', href: 'mailto:support@cosmic777.com' },
  ];

  const languages = ['English', 'Español', 'Français', 'Deutsch', 'Italiano'];

  const paymentMethods = [
    { name: 'Visa', image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/visa.png' },
    { name: 'Mastercard', image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/mastercard.png' },
    { name: 'PayPal', image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/paypal.png' },
    { name: 'Google Pay', image: 'https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/gpay.png' },
  ];

  return (
    <footer className="mt-8 bg-gradient-to-b from-[#0A1929] to-black rounded-xl lg:rounded-2xl xl:rounded-3xl border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 xl:py-16">
        {/* Logo and Copyright */}
        <div className="mb-12">
          <h2
            className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2"
            style={{ fontFamily: "'Press Start 2P', system-ui" }}
          >
            COSMIC
          </h2>
          <p className="text-gray-400">© Cosmic777.com {currentYear}</p>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-4">
                {section.icon}
                <h3 className="text-base lg:text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-all flex items-center gap-2 group text-sm"
                    >
                      {link.icon && <span className="opacity-60 group-hover:opacity-100">{link.icon}</span>}
                      <span className="border-b border-transparent group-hover:border-blue-400/30">
                        {link.name}
                      </span>
                      {link.external && (
                        <ExternalLink size={12} className="opacity-60 group-hover:opacity-100" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mb-8 lg:mb-12">
          <h4 className="text-sm font-semibold text-gray-400 mb-4">Payment Methods</h4>
          <div className="flex flex-wrap gap-2 lg:gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-white/5 rounded-lg p-2 lg:p-3 transition-all hover:bg-white/10 grayscale hover:grayscale-0"
              >
                <img
                  src={method.image}
                  alt={method.name}
                  className="h-6 lg:h-8 w-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-6 lg:pt-8 border-t border-blue-900/30 gap-4 lg:gap-0">
          {/* Social Links */}
          <div className="flex space-x-4 lg:space-x-6">
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="text-gray-400 hover:text-blue-400 transition-all transform hover:scale-110"
                aria-label={label}
              >
                <Icon size={18} className="lg:w-5 lg:h-5" />
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <div className="flex items-center gap-2 text-gray-400">
              <Globe size={18} className="lg:w-5 lg:h-5" />
              <select
                className="bg-[#132F4C] text-white rounded-lg px-2 lg:px-3 py-1 lg:py-2 appearance-none cursor-pointer border border-blue-900/30 focus:outline-none focus:border-blue-500 hover:bg-[#1a3a5f] transition-colors text-sm lg:text-base"
                defaultValue="English"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}