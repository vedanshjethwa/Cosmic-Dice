import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatStore } from './ChatStore';

export function ChatButton() {
  const { isOpen, setIsOpen } = useChatStore();

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-4 left-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all z-50"
    >
      <MessageCircle size={24} />
    </motion.button>
  );
}