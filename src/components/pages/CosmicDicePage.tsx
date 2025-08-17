import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Sparkles, 
  Target, 
  Palette, 
  Twitter, 
  Instagram, 
  MessageCircle,
  Mail,
  ArrowRight,
  Settings,
  History,
  Share2,
  Volume2,
  VolumeX,
  RotateCcw,
  Trophy,
  Star,
  Users,
  Zap,
  Info,
  HelpCircle,
  X,
  Copy,
  Download,
  Globe,
  Shield,
  Heart,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6
} from 'lucide-react';

interface DiceRoll {
  id: string;
  value: number;
  timestamp: Date;
  diceType: number;
}

interface Settings {
  diceType: 6 | 12 | 20;
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  language: 'en' | 'hi';
  autoRoll: boolean;
}

export function CosmicDicePage() {
  const [currentRoll, setCurrentRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([]);
  const [settings, setSettings] = useState<Settings>({
    diceType: 6,
    soundEnabled: true,
    theme: 'dark',
    language: 'en',
    autoRoll: false
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [totalRolls, setTotalRolls] = useState(0);
  const [favoriteNumber, setFavoriteNumber] = useState<number | null>(null);

  // Calculate stats
  const averageRoll = rollHistory.length > 0 
    ? rollHistory.reduce((sum, roll) => sum + roll.value, 0) / rollHistory.length 
    : 0;

  const rollCounts = rollHistory.reduce((acc, roll) => {
    acc[roll.value] = (acc[roll.value] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const mostRolled = Object.entries(rollCounts).reduce((a, b) => 
    rollCounts[parseInt(a[0])] > rollCounts[parseInt(b[0])] ? a : b, ['1', 0]
  );

  useEffect(() => {
    // Set favorite number based on most rolled
    if (rollHistory.length >= 5) {
      setFavoriteNumber(parseInt(mostRolled[0]));
    }
  }, [rollHistory, mostRolled]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (!isRolling) rollDice();
      }
      if (e.code === 'KeyR' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (!isRolling) rollDice();
      }
      if (e.code === 'KeyS' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setShowSettings(true);
      }
      if (e.code === 'Escape') {
        setShowSettings(false);
        setShowHistory(false);
        setShowHelp(false);
        setShowShare(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRolling]);

  const rollDice = async () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setCurrentRoll(null);

    // Play sound effect
    if (settings.soundEnabled) {
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      } catch (error) {
        // Ignore audio errors
      }
    }

    // Simulate rolling animation
    const rollDuration = 1000 + Math.random() * 500;
    const animationSteps = 20;
    const stepDuration = rollDuration / animationSteps;

    for (let i = 0; i < animationSteps; i++) {
      setTimeout(() => {
        setCurrentRoll(Math.floor(Math.random() * settings.diceType) + 1);
      }, i * stepDuration);
    }

    // Final result
    setTimeout(() => {
      const finalRoll = Math.floor(Math.random() * settings.diceType) + 1;
      setCurrentRoll(finalRoll);
      setIsRolling(false);
      setTotalRolls(prev => prev + 1);

      // Add to history
      const newRoll: DiceRoll = {
        id: Date.now().toString(),
        value: finalRoll,
        timestamp: new Date(),
        diceType: settings.diceType
      };
      setRollHistory(prev => [newRoll, ...prev.slice(0, 49)]); // Keep last 50 rolls

      // Play result sound
      if (settings.soundEnabled) {
        try {
          const resultAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
          resultAudio.volume = 0.5;
          resultAudio.play().catch(() => {});
        } catch (error) {
          // Ignore audio errors
        }
      }
    }, rollDuration);
  };

  const shareResult = async () => {
    const shareText = `I just rolled a ${currentRoll} on Cosmic Dice! 🎲✨ Try your luck at rolling the universe's mystical dice!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cosmic Dice Roll Result',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('Result copied to clipboard!');
      } catch (err) {
        console.log('Copy failed:', err);
      }
    }
  };

  const resetHistory = () => {
    setRollHistory([]);
    setTotalRolls(0);
    setCurrentRoll(null);
    setFavoriteNumber(null);
  };

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const IconComponent = icons[value - 1] || Dice1;
    return <IconComponent size={80} className="text-white" />;
  };

  const translations = {
    en: {
      title: "Roll into the cosmos — a game of chance, strategy, and surprise!",
      subtitle: "Welcome to Cosmic Dice, where every roll takes you closer to the stars. Dare to play?",
      rollButton: "Roll the Dice",
      rolling: "Rolling...",
      howItWorks: "How It Works",
      about: "About Cosmic Dice",
      features: "Features",
      rollHistory: "Roll History",
      settings: "Settings",
      help: "Help",
      share: "Share",
      totalRolls: "Total Rolls",
      averageRoll: "Average Roll",
      favoriteNumber: "Lucky Number",
      diceType: "Dice Type",
      soundEffects: "Sound Effects",
      theme: "Theme",
      language: "Language",
      autoRoll: "Auto Roll"
    },
    hi: {
      title: "ब्रह्मांड में रोल करें — एक खेल जो भाग्य, रणनीति और आश्चर्य का है!",
      subtitle: "कॉस्मिक डाइस में आपका स्वागत है, जहाँ हर रोल आपको सितारों के करीब ले जाता है। खेलने की हिम्मत है?",
      rollButton: "पासा फेंकें",
      rolling: "फेंक रहे हैं...",
      howItWorks: "यह कैसे काम करता है",
      about: "कॉस्मिक डाइस के बारे में",
      features: "विशेषताएं",
      rollHistory: "रोल इतिहास",
      settings: "सेटिंग्स",
      help: "सहायता",
      share: "साझा करें",
      totalRolls: "कुल रोल",
      averageRoll: "औसत रोल",
      favoriteNumber: "भाग्यशाली संख्या",
      diceType: "पासे का प्रकार",
      soundEffects: "ध्वनि प्रभाव",
      theme: "थीम",
      language: "भाषा",
      autoRoll: "ऑटो रोल"
    }
  };

  const t = translations[settings.language];

  return (
    <div className={`min-h-screen text-white overflow-x-hidden ${
      settings.theme === 'dark' 
        ? 'bg-gradient-to-br from-[#0A0A0A] via-[#1A0A2E] to-[#16213E]' 
        : 'bg-gradient-to-br from-[#E0E7FF] via-[#C7D2FE] to-[#A5B4FC] text-gray-900'
    }`}>
      {/* Animated Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              settings.theme === 'dark' ? 'bg-white opacity-60' : 'bg-purple-600 opacity-40'
            }`}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -100],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-sm border-b ${
        settings.theme === 'dark' 
          ? 'bg-[#0A1929]/95 border-blue-500/20' 
          : 'bg-white/95 border-purple-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.h1
              className={`text-2xl font-bold ${
                settings.theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
                  : 'text-purple-800'
              }`}
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              whileHover={{ scale: 1.05 }}
            >
              COSMIC DICE
            </motion.h1>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSettings(true)}
                className={`p-2 rounded-lg transition-colors ${
                  settings.theme === 'dark'
                    ? 'hover:bg-white/10'
                    : 'hover:bg-purple-100'
                }`}
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className={`p-2 rounded-lg transition-colors ${
                  settings.theme === 'dark'
                    ? 'hover:bg-white/10'
                    : 'hover:bg-purple-100'
                }`}
                aria-label="Roll History"
              >
                <History size={20} />
              </button>
              <button
                onClick={() => setShowHelp(true)}
                className={`p-2 rounded-lg transition-colors ${
                  settings.theme === 'dark'
                    ? 'hover:bg-white/10'
                    : 'hover:bg-purple-100'
                }`}
                aria-label="Help"
              >
                <HelpCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Glowing Dice Graphics */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="text-9xl"
          >
            🎲
          </motion.div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
              settings.theme === 'dark'
                ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent'
                : 'text-purple-800'
            }`}
          >
            {t.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed ${
              settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.subtitle}
          </motion.p>

          {/* Dice Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <div className="relative inline-block">
              <motion.div
                animate={isRolling ? {
                  rotateX: [0, 360, 720, 1080],
                  rotateY: [0, 180, 360, 540],
                  rotateZ: [0, 90, 180, 270],
                } : {}}
                transition={isRolling ? {
                  duration: 1,
                  ease: "easeOut"
                } : {}}
                className={`w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-3xl flex items-center justify-center text-6xl md:text-7xl lg:text-8xl font-bold shadow-2xl border-4 ${
                  settings.theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 border-purple-400 shadow-purple-500/50'
                    : 'bg-gradient-to-br from-purple-500 to-blue-500 border-purple-300 shadow-purple-400/50 text-white'
                }`}
                style={{
                  filter: isRolling ? 'blur(2px)' : 'none',
                }}
              >
                {currentRoll ? (
                  settings.diceType === 6 ? getDiceIcon(currentRoll) : currentRoll
                ) : (
                  <span className="opacity-50">?</span>
                )}
              </motion.div>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl ${
                settings.theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-400/30'
              } blur-xl -z-10 animate-pulse`} />
            </div>
          </motion.div>

          {/* Roll Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: settings.theme === 'dark' 
                ? "0 0 30px rgba(147, 51, 234, 0.6)"
                : "0 0 30px rgba(147, 51, 234, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={rollDice}
            disabled={isRolling}
            className={`px-12 py-6 rounded-full text-xl font-bold transition-all duration-300 shadow-2xl border relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed ${
              settings.theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-purple-400/30'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-purple-300'
            }`}
            aria-label={isRolling ? t.rolling : t.rollButton}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isRolling ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={24} />
                  </motion.div>
                  {t.rolling}
                </>
              ) : (
                <>
                  <Play size={24} />
                  {t.rollButton}
                </>
              )}
            </span>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
              settings.theme === 'dark'
                ? 'bg-gradient-to-r from-white/20 to-transparent'
                : 'bg-gradient-to-r from-white/30 to-transparent'
            }`} />
          </motion.button>

          {/* Quick Stats */}
          {rollHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto"
            >
              <div className={`p-4 rounded-xl text-center ${
                settings.theme === 'dark'
                  ? 'bg-blue-900/30 border border-blue-500/20'
                  : 'bg-white/50 border border-purple-200'
              }`}>
                <div className={`text-2xl font-bold ${
                  settings.theme === 'dark' ? 'text-blue-400' : 'text-purple-600'
                }`}>
                  {totalRolls}
                </div>
                <div className={`text-sm ${
                  settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t.totalRolls}
                </div>
              </div>
              <div className={`p-4 rounded-xl text-center ${
                settings.theme === 'dark'
                  ? 'bg-green-900/30 border border-green-500/20'
                  : 'bg-white/50 border border-purple-200'
              }`}>
                <div className={`text-2xl font-bold ${
                  settings.theme === 'dark' ? 'text-green-400' : 'text-purple-600'
                }`}>
                  {averageRoll.toFixed(1)}
                </div>
                <div className={`text-sm ${
                  settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t.averageRoll}
                </div>
              </div>
              <div className={`p-4 rounded-xl text-center ${
                settings.theme === 'dark'
                  ? 'bg-purple-900/30 border border-purple-500/20'
                  : 'bg-white/50 border border-purple-200'
              }`}>
                <div className={`text-2xl font-bold ${
                  settings.theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {favoriteNumber || '-'}
                </div>
                <div className={`text-sm ${
                  settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t.favoriteNumber}
                </div>
              </div>
            </motion.div>
          )}

          {/* Share Button */}
          {currentRoll && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowShare(true)}
              className={`mt-6 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 mx-auto ${
                settings.theme === 'dark'
                  ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300'
              }`}
            >
              <Share2 size={16} />
              {t.share} Result
            </motion.button>
          )}
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className={`text-sm px-4 py-2 rounded-lg ${
              settings.theme === 'dark'
                ? 'bg-black/30 text-gray-400 border border-gray-600'
                : 'bg-white/50 text-gray-600 border border-gray-300'
            }`}
          >
            Press <kbd className="px-2 py-1 bg-gray-700 text-white rounded text-xs">Space</kbd> or <kbd className="px-2 py-1 bg-gray-700 text-white rounded text-xs">Enter</kbd> to roll
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
              settings.theme === 'dark'
                ? 'bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'
                : 'text-purple-800'
            }`}>
              {t.howItWorks}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={48} />,
                title: settings.language === 'en' ? 'Choose Your Dice' : 'अपना पासा चुनें',
                description: settings.language === 'en' 
                  ? 'Select from 6-sided, 12-sided, or 20-sided cosmic dice'
                  : '6-पक्षीय, 12-पक्षीय, या 20-पक्षीय कॉस्मिक पासे में से चुनें'
              },
              {
                icon: <Sparkles size={48} />,
                title: settings.language === 'en' ? 'Roll & Watch' : 'रोल करें और देखें',
                description: settings.language === 'en'
                  ? 'Experience stunning animations as your dice rolls through space'
                  : 'अद्भुत एनीमेशन का अनुभव करें जब आपका पासा अंतरिक्ष में घूमता है'
              },
              {
                icon: <Star size={48} />,
                title: settings.language === 'en' ? 'Share & Track' : 'साझा करें और ट्रैक करें',
                description: settings.language === 'en'
                  ? 'Share your results and track your rolling statistics'
                  : 'अपने परिणाम साझा करें और अपने रोलिंग आंकड़े ट्रैक करें'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: settings.theme === 'dark'
                    ? "0 20px 40px rgba(147, 51, 234, 0.3)"
                    : "0 20px 40px rgba(147, 51, 234, 0.2)"
                }}
                className={`p-8 rounded-2xl text-center group transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 backdrop-blur-sm'
                    : 'bg-white/70 border border-purple-200 backdrop-blur-sm'
                }`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    settings.theme === 'dark'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}
                >
                  <div className="text-white">
                    {step.icon}
                  </div>
                </motion.div>
                <h3 className={`text-xl md:text-2xl font-bold mb-4 transition-colors ${
                  settings.theme === 'dark'
                    ? 'text-white group-hover:text-purple-300'
                    : 'text-purple-800 group-hover:text-purple-600'
                }`}>
                  {step.title}
                </h3>
                <p className={`leading-relaxed ${
                  settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
                settings.theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
                  : 'text-purple-800'
              }`}>
                {t.about}
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${
                settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {settings.language === 'en'
                  ? 'Cosmic Dice is not just a game, it\'s an interstellar adventure. Every roll brings mystery, luck, and excitement as you journey through the galaxy.'
                  : 'कॉस्मिक डाइस केवल एक खेल नहीं है, यह एक अंतरतारकीय साहसिक कार्य है। हर रोल रहस्य, भाग्य और उत्साह लाता है जब आप आकाशगंगा की यात्रा करते हैं।'
                }
              </p>
              
              {/* Features List */}
              <div className="space-y-3">
                {[
                  { icon: <Zap size={20} />, text: settings.language === 'en' ? 'Multiple dice types' : 'कई पासे के प्रकार' },
                  { icon: <Trophy size={20} />, text: settings.language === 'en' ? 'Roll statistics tracking' : 'रोल आंकड़े ट्रैकिंग' },
                  { icon: <Share2 size={20} />, text: settings.language === 'en' ? 'Social sharing' : 'सामाजिक साझाकरण' },
                  { icon: <Globe size={20} />, text: settings.language === 'en' ? 'Multi-language support' : 'बहु-भाषा समर्थन' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className={`p-2 rounded-lg ${
                      settings.theme === 'dark'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-purple-100 text-purple-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <span className={settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`relative rounded-2xl p-8 border backdrop-blur-sm ${
                settings.theme === 'dark'
                  ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30'
                  : 'bg-white/50 border-purple-200'
              }`}>
                <div className={`absolute inset-0 rounded-2xl ${
                  settings.theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10'
                    : 'bg-gradient-to-br from-purple-200/30 to-blue-200/30'
                }`} />
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-8xl text-center relative z-10"
                >
                  🎲
                </motion.div>
                <div className={`absolute inset-0 rounded-2xl ${
                  settings.theme === 'dark'
                    ? 'bg-gradient-to-t from-purple-600/20 to-transparent'
                    : 'bg-gradient-to-t from-purple-400/20 to-transparent'
                }`} />
                
                {/* Floating particles around dice */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full ${
                      settings.theme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'
                    }`}
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 px-4 relative ${
        settings.theme === 'dark'
          ? 'bg-black/80 backdrop-blur-sm border-purple-500/20'
          : 'bg-white/80 backdrop-blur-sm border-purple-200'
      }`}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className={`font-bold mb-4 ${
                settings.theme === 'dark' ? 'text-white' : 'text-purple-800'
              }`}>
                Cosmic Dice
              </h3>
              <p className={`text-sm leading-relaxed ${
                settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {settings.language === 'en'
                  ? 'Experience the magic of cosmic gaming with our mystical dice roller.'
                  : 'हमारे रहस्यमय पासे रोलर के साथ कॉस्मिक गेमिंग का जादू अनुभव करें।'
                }
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`font-bold mb-4 ${
                settings.theme === 'dark' ? 'text-white' : 'text-purple-800'
              }`}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'Privacy Policy', href: '/privacy-policy' },
                  { name: 'Terms of Service', href: '/terms' },
                  { name: 'Contact Us', href: '/support' },
                  { name: 'Help Center', href: '/how-to-guides' }
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-sm transition-colors ${
                        settings.theme === 'dark'
                          ? 'text-gray-400 hover:text-purple-400'
                          : 'text-gray-600 hover:text-purple-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className={`font-bold mb-4 ${
                settings.theme === 'dark' ? 'text-white' : 'text-purple-800'
              }`}>
                Contact
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} className={settings.theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
                  <a 
                    href="mailto:contact@cosmic777.com"
                    className={`text-sm transition-colors ${
                      settings.theme === 'dark'
                        ? 'text-gray-400 hover:text-purple-400'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    contact@cosmic777.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className={settings.theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
                  <span className={`text-sm ${
                    settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    24/7 Live Support
                  </span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className={`font-bold mb-4 ${
                settings.theme === 'dark' ? 'text-white' : 'text-purple-800'
              }`}>
                Follow Us
              </h3>
              <div className="flex gap-4">
                {[
                  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                  { Icon: MessageCircle, href: 'https://discord.com', label: 'Discord' }
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className={`transition-colors ${
                      settings.theme === 'dark'
                        ? 'text-gray-400 hover:text-purple-400'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                    aria-label={label}
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className={`text-center pt-8 border-t ${
            settings.theme === 'dark'
              ? 'border-purple-500/20 text-gray-400'
              : 'border-purple-200 text-gray-600'
          }`}>
            <p className="text-sm">
              © 2025 Cosmic Dice. All rights reserved. Made with <Heart size={16} className="inline text-red-500" /> for cosmic gamers.
            </p>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full max-w-md rounded-2xl border p-6 ${
                settings.theme === 'dark'
                  ? 'bg-[#0A1929] border-blue-500/20'
                  : 'bg-white border-purple-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${
                  settings.theme === 'dark' ? 'text-white' : 'text-purple-800'
                }`}>
                  {t.settings}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    settings.theme === 'dark'
                      ? 'hover:bg-white/10 text-gray-400'
                      : 'hover:bg-purple-100 text-gray-600'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Dice Type */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.diceType}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[6, 12, 20].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSettings(prev => ({ ...prev, diceType: type as 6 | 12 | 20 }))}
                        className={`p-3 rounded-lg font-medium transition-all ${
                          settings.diceType === type
                            ? settings.theme === 'dark'
                              ? 'bg-blue-600 text-white'
                              : 'bg-purple-600 text-white'
                            : settings.theme === 'dark'
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        D{type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound Effects */}
                <div className="flex items-center justify-between">
                  <label className={`text-sm font-medium ${
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.soundEffects}
                  </label>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                    className={`p-2 rounded-lg transition-colors ${
                      settings.theme === 'dark'
                        ? 'hover:bg-white/10'
                        : 'hover:bg-purple-100'
                    }`}
                  >
                    {settings.soundEnabled ? (
                      <Volume2 size={20} className="text-green-400" />
                    ) : (
                      <VolumeX size={20} className="text-red-400" />
                    )}
                  </button>
                </div>

                {/* Theme */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.theme}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'dark', label: 'Dark', icon: '🌙' },
                      { key: 'light', label: 'Light', icon: '☀️' }
                    ].map((theme) => (
                      <button
                        key={theme.key}
                        onClick={() => setSettings(prev => ({ ...prev, theme: theme.key as 'dark' | 'light' }))}
                        className={`p-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          settings.theme === theme.key
                            ? settings.theme === 'dark'
                              ? 'bg-blue-600 text-white'
                              : 'bg-purple-600 text-white'
                            : settings.theme === 'dark'
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{theme.icon}</span>
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.language}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'en', label: 'English', flag: '🇺🇸' },
                      { key: 'hi', label: 'हिंदी', flag: '🇮🇳' }
                    ].map((lang) => (
                      <button
                        key={lang.key}
                        onClick={() => setSettings(prev => ({ ...prev, language: lang.key as 'en' | 'hi' }))}
                        className={`p-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          settings.language === lang.key
                            ? settings.theme === 'dark'
                              ? 'bg-blue-600 text-white'
                              : 'bg-purple-600 text-white'
                            : settings.theme === 'dark'
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full max-w-2xl rounded-2xl border p-6 max-h-[80vh] overflow-hidden ${
                settings.theme === 'dark'
                  ? 'bg-[#0A1929] border-blue-500/20'
                  : 'bg-white border-purple-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${
                  settings.theme === 'dark' ? 'text-white' : 'text-purple-800'
                }`}>
                  {t.rollHistory}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetHistory}
                    className={`p-2 rounded-lg transition-colors ${
                      settings.theme === 'dark'
                        ? 'hover:bg-red-500/20 text-red-400'
                        : 'hover:bg-red-100 text-red-600'
                    }`}
                    aria-label="Reset History"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={() => setShowHistory(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      settings.theme === 'dark'
                        ? 'hover:bg-white/10 text-gray-400'
                        : 'hover:bg-purple-100 text-gray-600'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {rollHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎲</div>
                  <p className={settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {settings.language === 'en' ? 'No rolls yet. Start rolling!' : 'अभी तक कोई रोल नहीं। रोल करना शुरू करें!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {rollHistory.map((roll, index) => (
                    <motion.div
                      key={roll.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        settings.theme === 'dark'
                          ? 'bg-blue-900/20 border border-blue-500/20'
                          : 'bg-purple-50 border border-purple-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                          settings.theme === 'dark'
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-600 text-white'
                        }`}>
                          {roll.value}
                        </div>
                        <div>
                          <div className={`font-medium ${
                            settings.theme === 'dark' ? 'text-white' : 'text-purple-800'
                          }`}>
                            D{roll.diceType} Roll
                          </div>
                          <div className={`text-sm ${
                            settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {roll.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setShowShare(true);
                          setCurrentRoll(roll.value);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          settings.theme === 'dark'
                            ? 'hover:bg-blue-500/20 text-blue-400'
                            : 'hover:bg-purple-100 text-purple-600'
                        }`}
                        aria-label="Share this roll"
                      >
                        <Share2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full max-w-2xl rounded-2xl border p-6 max-h-[80vh] overflow-y-auto ${
                settings.theme === 'dark'
                  ? 'bg-[#0A1929] border-blue-500/20'
                  : 'bg-white border-purple-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${
                  settings.theme === 'dark' ? 'text-white' : 'text-purple-800'
                }`}>
                  {t.help} & Instructions
                </h3>
                <button
                  onClick={() => setShowHelp(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    settings.theme === 'dark'
                      ? 'hover:bg-white/10 text-gray-400'
                      : 'hover:bg-purple-100 text-gray-600'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className={`font-semibold mb-3 ${
                    settings.theme === 'dark' ? 'text-blue-400' : 'text-purple-600'
                  }`}>
                    {settings.language === 'en' ? 'How to Play' : 'कैसे खेलें'}
                  </h4>
                  <ul className={`space-y-2 text-sm ${
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>• {settings.language === 'en' ? 'Click "Roll the Dice" or press Space/Enter' : '"पासा फेंकें" पर क्लिक करें या Space/Enter दबाएं'}</li>
                    <li>• {settings.language === 'en' ? 'Watch the cosmic animation as your dice rolls' : 'कॉस्मिक एनीमेशन देखें जब आपका पासा घूमता है'}</li>
                    <li>• {settings.language === 'en' ? 'View your result and share it with friends' : 'अपना परिणाम देखें और दोस्तों के साथ साझा करें'}</li>
                    <li>• {settings.language === 'en' ? 'Track your rolling statistics over time' : 'समय के साथ अपने रोलिंग आंकड़े ट्रैक करें'}</li>
                  </ul>
                </div>

                <div>
                  <h4 className={`font-semibold mb-3 ${
                    settings.theme === 'dark' ? 'text-green-400' : 'text-purple-600'
                  }`}>
                    {settings.language === 'en' ? 'Keyboard Shortcuts' : 'कीबोर्ड शॉर्टकट'}
                  </h4>
                  <div className="space-y-2">
                    {[
                      { keys: ['Space', 'Enter'], action: settings.language === 'en' ? 'Roll dice' : 'पासा फेंकें' },
                      { keys: ['Ctrl/Cmd', 'R'], action: settings.language === 'en' ? 'Quick roll' : 'त्वरित रोल' },
                      { keys: ['Ctrl/Cmd', 'S'], action: settings.language === 'en' ? 'Open settings' : 'सेटिंग्स खोलें' },
                      { keys: ['Escape'], action: settings.language === 'en' ? 'Close modals' : 'मॉडल बंद करें' }
                    ].map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {shortcut.keys.map((key, keyIndex) => (
                            <React.Fragment key={keyIndex}>
                              <kbd className={`px-2 py-1 rounded text-xs font-mono ${
                                settings.theme === 'dark'
                                  ? 'bg-gray-700 text-white'
                                  : 'bg-gray-200 text-gray-800'
                              }`}>
                                {key}
                              </kbd>
                              {keyIndex < shortcut.keys.length - 1 && <span className="text-gray-500">+</span>}
                            </React.Fragment>
                          ))}
                        </div>
                        <span className={`text-sm ${
                          settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {shortcut.action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className={`font-semibold mb-3 ${
                    settings.theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    {settings.language === 'en' ? 'Fun Facts' : 'मजेदार तथ्य'}
                  </h4>
                  <ul className={`space-y-2 text-sm ${
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>• {settings.language === 'en' ? 'Dice have been used for over 5,000 years' : 'पासे का उपयोग 5,000 से अधिक वर्षों से किया जा रहा है'}</li>
                    <li>• {settings.language === 'en' ? 'The probability of rolling any number is equal' : 'किसी भी संख्या को रोल करने की संभावना समान है'}</li>
                    <li>• {settings.language === 'en' ? 'D20 dice are popular in tabletop gaming' : 'D20 पासे टेबलटॉप गेमिंग में लोकप्रिय हैं'}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShare && currentRoll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShare(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`w-full max-w-md rounded-2xl border p-6 ${
                settings.theme === 'dark'
                  ? 'bg-[#0A1929] border-blue-500/20'
                  : 'bg-white border-purple-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${
                  settings.theme === 'dark' ? 'text-white' : 'text-purple-800'
                }`}>
                  {t.share} Your Roll
                </h3>
                <button
                  onClick={() => setShowShare(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    settings.theme === 'dark'
                      ? 'hover:bg-white/10 text-gray-400'
                      : 'hover:bg-purple-100 text-gray-600'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className={`text-6xl font-bold mb-4 ${
                  settings.theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {currentRoll}
                </div>
                <p className={settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {settings.language === 'en' 
                    ? `I rolled a ${currentRoll} on Cosmic Dice! 🎲✨`
                    : `मैंने कॉस्मिक डाइस पर ${currentRoll} रोल किया! 🎲✨`
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={shareResult}
                  className={`p-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    settings.theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <Share2 size={16} />
                  {settings.language === 'en' ? 'Share' : 'साझा करें'}
                </button>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(`I rolled a ${currentRoll} on Cosmic Dice! 🎲✨`);
                      alert(settings.language === 'en' ? 'Copied to clipboard!' : 'क्लिपबोर्ड में कॉपी किया गया!');
                    } catch (err) {
                      console.log('Copy failed:', err);
                    }
                  }}
                  className={`p-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    settings.theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  <Copy size={16} />
                  {settings.language === 'en' ? 'Copy' : 'कॉपी करें'}
                </button>
              </div>
            </motion.div>
          )}
        )}
      </AnimatePresence>
    </div>
  );
}