import React, { useState, useEffect } from 'react';
import { AlertTriangle, Lightbulb, Gift, X, TrendingDown, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuidanceTooltip {
  id: string;
  type: 'warning' | 'tip' | 'offer' | 'achievement';
  title: string;
  message: string;
  action?: string;
  onAction?: () => void;
  duration?: number;
}

interface GuidanceSystemProps {
  userBehavior: {
    consecutiveLosses: number;
    totalBetAmount: number;
    sessionTime: number;
    lastBetAmount: number;
    averageBetSize: number;
  };
  gameContext: {
    currentGame?: string;
    isPlaying: boolean;
    balance: number;
  };
}

export function GuidanceSystem({ userBehavior, gameContext }: GuidanceSystemProps) {
  const [activeTooltips, setActiveTooltips] = useState<GuidanceTooltip[]>([]);

  useEffect(() => {
    // Don't show guidance on initial page load
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      sessionStorage.setItem('hasVisited', 'true');
      return;
    }

    const newTooltips: GuidanceTooltip[] = [];

    // Overbetting warning
    if (userBehavior.lastBetAmount > gameContext.balance * 0.5) {
      newTooltips.push({
        id: 'overbet-warning',
        type: 'warning',
        title: 'High Risk Detected',
        message: 'Consider betting smaller amounts to preserve your balance for longer gameplay.',
        duration: 8000,
      });
    }

    // Consecutive losses guidance
    if (userBehavior.consecutiveLosses >= 3) {
      newTooltips.push({
        id: 'loss-streak',
        type: 'tip',
        title: 'Take a Break',
        message: 'Consider taking a short break or reducing your bet size after consecutive losses.',
        duration: 10000,
      });
    }

    // Session time bonus offer
    // Loyalty bonus popup removed to improve user experience

    // Achievement unlocked
    if (userBehavior.totalBetAmount >= 5000) {
      newTooltips.push({
        id: 'high-roller',
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: 'High Roller: You\'ve bet over ₹5000 in this session!',
        duration: 6000,
      });
    }

    // Low balance warning
    if (gameContext.balance < 100) {
      newTooltips.push({
        id: 'low-balance',
        type: 'warning',
        title: 'Low Balance Warning',
        message: 'Your balance is running low. Consider making a deposit to continue playing.',
        action: 'Add Funds',
        duration: 12000,
      });
    }

    setActiveTooltips(newTooltips);
  }, [userBehavior, gameContext]);

  const removeTooltip = (id: string) => {
    setActiveTooltips(prev => prev.filter(tooltip => tooltip.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-yellow-400" />;
      case 'offer':
        return <Gift className="w-5 h-5 text-green-400" />;
      case 'achievement':
        return <TrendingDown className="w-5 h-5 text-purple-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'from-red-900/20 to-red-800/20 border-red-500/30';
      case 'tip':
        return 'from-yellow-900/20 to-yellow-800/20 border-yellow-500/30';
      case 'offer':
        return 'from-green-900/20 to-green-800/20 border-green-500/30';
      case 'achievement':
        return 'from-purple-900/20 to-purple-800/20 border-purple-500/30';
      default:
        return 'from-blue-900/20 to-blue-800/20 border-blue-500/30';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {activeTooltips.map((tooltip) => (
          <motion.div
            key={tooltip.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`bg-gradient-to-r ${getBackgroundColor(tooltip.type)} backdrop-blur-sm rounded-xl p-4 border shadow-lg`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getIcon(tooltip.type)}
                <h3 className="font-semibold text-white text-sm">{tooltip.title}</h3>
              </div>
              <button
                onClick={() => removeTooltip(tooltip.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-gray-300 text-sm mb-3">{tooltip.message}</p>
            {tooltip.action && tooltip.onAction && (
              <button
                onClick={() => {
                  tooltip.onAction?.();
                  removeTooltip(tooltip.id);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                {tooltip.action}
              </button>
            )}
            {tooltip.duration && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-b-xl"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: tooltip.duration / 1000, ease: 'linear' }}
                onAnimationComplete={() => removeTooltip(tooltip.id)}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}