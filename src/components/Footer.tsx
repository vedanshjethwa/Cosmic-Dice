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
        { name: 'Casino Games', href: '/all-games', internal: true },
        { name: 'Slots', href: '/slots', internal: true },
        { name: 'Roulette', href: '/roulette', internal: true },
        { name: 'Promos & Competitions', href: '/offers', internal: true },
      ],
    },
    support: {
      title: 'Support',
      icon: <Headphones className="w-5 h-5" />,
      links: [
        {
          name: 'Help Center',
          href: '/how-to-guides',
          internal: true,
        },
        {
          name: 'Gambling Helpline',
          href: '/responsible-gaming',
          internal: true,
        },
        { name: 'Live Support', href: '/support', icon: <MessageCircle className="w-4 h-4" />, internal: true },
        { name: 'Self Exclusion', href: '/responsible-gaming', icon: <Shield className="w-4 h-4" />, internal: true },
      ],
    },
    about: {
      title: 'About Us',
      icon: <BookOpen className="w-5 h-5" />,
      links: [
        { name: 'Affiliate Program', href: '/affiliate-program', internal: true },
        { name: 'Privacy Policy', href: '/privacy-policy', internal: true },
        { name: 'Terms of Service', href: '/terms', internal: true },
      ],
    },
    payment: {
      title: 'Payment Info',
      icon: <Wallet className="w-5 h-5" />,
      links: [
        { name: 'Deposit & Withdrawals', href: '/deposit', internal: true },
        { name: 'How to Use the Vault', href: '/vault-guide', internal: true },
        { name: 'How Much to Bet With', href: '/betting-guide', internal: true },
      ],
    },
    guides: {
      title: 'Guides',
      icon: <HelpCircle className="w-5 h-5" />,
      links: [
        { name: 'How-to Guides', href: '/how-to-guides', internal: true },
        { name: 'Online Casino Guide', href: '/casino-guide', internal: true },
        { name: 'Responsible Gaming', href: '/responsible-gaming', icon: <AlertTriangle className="w-4 h-4" />, internal: true },
        { name: 'Security Tips', href: '/security-tips', icon: <Shield className="w-4 h-4" />, internal: true },
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
    <footer className="footer-enhanced">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 xl:py-16">
        {/* Logo and Copyright */}
        <div className="mb-12">
          <h2
            className="nav-brand text-xl lg:text-2xl mb-2"
            style={{ fontFamily: "'Press Start 2P', system-ui" }}
          >
            COSMIC
          </h2>
          <p className="text-low-contrast">© Cosmic777.com {currentYear}</p>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-4">
                {section.icon}
                <h3 className="text-base lg:text-lg font-bold text-high-contrast">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.internal ? (
                      <button
                        onClick={() => window.location.href = link.href}
                        className="footer-link flex items-center gap-2 group text-sm w-full text-left"
                      >
                        {link.icon && <span className="opacity-60 group-hover:opacity-100">{link.icon}</span>}
                        <span>
                          {link.name}
                        </span>
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="footer-link flex items-center gap-2 group text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.icon && <span className="opacity-60 group-hover:opacity-100">{link.icon}</span>}
                        <span>
                          {link.name}
                        </span>
                        <ExternalLink size={12} className="opacity-60 group-hover:opacity-100" />
                      </a>
                    )}
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