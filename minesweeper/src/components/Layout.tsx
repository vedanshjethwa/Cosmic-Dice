import React from 'react';
import { Activity, Wallet } from 'lucide-react';

interface LayoutProps {
  balance: number;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ balance, children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 relative">
        <div className="max-w-3xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Prediction Pulse
            </h1>
          </div>
          <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
            <Wallet className="w-5 h-5 text-blue-400 mr-2" />
            <span className="font-bold">${balance}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />
      </header>
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 space-y-6">
        {children}
      </main>
    </div>
  );
}

export default Layout