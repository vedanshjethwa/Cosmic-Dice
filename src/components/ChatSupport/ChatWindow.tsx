import React from 'react';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Chat Support</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Chat support is currently unavailable. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;