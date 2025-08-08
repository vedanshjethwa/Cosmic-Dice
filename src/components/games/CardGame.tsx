import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { TransactionService } from '../transactions/TransactionService';

type RiskLevel = 'low' | 'medium' | 'high';

interface RiskConfig {
  multiplier: number;
  winningCardCount: number;
  totalCards: number;
  label: string;
  description: string;
  bgColor: string;
  hoverColor: string;
}

interface GamePlay {
  betAmount: number;
  multiplier: number;
  result: 'win' | 'lose';
  profit: number;
  timestamp: number;
  cardNumber: number;
  riskLevel: RiskLevel;
}

const RISK_CONFIGS: Record<RiskLevel, RiskConfig> = {
  low: { 
    multiplier: 5, 
    winningCardCount: 4,
    totalCards: 10,
    label: 'Low Risk',
    description: '4 winning cards',
    bgColor: 'bg-gradient-to-r from-emerald-500 to-green-500',
    hoverColor: 'hover:from-emerald-600 hover:to-green-600'
  },
  medium: { 
    multiplier: 10, 
    winningCardCount: 2,
    totalCards: 10,
    label: 'Medium Risk',
    description: '2 winning cards',
    bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    hoverColor: 'hover:from-blue-600 hover:to-indigo-600'
  },
  high: { 
    multiplier: 20, 
    winningCardCount: 1,
    totalCards: 15,
    label: 'High Risk',
    description: '1 winning card',
    bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    hoverColor: 'hover:from-purple-600 hover:to-pink-600'
  }
};

