import React from 'react';
import { borders } from '../styles/borders';

interface TooltipProps {
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return (
    <div className={`absolute z-10 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg mt-2 ${borders.primary}`}>
      {children}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 transform rotate-45 border-t border-l border-blue-500/20" />
    </div>
  );
};