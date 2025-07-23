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

  const handleSend = () => {
    if (!input.trim() || selectedIssue === 'other') return;

    addMessage('user', input);
    incrementInteraction();
    setInput('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('bot', 'Thank you for your message. Our support team will assist you shortly.');
    }, 1000);
  };

  const handleIssueSelect = (issue: IssueType) => {
    setSelectedIssue(issue);
    addMessage('system', `Ticket ${ticketId} created for ${issue} support.`);
    if (issue === 'other') {
      addMessage('bot', 'Please wait for a live agent to assist you.');
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
          className="fixed bottom-24 right-4 w-96 bg-[#0A1929] rounded-2xl shadow-xl border border-blue-500/20 overflow-hidden z-50"
        >
          {/* Header */}
          <div className="p-4 border-b border-blue-500/20 flex items-center justify-between bg-[#132F4C]">
            <div className="flex items-center gap-2">
              <MessageCircle className="text-blue-400" />
              <h3 className="font-semibold text-white">Live Support</h3>
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
            className="h-[400px] overflow-y-auto p-4 space-y-4"
          >
            {!selectedIssue ? (
              <div className="space-y-4">
                <div className="text-gray-400">Please select your issue:</div>
                {ISSUE_TYPES.map((issue) => (
                  <button
                    key={issue.type}
                    onClick={() => handleIssueSelect(issue.type)}
                    className="w-full p-4 bg-blue-900/20 rounded-lg hover:bg-blue-900/30 transition-colors text-left"
                  >
                    <div className="font-medium text-white">{issue.label}</div>
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
          {selectedIssue && selectedIssue !== 'other' && (
            <div className="p-4 border-t border-blue-500/20">
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