export default function CardGame() {
  const { user, wallet, refreshWallet } = useAuth();
  const [betAmount, setBetAmount] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel>('low');
  const [winningCards, setWinningCards] = useState<number[]>([]);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  const [recentPlays, setRecentPlays] = useState<GamePlay[]>([]);
  const [stats, setStats] = useState({
    totalProfit: 0,
    wins: 0,
    losses: 0
  });
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [flippingCard, setFlippingCard] = useState<number | null>(null);
  const [showCardContent, setShowCardContent] = useState<number | null>(null);

  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  const generateWinningCards = (risk: RiskLevel) => {
    const cards = new Set<number>();
    const targetCount = RISK_CONFIGS[risk].winningCardCount;
    
    while (cards.size < targetCount) {
      cards.add(Math.floor(Math.random() * RISK_CONFIGS[risk].totalCards));
    }
    return Array.from(cards);
  };

  const handleBetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) {
      const value = e.target.value.replace(/^0+/, '');
      if (value === '' || /^\d+$/.test(value)) {
        setBetAmount(value);
      }
    }
  };

  const handleBetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(betAmount);
    if (amount <= 0 || amount > currentBalance) return;
    
    setWinningCards(generateWinningCards(selectedRisk));
    setIsPlaying(true);
    setRevealedCards([]);
    setGameResult(null);
    setFlippingCard(null);
    setShowCardContent(null);
  };

  const handleCardClick = async (index: number) => {
    if (!isPlaying || selectedCard !== null || flippingCard !== null) return;
    
    setSelectedCard(index);
    setFlippingCard(index);
    
    // Start flip animation after 1 second delay
    setTimeout(() => {
      setFlippingCard(null);
      setShowCardContent(index);
      
      // Reveal all cards after flip animation
      setTimeout(async () => {
        const allCards = Array.from({ length: RISK_CONFIGS[selectedRisk].totalCards }, (_, i) => i);
        setRevealedCards(allCards);
        
        const amount = Number(betAmount);
        const multiplier = RISK_CONFIGS[selectedRisk].multiplier;
        const isWinning = winningCards.includes(index);
        const winAmount = isWinning ? amount * multiplier : 0;
        
        // Process game result through TransactionService
        if (user) {
          try {
            await TransactionService.processGameResult(user.id, amount, winAmount, {
              gameType: 'cards',
              selectedCard: index,
              riskLevel: selectedRisk,
              isWin: isWinning
            });
            refreshWallet();
          } catch (error) {
            console.error('Error processing game result:', error);
          }
        }
        
        setGameResult(isWinning ? 'win' : 'lose');
        
        setStats(prev => ({
          totalProfit: prev.totalProfit + (isWinning ? winAmount - amount : -amount),
          wins: prev.wins + (isWinning ? 1 : 0),
          losses: prev.losses + (isWinning ? 0 : 1)
        }));

        const newPlay: GamePlay = {
          betAmount: amount,
          multiplier: multiplier,
          result: isWinning ? 'win' : 'lose',
          profit: isWinning ? winAmount - amount : -amount,
          timestamp: Date.now(),
          cardNumber: index + 1,
          riskLevel: selectedRisk
        };
        setRecentPlays(prev => [newPlay, ...prev].slice(0, 10));

        setTimeout(() => {
          resetGame();
        }, 4000);
      }, 300);
    }, 1000);
  };

  const resetGame = () => {
    setSelectedCard(null);
    setBetAmount('');
    setIsPlaying(false);
    setGameResult(null);
    setWinningCards([]);
    setRevealedCards([]);
    setFlippingCard(null);
    setShowCardContent(null);
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
            Pick Your Card
          </h2>
          <p className="text-cyan-200/80">Choose wisely. One card holds your fortune.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Risk Selection */}
          <div className="lg:col-span-3 lg:order-3 order-1">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 rounded-xl p-6 panel-border backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="text-cyan-400" />
                <h3 className="text-lg font-semibold">Select Risk Level</h3>
              </div>
              <div className="space-y-3">
                {(Object.entries(RISK_CONFIGS) as [RiskLevel, RiskConfig][]).map(([risk, config]) => (
                  <button
                    key={risk}
                    disabled={isPlaying}
                    onClick={() => !isPlaying && setSelectedRisk(risk)}
                    className={`w-full p-4 rounded-xl transition-all duration-300 transform
                      ${isPlaying ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105'}
                      ${selectedRisk === risk
                        ? `${config.bgColor} shadow-lg shadow-${risk}-500/30 border border-white/20`
                        : 'bg-gradient-to-br from-blue-950/60 to-purple-950/40 hover:from-blue-900/60 hover:to-purple-900/40 border border-blue-500/20'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        <div className="font-semibold text-lg">{config.label}</div>
                        <div className="text-sm text-cyan-200/80">{config.description}</div>
                      </div>
                      <div className="text-2xl font-bold">{config.multiplier}x</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Plays */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 rounded-xl p-6 panel-border mt-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Plays</h3>
              <div className="recent-plays space-y-3">
                {recentPlays.length === 0 ? (
                  <div className="text-cyan-200/60 text-sm text-center py-4">
                    Your game history will appear here
                  </div>
                ) : (
                  recentPlays.map((play, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-blue-950/60 to-purple-950/40 rounded-lg p-3 transition-all hover:from-blue-900/60 hover:to-purple-900/40 border border-blue-500/10"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-semibold">
                          {play.result === 'win' ? '🎉' : '💔'} Card #{play.cardNumber}
                        </div>
                        <div className={`font-bold ${play.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {play.profit >= 0 ? '+' : ''}₹{play.profit.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-cyan-200/80">
                        <div>{RISK_CONFIGS[play.riskLevel].label}</div>
                        <div>₹{play.betAmount.toLocaleString()} bet</div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-6 lg:order-2 order-2">
            <div className={`grid grid-cols-5 gap-3 ${selectedRisk === 'high' ? 'grid-rows-3' : 'grid-rows-2'}`}>
              {Array(RISK_CONFIGS[selectedRisk].totalCards).fill(null).map((_, index) => {
                const isWinning = winningCards.includes(index);
                const amount = Number(betAmount);
                const winAmount = amount * RISK_CONFIGS[selectedRisk].multiplier;
                const isRevealed = revealedCards.includes(index);
                const isSelected = selectedCard === index;
                const isFlipping = flippingCard === index;
                const showContent = showCardContent === index;
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleCardClick(index)}
                    disabled={!isPlaying || selectedCard !== null || flippingCard !== null}
                    className={`aspect-[3/4] rounded-xl transition-all duration-300 relative overflow-hidden
                      ${!isRevealed && selectedCard === null && isPlaying ? 'card-hover' : ''}
                      ${!isPlaying ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      flex items-center justify-center text-lg sm:text-xl font-bold
                      backdrop-blur-sm border-2`}
                    whileHover={!isRevealed && selectedCard === null && isPlaying ? { scale: 1.05, y: -4 } : {}}
                    whileTap={!isRevealed && selectedCard === null && isPlaying ? { scale: 0.95 } : {}}
                  >
                    <AnimatePresence mode="wait">
                      {isFlipping ? (
                        <motion.div
                          key="flipping"
                          initial={{ rotateY: 0 }}
                          animate={{ rotateY: 180 }}
                          exit={{ rotateY: 180 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 to-orange-500/20 
                            border-yellow-400/40 rounded-xl flex items-center justify-center"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <div className="text-yellow-400 font-bold text-xl">✨</div>
                        </motion.div>
                      ) : isRevealed ? (
                        <motion.div
                          key="revealed"
                          initial={{ rotateY: 180, opacity: 0 }}
                          animate={{ rotateY: 0, opacity: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className={`absolute inset-0 rounded-xl flex items-center justify-center text-center p-2
                            ${isWinning 
                              ? 'bg-gradient-to-b from-emerald-500/20 to-emerald-600/20 border-emerald-400/40' 
                              : 'bg-gradient-to-b from-red-500/20 to-red-600/20 border-red-400/40'}`}
                        >
                          {isWinning ? (
                            <div className="text-center">
                              <div className="text-emerald-400 text-base sm:text-lg font-bold">
                                ₹{winAmount.toLocaleString()}
                              </div>
                              <div className="text-emerald-400 font-bold text-sm sm:text-base mt-1">
                                🎉 Winner!
                              </div>
                            </div>
                          ) : (
                            <div className="text-red-400 font-bold">💔 Empty</div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="normal"
                          className={`absolute inset-0 rounded-xl flex items-center justify-center
                            bg-gradient-to-b from-blue-900/30 to-purple-900/20 border-blue-400/30`}
                        >
                          <div className="font-bold text-blue-100 text-xl">{index + 1}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Bet Input and Stats */}
          <div className="lg:col-span-3 lg:order-1 order-3">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 rounded-xl p-6 panel-border mb-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Place Your Bet</h3>
              <form onSubmit={handleBetSubmit}>
                <div className="mb-4">
                  <label className="block text-sm text-cyan-200/80 mb-2">
                    Bet Amount (₹)
                  </label>
                  <input
                    type="text"
                    value={betAmount}
                    onChange={handleBetInput}
                    placeholder="Enter amount"
                    className="w-full bg-blue-950/50 border border-blue-500/30 rounded-lg px-4 py-3 
                             focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 
                             text-white transition-all duration-300"
                    disabled={isPlaying}
                  />
                  <p className="text-sm text-cyan-200/60 mt-2">
                    Available: ₹{currentBalance.toLocaleString()}
                  </p>
                </div>
                {!isPlaying ? (
                  <button
                    type="submit"
                    disabled={!betAmount || Number(betAmount) <= 0 || Number(betAmount) > currentBalance}
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 
                             hover:to-blue-600 disabled:from-cyan-500/50 disabled:to-blue-500/50
                             disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300
                             transform hover:scale-105 disabled:hover:scale-100"
                  >
                    Place Your Bet
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={resetGame}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-900/50 to-purple-900/50 
                             hover:from-blue-900/70 hover:to-purple-900/70 rounded-lg font-semibold 
                             transition-all duration-300 transform hover:scale-105"
                  >
                    New Game
                  </button>
                )}
              </form>
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 rounded-xl p-6 panel-border backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-950/60 to-purple-950/40 rounded-lg p-4 border border-blue-500/20">
                  <div className="text-sm text-cyan-200/80">Total Profit</div>
                  <div className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    ₹{stats.totalProfit.toLocaleString()}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-emerald-950/60 to-green-950/40 rounded-lg p-4 border border-emerald-500/20">
                    <div className="text-sm text-cyan-200/80">Wins</div>
                    <div className="text-xl font-bold text-emerald-400">{stats.wins}</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-950/60 to-pink-950/40 rounded-lg p-4 border border-red-500/20">
                    <div className="text-sm text-cyan-200/80">Losses</div>
                    <div className="text-xl font-bold text-red-400">{stats.losses}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Info Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-900/30 to-purple-900/20 rounded-xl p-6 panel-border backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">How to Play Cosmic Cards</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-950/60 to-purple-950/40 rounded-lg p-4 border border-blue-500/20">
              <h4 className="font-bold text-cyan-400 mb-2">Game Rules</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Choose risk level</li>
                <li>• Place your bet</li>
                <li>• Pick a card</li>
                <li>• Reveal multiplier</li>
                <li>• Win bet × multiplier</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-blue-950/60 to-purple-950/40 rounded-lg p-4 border border-blue-500/20">
              <h4 className="font-bold text-emerald-400 mb-2">Risk Levels</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Low: 4 winning cards (5x)</li>
                <li>• Medium: 2 winning cards (10x)</li>
                <li>• High: 1 winning card (20x)</li>
                <li>• Higher risk = bigger rewards</li>
                <li>• Choose wisely!</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-blue-950/60 to-purple-950/40 rounded-lg p-4 border border-blue-500/20">
              <h4 className="font-bold text-purple-400 mb-2">Strategy Tips</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Start with low risk</li>
                <li>• Understand the odds</li>
                <li>• Manage your bankroll</li>
                <li>• Don't chase losses</li>
                <li>• Play for fun!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}