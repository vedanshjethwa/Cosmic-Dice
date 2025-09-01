import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/auth/AuthGuard';
import { GameGuard } from './components/game/GameGuard';
import { LoadingScreen } from './components/LoadingScreen';
import { Sidebar } from './components/Sidebar';

// Import page components
import { HomePage } from './components/pages/HomePage';
import { AllGamesPage } from './components/pages/AllGamesPage';
import { PopularPage } from './components/pages/PopularPage';
import { OffersPage } from './components/pages/OffersPage';
import NewGamesPage from './components/pages/NewGamesPage';
import { UpcomingGamesPage } from './components/pages/UpcomingGamesPage';
import { AboutPage } from './components/pages/AboutPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { TransactionsPage } from './components/pages/TransactionsPage';
import { WalletPage } from './components/pages/WalletPage';
import { DepositPage } from './components/pages/DepositPage';
import { GameDetailPage } from './components/pages/GameDetailPage';
import FeedbackPage from './components/FeedbackPage';
import { AffiliateProgramPage } from './components/pages/AffiliateProgramPage';
import { VaultGuidePage } from './components/pages/VaultGuidePage';
import { BettingGuidePage } from './components/pages/BettingGuidePage';
import { HowToGuidesPage } from './components/pages/HowToGuidesPage';
import { CasinoGuidePage } from './components/pages/CasinoGuidePage';
import { ResponsibleGamingPage } from './components/pages/ResponsibleGamingPage';
import { SecurityTipsPage } from './components/pages/SecurityTipsPage';
import { PaymentMethodsPage } from './components/pages/PaymentMethodsPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/pages/TermsOfServicePage';
import { SupportPage } from './components/pages/SupportPage';
import { CalculatorPage } from './components/pages/CalculatorPage';
import { WithdrawalPage } from './components/WithdrawalPage';
import { ProfilePage } from './components/ProfilePage';
import { NotificationsPage } from './components/pages/NotificationsPage';
import { GlobalRecentBets } from './components/shared/GlobalRecentBets';

// Import game components
import { GameLayout } from './components/game/GameLayout';
import RPSGame from './components/games/RPSGame';
import DiceGame from './components/games/DiceGame';
import LimboGame from './components/games/LimboGame';
import SnakesGame from './components/games/SnakesGame';
import CardGame from './components/games/CardGame';
import BalloonGame from './components/games/BalloonGame';
import MinesweeperGame from './components/games/MinesweeperGame';
import TossGame from './components/games/TossGame';
import PredictionPulseGame from './components/games/PredictionPulseGame';

// Chat support
import ChatWindow from './components/ChatSupport/ChatWindow';
import { ChatButton } from './components/ChatSupport/ChatButton';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen message="Loading Cosmic Casino..." />;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
        {/* Global Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onWalletClick={() => {}}
          onWithdrawalClick={() => {}}
          onDepositClick={() => {}}
          currentPath={window.location.pathname}
        />

        {/* Main Content with Sidebar Offset */}
        <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes - No Auth Required */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/responsible-gaming" element={<ResponsibleGamingPage />} />
            <Route path="/security-tips" element={<SecurityTipsPage />} />
            <Route path="/payment-methods" element={<PaymentMethodsPage />} />

            {/* Protected Routes - Auth Required */}
            <Route path="/" element={
                <HomePage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            
            <Route path="/bonuses" element={
              <OffersPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />

            {/* Game Routes - Auth + Balance Required */}
            <Route path="/game/rps" element={
              <GameLayout gameTitle="Cosmic RPS" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <RPSGame />
              </GameLayout>
            } />
            <Route path="/game/dice" element={
              <GameLayout gameTitle="Cosmic Dice" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <DiceGame />
              </GameLayout>
            } />
            <Route path="/game/limbo" element={
              <GameLayout gameTitle="Cosmic Limbo" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <LimboGame />
              </GameLayout>
            } />
            <Route path="/game/snakes" element={
              <GameLayout gameTitle="Cosmic Snakes" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <SnakesGame />
              </GameLayout>
            } />
            <Route path="/game/card" element={
              <GameLayout gameTitle="Cosmic Cards" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <CardGame />
              </GameLayout>
            } />
            <Route path="/game/balloon" element={
              <GameLayout gameTitle="Cosmic Balloon" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <BalloonGame />
              </GameLayout>
            } />
            <Route path="/game/minesweeper" element={
              <GameLayout gameTitle="Cosmic Minesweeper" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <MinesweeperGame />
              </GameLayout>
            } />
            <Route path="/game/toss" element={
              <GameLayout gameTitle="Cosmic Heads & Tails" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <TossGame />
              </GameLayout>
            } />
            <Route path="/game/prediction-pulse" element={
              <GameLayout gameTitle="Prediction Pulse" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                <PredictionPulseGame />
              </GameLayout>
            } />

            {/* User Dashboard Routes - Auth Required */}
            <Route path="/all-games" element={
              <AllGamesPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/popular" element={
              <PopularPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/offers" element={
              <OffersPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/new-games" element={
              <NewGamesPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/upcoming" element={
              <UpcomingGamesPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/settings" element={
              <SettingsPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/transactions" element={
              <TransactionsPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/wallet" element={
              <WalletPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/deposit" element={
              <DepositPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/withdrawal" element={
              <WithdrawalPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/feedback" element={
              <FeedbackPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/game-detail/:gameId" element={
              <GameDetailPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/profile" element={
              <ProfilePage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            
            {/* Info Pages - Auth Required */}
            <Route path="/affiliate-program" element={
              <AffiliateProgramPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/vault-guide" element={
              <VaultGuidePage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/betting-guide" element={
              <BettingGuidePage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/how-to-guides" element={
              <HowToGuidesPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/bonuses" element={
              <OffersPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/casino-guide" element={
              <CasinoGuidePage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/support" element={
              <SupportPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
            <Route path="/calculator" element={
              <CalculatorPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            } />
          </Routes>
        </AnimatePresence>
        </div>

        {/* Chat Support - Available after auth */}
        <ChatButton />
        <ChatWindow />
      </div>
    </AuthProvider>
  );
}

export default App;