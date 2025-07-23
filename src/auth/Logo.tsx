import React from 'react';
import { Rocket } from 'lucide-react';

export function Logo() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div
      className="flex items-center justify-center mb-8 cursor-pointer"
      onClick={handleRefresh}
    >
      <Rocket className="w-12 h-12 text-red-500" />
      <h1
        className="ml-3 text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        COSMIC
      </h1>
    </div>
  );
}
