import React from 'react';
import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

interface AuthContainerProps {
  children: ReactNode;
  onBack: () => void;
}

export function AuthContainer({ children, onBack }: AuthContainerProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900 via-black to-black animate-pulse" />
      
      {/* Gaming background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80')",
        }}
      />
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-white flex items-center gap-2 hover:text-red-500 transition-colors z-20"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Back</span>
      </button>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 shadow-2xl shadow-red-500/10">
          {children}
        </div>
      </div>
    </div>
  );
}