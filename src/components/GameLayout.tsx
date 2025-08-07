import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface GameLayoutProps {
  gameType: string;
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function GameLayout({ gameType, children, sidebarOpen, setSidebarOpen }: GameLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath={`/game/${gameType.toLowerCase()}`}
      />

      {/* Main Content */}
      <div className="w-full h-screen">
        {children}
      </div>
    </div>
  );
}