import React, { useState, useCallback } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarState {
  glowing: boolean;
  tapCount: number;
  showInput: boolean;
  showMessage: boolean;
}

interface StarToggleProps {
  onDevModeEnabled: (wallet: string) => void;
}

const TEST_WALLETS = {
  'vedansh111': 0.85,
  'cosmic111': 0.65,
  'cosmicwin777': 0.50
};

function useStarState({ onDevModeEnabled }: StarToggleProps) {
  const [state, setState] = useState<StarState>({
    glowing: false,
    tapCount: 0,
    showInput: false,
    showMessage: false
  });

  const handleTap = useCallback(() => {
    setState(prev => ({
      ...prev,
      glowing: true,
      tapCount: prev.tapCount + 1,
      showInput: prev.tapCount + 1 >= 7
    }));
  }, []);

  const handleSubmit = useCallback((wallet: string) => {
    onDevModeEnabled(wallet);
    setState(prev => ({
      ...prev,
      showInput: false,
      showMessage: true
    }));
    setTimeout(() => {
      setState(prev => ({ ...prev, showMessage: false }));
    }, 3000);
  }, [onDevModeEnabled]);

  const resetState = useCallback(() => {
    setState({
      glowing: false,
      tapCount: 0,
      showInput: false,
      showMessage: false
    });
  }, []);

  return {
    state,
    handleTap,
    handleSubmit,
    resetState
  };
}

export function StarToggle({ onDevModeEnabled }: StarToggleProps) {
  const [code, setCode] = useState('');
  const { state, handleTap, handleSubmit, resetState } = useStarState({
    onDevModeEnabled: (wallet) => {
      onDevModeEnabled(wallet);
      setCode('');
    }
  });

  const validateCode = useCallback((inputCode: string) => {
    return TEST_WALLETS.hasOwnProperty(inputCode) ? inputCode : null;
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wallet = validateCode(code);
    if (wallet) {
      handleSubmit(wallet);
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
            className="fixed bottom-20 right-4 bg-black/30 border border-blue-500/20 
              rounded-lg p-4 shadow-lg max-w-xs z-50 backdrop-blur-sm"
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
                className="bg-black/30 border border-blue-500/20 rounded-lg px-3 py-2 text-sm
                  focus:outline-none focus:border-blue-500/50 transition-colors text-white backdrop-blur-sm"
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