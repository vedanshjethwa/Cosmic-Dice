import React, { useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';

const MessageLog: React.FC = () => {
  const { state } = useGame();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messageLog]);

  return (
    <div className="bg-gray-900 border-t border-amber-600 text-gray-300 p-4 h-[150px] overflow-y-auto fixed bottom-0 w-full z-10">
      <div className="space-y-1">
        {state.messageLog.map((message, index) => (
          <p key={index} className="leading-tight">
            <span className="text-amber-400">»</span> {message}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageLog;