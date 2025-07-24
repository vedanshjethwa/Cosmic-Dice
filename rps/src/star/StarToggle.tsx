import React, { useState, useCallback } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarState {
  glowing: boolean;
  tapCount: number;
  showInput: boolean;
  showMessage: boolean;
  testMode: 'none' | 'high' | 'medium' | 'normal';
}

export type TestCode = {
  code: string;
  winRate: number;
};

export const TEST_CODES: TestCode[] = [
  { code: 'vedansh111', winRate: 0.85 },
  { code: 'cosmic111', winRate: 0.65 },
  { code: 'cosmicwin777', winRate: 0.50 }
];

interface StarToggleProps {
  onActivate: (winRate: number) => void;
}

export function StarToggle({ onActivate }: StarToggleProps) {
  const [code, setCode] = useState('');
  const [state, setState] = useState<StarState>({
    glowing: false,
    tapCount: 0,
    showInput: false,
    showMessage: false,
    testMode: 'none'
  });

  const handleTap = useCallback(() => {
    setState(prev => ({
      ...prev,
      glowing: true,
      tapCount: prev.tapCount + 1,
      showInput: prev.tapCount + 1 >= 7
    }));
  }, []);

  const handleSubmit = useCallback((winRate: number) => {
    onActivate(winRate);
    setState(prev => ({
      ...prev,
      showInput: false,
      showMessage: true,
      testMode: winRate > 0.8 ? 'high' : winRate > 0.6 ? 'medium' : 'normal'
    }));
    setTimeout(() => {
      setState(prev => ({ ...prev, showMessage: false }));
    }, 3000);
  }, [onActivate]);

  const validateCode = useCallback((inputCode: string) => {
    const matchedCode = TEST_CODES.find(tc => tc.code === inputCode);
    return matchedCode?.winRate || 0;
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const winRate = validateCode(code);
    if (winRate) {
      handleSubmit(winRate);
      setCode('');
    } else {
      setState({
        glowing: false,
        tapCount: 0,
        showInput: false,
        showMessage: false,
        testMode: 'none'
      });
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