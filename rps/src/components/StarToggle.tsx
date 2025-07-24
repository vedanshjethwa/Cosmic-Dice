import React, { useState, useCallback } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ======================== Types ========================
interface StarState {
  glowing: boolean;
  tapCount: number;
  showInput: boolean;
  showMessage: boolean;
  testMode: 'none' | 'high' | 'medium';
}

export type TestCode = {
  code: string;
  winRate: number;
};

export const TEST_CODES: TestCode[] = [
  { code: 'vedansh111', winRate: 85 },
  { code: 'cosmic111', winRate: 65 }
];

interface BetTier {
  amount: number;
  winChance: number;
}

const BET_TIERS: BetTier[] = [
  { amount: 1, winChance: 50 },
  { amount: 10, winChance: 40 },
  { amount: 20, winChance: 30 },
  { amount: 40, winChance: 25 },
  { amount: 80, winChance: 20 },
  { amount: 160, winChance: 15 },
  { amount: 320, winChance: 12 },
  { amount: 640, winChance: 10 },
  { amount: 1280, winChance: 8 },
  { amount: 2560, winChance: 6 },
  { amount: 5120, winChance: 5 },
  { amount: 10240, winChance: 4 },
  { amount: 20480, winChance: 3 },
  { amount: 40960, winChance: 2.5 },
  { amount: 81920, winChance: 0.82 },
  { amount: 100000, winChance: 0.1 }
];

// ======================== Utility Functions ========================
function calculateWinChance(betAmount: number, testWinRate: number | null = null): number {
  if (testWinRate !== null) {
    return testWinRate;
  }
  
  const tier = BET_TIERS.find((t, i) => 
    betAmount <= t.amount || i === BET_TIERS.length - 1
  );
  return (tier?.winChance || 0.01) / 100;
}

// ======================== Custom Hook ========================
interface UseStarStateProps {
  onActivate: (winRate: number) => void;
}

const INITIAL_STATE: StarState = {
  glowing: false,
  tapCount: 0,
  showInput: false,
  showMessage: false,
  testMode: 'none'
};

function useStarState({ onActivate }: UseStarStateProps) {
  const [state, setState] = useState<StarState>(INITIAL_STATE);

  const handleTap = useCallback(() => {
    setState(prev => {
      const newTapCount = prev.tapCount + 1;
      const showInput = newTapCount >= 7; // Show input after 7 taps
      return {
        ...prev,
        glowing: true,
        tapCount: newTapCount,
        showInput: showInput,
        showMessage: false // Hide message when tapping
      };
    });
  }, []);

  const handleSubmit = useCallback((winRate: number) => {
    onActivate(winRate);
    setState(prev => ({
      ...prev,
      showInput: false,
      showMessage: true,
      testMode: winRate > 0.8 ? 'high' : 'medium'
    }));
    setTimeout(() => {
      setState(prev => ({ ...prev, showMessage: false }));
    }, 3000);
  }, [onActivate]);

  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    handleTap,
    handleSubmit,
    resetState
  };
}

// ======================== StarToggle Component ========================
interface StarToggleProps {
  onActivate: (winRate: number) => void;
}

export function StarToggle({ onActivate }: StarToggleProps) {
  const [code, setCode] = useState('');
  const { state, handleTap, handleSubmit, resetState } = useStarState({
    onActivate: (winRate) => {
      onActivate(winRate);
      setCode('');
    }
  });

  const validateCode = useCallback((inputCode: string) => {
    const matchedCode = TEST_CODES.find(tc => tc.code === inputCode);
    return matchedCode?.winRate || 0;
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const winRate = validateCode(code);
    if (winRate) {
      const calculatedWinRate = calculateWinChance(winRate * 100, winRate); // Use calculateWinChance here
      handleSubmit(calculatedWinRate);
    } else {
      resetState();
    }
  };

  return (
    <>
      <AnimatePresence>
        {state.showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-20 right-4 bg-[#1A2634] border border-blue-500/20 
              rounded-lg p-4 shadow-lg max-w-xs z-50"
          >
            <p className="text-sm text-blue-400">
              Hidden feature unlocked! Keep playing and discover more secrets. ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4">
        <AnimatePresence>
          {state.showInput ? (
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={handleFormSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                className="bg-[#1A2634] border border-blue-500/20 rounded-lg px-3 py-2 text-sm
                  focus:outline-none focus:border-blue-500/50 transition-colors text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2
                  hover:bg-blue-500/20 transition-colors"
              >
                <Star 
                  size={16} 
                  className={`${state.glowing ? 'text-blue-400 animate-glow' : 'text-gray-400'}`}
                />
              </motion.button>
            </motion.form>
          ) : (
            <motion.button
              initial={{ opacity: 0.2 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTap}
              className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2
                transition-all duration-300"
            >
              <Star 
                size={16} 
                className={`${state.glowing ? 'text-blue-400 animate-glow' : 'text-gray-400'}`}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}