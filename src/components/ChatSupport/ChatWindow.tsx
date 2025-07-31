import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, User, Bot, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from './ChatStore';

export function ChatWindow() {
  const { isOpen, setIsOpen, messages, addMessage } = useChatStore();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      setTimeout(() => {
        addMessage('bot', 'Hello! Welcome to Cosmic Gaming Support. How can I help you today?');
      }, 500);
    }
  }, [isOpen, messages.length, addMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    addMessage('user', userMessage);

    // Simulate typing
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Simple bot responses
      let botResponse = '';
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('balance') || lowerMessage.includes('wallet')) {
        botResponse = 'For wallet and balance issues, please check your account settings or contact our financial support team. Is there anything specific about your balance you need help with?';
      } else if (lowerMessage.includes('game') || lowerMessage.includes('play')) {
        botResponse = 'I can help you with game-related questions! Which game are you having trouble with? Our games include Cosmic RPS, Dice, Limbo, Snakes, Cards, Balloon, and more.';
      } else if (lowerMessage.includes('deposit') || lowerMessage.includes('withdraw')) {
        botResponse = 'For deposit and withdrawal assistance, please ensure you have completed account verification. Deposits are usually instant, while withdrawals may take 1-3 business days. Need help with a specific transaction?';
      } else if (lowerMessage.includes('bonus') || lowerMessage.includes('promo')) {
        botResponse = 'Check out our latest bonuses in the Offers section! We have welcome bonuses, daily rewards, and special promotions. Would you like me to guide you to the offers page?';
      } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        botResponse = 'I\'m here to help! You can ask me about games, account issues, payments, bonuses, or any other questions. What would you like assistance with?';
      } else {
        botResponse = 'Thank you for your message! Our support team will get back to you shortly. In the meantime, you can check our FAQ section or browse our help articles. Is there anything else I can help you with?';
      }
      
      addMessage('bot', botResponse);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
      className="fixed bottom-20 right-6 w-80 h-96 bg-[#132F4C] border border-blue-500/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-sm"
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-20 right-6 w-80 h-96 bg-[#0A1929] border border-blue-500/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
          className="px-4 py-4 cursor-move flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600"
            <MessageCircle className="w-5 h-5 text-white" />
            <div>
              <h3 className="text-white font-semibold">Live Support</h3>
              <p className="text-blue-100 text-xs">We're online now</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gray-600'
                }`}>
                  {message.type === 'user' ? (
                    <User size={12} className="text-white" />
                  ) : (
                    <Bot size={12} className="text-white" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                  <Bot size={12} className="text-white" />
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}