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
      className="chat-button w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
    >
      <MessageCircle />
    </motion.button>
  );
}