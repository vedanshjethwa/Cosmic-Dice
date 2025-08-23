import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/auth/AuthGuard';
import { GameGuard } from './components/game/GameGuard';
import { LoadingScreen } from './components/LoadingScreen';

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
                <HomePage />
            } />
            
            <Route path="/bonuses" element={
              <OffersPage />
            } />

            {/* Game Routes - Auth + Balance Required */}
            <Route path="/game/rps" element={
              <GameLayout gameTitle="Cosmic RPS">
                <RPSGame />
              </GameLayout>
            } />
            <Route path="/game/dice" element={
              <GameLayout gameTitle="Cosmic Dice">
                <DiceGame />
              </GameLayout>
            } />
            <Route path="/game/limbo" element={
              <GameLayout gameTitle="Cosmic Limbo">
                <LimboGame />
              </GameLayout>
            } />
            <Route path="/game/snakes" element={
              <GameLayout gameTitle="Cosmic Snakes">
                <SnakesGame />
              </GameLayout>
            } />
            <Route path="/game/card" element={
              <GameLayout gameTitle="Cosmic Cards">
                <CardGame />
              </GameLayout>
            } />
            <Route path="/game/balloon" element={
              <GameLayout gameTitle="Cosmic Balloon">
                <BalloonGame />
              </GameLayout>
            } />
            <Route path="/game/minesweeper" element={
              <GameLayout gameTitle="Cosmic Minesweeper">
                <MinesweeperGame />
              </GameLayout>
            } />
            <Route path="/game/toss" element={
              <GameLayout gameTitle="Cosmic Heads & Tails">
                <TossGame />
              </GameLayout>
            } />
            <Route path="/game/prediction-pulse" element={
              <GameLayout gameTitle="Prediction Pulse">
                <PredictionPulseGame />
              </GameLayout>
            } />

            {/* User Dashboard Routes - Auth Required */}
            <Route path="/all-games" element={
              <AllGamesPage />
            } />
            <Route path="/popular" element={
              <PopularPage />
            } />
            <Route path="/offers" element={
              <OffersPage />
            } />
            <Route path="/new-games" element={
              <NewGamesPage />
            } />
            <Route path="/upcoming" element={
              <UpcomingGamesPage />
            } />
            <Route path="/settings" element={
              <SettingsPage />
            } />
            <Route path="/transactions" element={
              <TransactionsPage />
            } />
            <Route path="/wallet" element={
              <WalletPage />
            } />
            <Route path="/deposit" element={
              <DepositPage />
            } />
            <Route path="/withdrawal" element={
              <WithdrawalPage />
            } />
            <Route path="/feedback" element={
              <FeedbackPage />
            } />
            <Route path="/game-detail/:gameId" element={
              <GameDetailPage />
            } />
            <Route path="/profile" element={
              <ProfilePage />
            } />
            
            {/* Info Pages - Auth Required */}
            <Route path="/affiliate-program" element={
              <AffiliateProgramPage />
            } />
            <Route path="/vault-guide" element={
              <VaultGuidePage />
            } />
            <Route path="/betting-guide" element={
              <BettingGuidePage />
            } />
            <Route path="/how-to-guides" element={
              <HowToGuidesPage />
            } />
            <Route path="/bonuses" element={
              <OffersPage />
            } />
            <Route path="/casino-guide" element={
              <CasinoGuidePage />
            } />
            <Route path="/support" element={
              <SupportPage />
            } />
            <Route path="/calculator" element={
              <CalculatorPage />
            } />
          </Routes>
        </AnimatePresence>

        {/* Chat Support - Available after auth */}
        <ChatButton />
        <ChatWindow />
      </div>
    </AuthProvider>
  );
}

export default App;