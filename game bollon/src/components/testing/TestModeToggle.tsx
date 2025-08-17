import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestModeToggleProps {
  onActivate: (code: string) => void;
}

export function TestModeToggle({ onActivate }: TestModeToggleProps) {
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onActivate(code);
    setCode('');
    setShowInput(false);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-full top-0 mr-4 bg-[#1A2634] border border-blue-500/20 
              rounded-lg p-4 shadow-lg max-w-xs"
          >
            <p className="text-sm text-blue-400">
              Hidden feature unlocked! Keep playing and discover more secrets.
              ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInput ? (
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-[#1A2634] border-l border-t border-b border-blue-500/20 
              rounded-l-lg p-2 pr-4 shadow-lg"
          >
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              className="bg-transparent border border-blue-500/20 rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:border-blue-500/50 transition-colors text-white w-32"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-2
                hover:bg-blue-500/30 transition-colors"
            >
              <Star size={18} className="text-blue-400" />
            </motion.button>
          </motion.form>
        ) : (
          <motion.button
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInput(true)}
            className="bg-[#1A2634] border border-blue-500/20 rounded-l-lg p-3 shadow-lg
              transition-all duration-300 flex items-center justify-center"
          >
            <Star size={20} className="text-blue-400" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
