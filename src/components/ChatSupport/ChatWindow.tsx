import React, { useState, useRef, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  MessageCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
  X,
  Bot,
  Timer,
  User,
  Headphones,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore, type IssueType } from './ChatStore';

const QUICK_REPLIES = ['Thanks!', 'I need more help', 'Got it'];

const ISSUE_TYPES: { type: IssueType; label: string; description: string }[] = [
  {
    type: 'wallet',
    label: 'Wallet Issues',
    description: 'Deposits, withdrawals, or balance problems',
  },
  {
    type: 'game',
    label: 'Game Support',
    description: 'Game-related questions or technical issues',
  },
  {
    type: 'technical',
    label: 'Technical Support',
    description: 'Account access, bugs, or general technical help',
  },
  {
    type: 'other',
    label: 'Other Issues',
    description: 'Any other questions or concerns',
  },
];

export function ChatWindow() {
  const {
    messages,
    isOpen,
    selectedIssue,
    ticketId,
    resolutionTime,
    hasInteractedTwice,
    addMessage,
    setIsOpen,
    setSelectedIssue,
    markMessageHelpful,
    incrementInteraction,
    reset,
  } = useChatStore();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage('bot', 'Hello! Welcome to Cosmic Gaming Support. How can I help you today?');
    }
  }, [isOpen, messages.length, addMessage]);

  // Auto-responses for common questions
  const getAutoResponse = (userMessage: string): string | null => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('balance') || message.includes('wallet')) {
      return 'For wallet and balance issues, please check your transaction history in the wallet section. If you need further assistance, I can connect you with our financial support team.';
    }
    
    if (message.includes('game') && (message.includes('not working') || message.includes('bug'))) {
      return 'I understand you\'re experiencing game issues. Please try refreshing the page first. If the problem persists, our technical team can help you resolve this.';
    }
    
    if (message.includes('deposit') || message.includes('withdrawal')) {
      return 'For deposit and withdrawal assistance, please ensure you\'re using the correct payment methods. Processing times vary: deposits are instant, withdrawals take 24-48 hours.';
    }
    
    if (message.includes('bonus') || message.includes('promo')) {
      return 'You can find all available bonuses in the "Offers" section. Make sure to check the terms and conditions for each bonus before claiming.';
    }
    
    if (message.includes('account') || message.includes('login')) {
      return 'For account-related issues, please check your email for any verification messages. If you\'re still having trouble, I can help you with account recovery.';
    }
    
    return null;
  };
  const handleSend = () => {
    if (!input.trim()) return;

    addMessage('user', input);
    incrementInteraction();
    
    const userMessage = input;
    setInput('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      if (selectedIssue === 'other') {
        addMessage('bot', 'Thank you for your message. A live agent will assist you shortly. Please stay connected.');
      } else {
        const autoResponse = getAutoResponse(userMessage);
        if (autoResponse) {
          addMessage('bot', autoResponse);
        } else {
          addMessage('bot', 'Thank you for your message. Let me help you with that. Is there anything specific you\'d like to know more about?');
        }
      }
    }, 800 + Math.random() * 1200); // Random delay between 0.8-2s for more natural feel
  };

  const handleIssueSelect = (issue: IssueType) => {
    setSelectedIssue(issue);
    const issueLabels = {
      wallet: 'Wallet & Payment',
      game: 'Game Support',
      technical: 'Technical Support',
      other: 'General Support'
    };
    
    addMessage('system', `Support ticket created for ${issueLabels[issue]}. Ticket ID: ${ticketId}`);
    
    if (issue === 'other') {
      addMessage('bot', 'I\'ve connected you to our live support queue. An agent will be with you shortly. In the meantime, feel free to describe your issue.');
    } else {
      addMessage('bot', `I'm here to help with ${issueLabels[issue]}. Please describe your issue and I'll do my best to assist you.`);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    handleSend();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-4 w-80 sm:w-96 bg-[#0A1929] rounded-2xl shadow-xl border border-blue-500/20 overflow-hidden z-50 max-h-[80vh] sm:chat-window-mobile"
        >
          {/* Header */}
          <div className="p-4 border-b border-blue-500/20 flex items-center justify-between bg-[#132F4C]">
            <div className="flex items-center gap-2">
              <MessageCircle className="text-blue-400" />
              <h3 className="font-semibold text-white">Live Support</h3>
              {selectedIssue && (
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                  {ticketId}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div
            ref={chatWindowRef}
            className="h-[300px] sm:h-[400px] overflow-y-auto p-4 space-y-4"
          >
            {!selectedIssue ? (
              <div className="space-y-4">
                <div className="text-gray-300 text-center mb-4">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="font-medium">How can we help you today?</p>
                  <p className="text-sm text-gray-400">Select a category to get started</p>
                </div>
                {ISSUE_TYPES.map((issue) => (
                  <button
                    key={issue.type}
                    onClick={() => handleIssueSelect(issue.type)}
                    className="w-full p-3 bg-blue-900/20 rounded-lg hover:bg-blue-900/30 transition-colors text-left border border-blue-500/10 hover:border-blue-500/30"
                  >
                    <div className="font-medium text-white text-sm">{issue.label}</div>
                    <div className="text-sm text-gray-400">
                      {issue.description}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : message.type === 'system'
                          ? 'bg-gray-800 text-gray-300'
                          : 'bg-[#132F4C] text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.type === 'user' ? (
                          <User size={16} />
                        ) : message.type === 'bot' ? (
                          <Bot size={16} />
                        ) : (
                          <Timer size={16} />
                        )}
                        <span className="text-xs opacity-75">
                          {message.timestamp}
                        </span>
                      </div>
                      <p>{message.content}</p>
                      {message.type === 'bot' && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => markMessageHelpful(message.id, true)}
                            className={`p-1 rounded ${
                              message.helpful === true
                                ? 'text-green-400'
                                : 'text-gray-400 hover:text-green-400'
                            }`}
                          >
                            <ThumbsUp size={14} />
                          </button>
                          <button
                            onClick={() => markMessageHelpful(message.id, false)}
                            className={`p-1 rounded ${
                              message.helpful === false
                                ? 'text-red-400'
                                : 'text-gray-400 hover:text-red-400'
                            }`}
                          >
                            <ThumbsDown size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Bot size={16} />
                    <div className="animate-pulse">Typing...</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          {selectedIssue && (
            <div className="p-4 border-t border-blue-500/20">
              {selectedIssue !== 'other' && (
                <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1 bg-blue-900/20 rounded-full text-sm text-blue-400 hover:bg-blue-900/30 transition-colors whitespace-nowrap"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-black/50 text-white border border-blue-500/30 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Live Agent Button */}
          {hasInteractedTwice && selectedIssue !== 'other' && (
            <div className="p-4 border-t border-blue-500/20">
              <button
                onClick={() => {
                  setSelectedIssue('other');
                  addMessage('system', 'Connecting to a live agent...');
                  setTimeout(() => {
                    addMessage('bot', 'You are now connected to our live support team. An agent will respond shortly.');
                  }, 1000);
                }}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Headphones size={16} />
                <span>Connect to Live Agent</span>
              </button>
            </div>
          )}

          {/* Quick Actions for specific issues */}
          {selectedIssue === 'wallet' && (
            <div className="p-4 border-t border-blue-500/20">
              <div className="text-xs text-gray-400 mb-2">Quick Actions:</div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleQuickReply('Check my transaction history')}
                  className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-lg text-xs hover:bg-blue-900/30 transition-colors"
                >
                  Transaction History
                </button>
                <button
                  onClick={() => handleQuickReply('Deposit not showing')}
                  className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-lg text-xs hover:bg-blue-900/30 transition-colors"
                >
                  Deposit Issue
                </button>
              </div>
            </div>
          )}

          {selectedIssue === 'game' && (
            <div className="p-4 border-t border-blue-500/20">
              <div className="text-xs text-gray-400 mb-2">Quick Actions:</div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleQuickReply('Game is not loading')}
                  className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-lg text-xs hover:bg-blue-900/30 transition-colors"
                >
                  Loading Issue
                </button>
                <button
                  onClick={() => handleQuickReply('Game crashed')}
                  className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-lg text-xs hover:bg-blue-900/30 transition-colors"
                >
                  Game Crash
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 bg-blue-900/20 rounded-full text-sm text-blue-400 hover:bg-blue-900/30 transition-colors whitespace-nowrap"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-black/50 text-white border border-blue-500/30 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Live Agent Button */}
          {hasInteractedTwice && (
            <div className="p-4 border-t border-blue-500/20">
              <button
                onClick={() => {
                  addMessage('system', 'Connecting to a live agent...');
                  setTimeout(() => {
                    addMessage('bot', 'A live agent will be with you shortly.');
                  }, 1000);
                }}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Headphones size={18} />
                <span>Talk to Live Agent</span>
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}