import React from 'react';

interface ToggleAuthProps {
  isLogin: boolean;
  onToggle: () => void;
}

export function ToggleAuth({ isLogin, onToggle }: ToggleAuthProps) {
  return (
    <div className="mt-6 text-center">
      <button
        onClick={onToggle}
        className="text-red-400 hover:text-red-300 transition-colors"
      >
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
}