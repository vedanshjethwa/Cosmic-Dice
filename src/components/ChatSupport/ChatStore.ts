import { create } from 'zustand';
import { format } from 'date-fns';

export type MessageType = 'user' | 'bot' | 'system';
export type IssueType = 'wallet' | 'game' | 'technical' | 'other';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: string;
  helpful?: boolean;
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  selectedIssue: IssueType | null;
  ticketId: string | null;
  resolutionTime: Date | null;
  hasInteractedTwice: boolean;
  interactionCount: number;
  addMessage: (type: MessageType, content: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedIssue: (issue: IssueType) => void;
  markMessageHelpful: (id: string, helpful: boolean) => void;
  incrementInteraction: () => void;
  reset: () => void;
}

const generateTicketId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const ticketChars = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]);
  return `TKT-${ticketChars.join('')}`;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isOpen: false,
  selectedIssue: null,
  ticketId: null,
  resolutionTime: null,
  hasInteractedTwice: false,
  interactionCount: 0,
  addMessage: (type, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Math.random().toString(36).substring(7),
          type,
          content,
          timestamp: format(new Date(), 'HH:mm'),
        },
      ],
    })),
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedIssue: (issue) =>
    set({
      selectedIssue: issue,
      ticketId: generateTicketId(),
      resolutionTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    }),
  markMessageHelpful: (id, helpful) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, helpful } : msg
      ),
    })),
  incrementInteraction: () =>
    set((state) => ({
      interactionCount: state.interactionCount + 1,
      hasInteractedTwice: state.interactionCount >= 1,
    })),
  reset: () =>
    set({
      messages: [],
      selectedIssue: null,
      ticketId: null,
      resolutionTime: null,
      hasInteractedTwice: false,
      interactionCount: 0,
    }),
}));