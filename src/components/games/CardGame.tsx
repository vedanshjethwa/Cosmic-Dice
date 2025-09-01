import React, { useState, useEffect } from 'react';
import { Minus, Plus, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GameSpecificBets } from '../shared/GameSpecificBets';
import { Footer } from '../Footer';

interface Card {
  id: number;
  suit: string;
  value: string;
  color: string;
  revealed: boolean;
}

interface BetRecord {
  id: number;
  amount: number;
  multiplier: number;
  winAmount: number;
  timestamp: Date;
}

export default function CardGame() {
  const { user, wallet, refreshWallet, updateBalance } = useAuth();
  const [bet, setBet] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [betHistory, setBetHistory] = useState<BetRecord[]>([]);
  const [stats, setStats] = useState({
    totalProfit: 0,
    totalWins: 0,
    totalLosses: 0
  });

  const currentBalance = (wallet?.real_balance || 0) + (wallet?.bonus_balance || 0);

  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const multipliers = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];

  useEffect(() => {
    setCards(generateCards());
  }, []);

  const generateCards = () => {
    const newCards: Card[] = [];
    for (let i = 0; i < 12; i++) {
      const randomSuit = suits[Math.floor(Math.random() * suits.length)];
      const randomValue = values[Math.floor(Math.random() * values.length)];
      const color = randomSuit === '♥' || randomSuit === '♦' ? 'red' : 'black';
      
      newCards.push({
        id: i,
        suit: randomSuit,
        value: randomValue,
        color,
        revealed: false
      });
    }
    return newCards;
  };

  const startGame = () => {
    if (currentBalance >= bet) {
      updateBalance(-bet);
      setIsPlaying(true);
      setCards(generateCards());
      setSelectedCard(null);
      setShowResult(false);
    }
  };

  const selectCard = (card: Card) => {
    if (!isPlaying || card.revealed || selectedCard) return;

    const newCards = cards.map(c => 
      c.id === card.id ? { ...c, revealed: true } : c
    );
    setCards(newCards);
    setSelectedCard(card);

    // Calculate win based on card value
    const multiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
    const winnings = Math.floor(bet * multiplier);
    
    setLastWin(winnings);
    updateBalance(winnings);
    setShowResult(true);
    setIsPlaying(false);

    // Emit bet event for global tracking
    window.dispatchEvent(new CustomEvent('cosmic-bet-placed', {
      detail: {
        game: 'Cosmic Cards',
        gameType: 'card',
        amount: bet,
        result: winnings > bet ? 'win' : 'loss',
        profit: winnings - bet,
        multiplier: multiplier,
        gameData: { card: `${card.value}${card.suit}`, multiplier }
      }
    }));

    // Update bet history
    const newBet: BetRecord = {
      id: Date.now(),
      amount: bet,
      multiplier: multiplier,
      winAmount: winnings,
      timestamp: new Date()
    };
    
    setBetHistory(prev => [newBet, ...prev].slice(0, 10));
    
    // Update stats
    setStats(prev => {
      const profit = winnings - bet;
      return {
        totalProfit: prev.totalProfit + profit,
        totalWins: profit >= 0 ? prev.totalWins + 1 : prev.totalWins,
        totalLosses: profit < 0 ? prev.totalLosses + 1 : prev.totalLosses
      };
    });
  };

  const handleBetChange = (amount: number) => {
    if (isPlaying) return;
    const newBet = Math.max(1, Math.min(currentBalance, amount));
    setBet(newBet);
  };

  const incrementBet = () => {
    if (isPlaying) return;
    const increment = bet < 100 ? 10 : 100;
    handleBetChange(bet + increment);
  };

  const decrementBet = () => {
    if (isPlaying) return;
    const decrement = bet <= 100 ? 10 : 100;
    handleBetChange(bet - decrement);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Game Specific Bets - Left Side */}
        <div className="lg:col-span-1">
          <GameSpecificBets gameType="card" gameName="Cosmic Cards" />
        </div>
        
        {/* Main Game Area */}
        <div className="lg:col-span-3">
          <div className="bg-[#1A2634] rounded-3xl p-8 shadow-2xl border border-blue-500/20 relative">
            {showResult && (
              <div className="absolute inset-x-0 top-8 text-center z-10 animate-fadeIn">
                <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text 
                  bg-gradient-to-r from-blue-300 to-blue-500">
                  {lastWin > bet ? 'Congratulations! 🎉' : 'Better luck next time!'}
                </h2>
                <p className="text-2xl mb-4">
                  You won <span className="font-bold text-transparent bg-clip-text 
                    bg-gradient-to-r from-blue-300 to-blue-500">₹{lastWin}</span>!
                </p>
                {selectedCard && (
                  <p className="text-lg text-gray-300">
                    You drew: <span className={`font-bold ${selectedCard.color === 'red' ? 'text-red-400' : 'text-gray-300'}`}>
                      {selectedCard.value}{selectedCard.suit}
                    </span>
                  </p>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 relative z-10">
              {cards.map(card => (
                <button
                  key={card.id}
                  onClick={() => selectCard(card)}
                  disabled={!isPlaying || card.revealed || selectedCard !== null}
                  className="relative group aspect-[2/3] p-2"
                >
                  <div
                    className={`
                      w-full h-full relative
                      transition-all duration-500 transform-gpu
                      ${card.revealed ? 'scale-105 rotate-3' : 'group-hover:scale-105 group-hover:-translate-y-2'}
                      ${!isPlaying && !card.revealed ? 'opacity-50 scale-95' : ''}
                      ${selectedCard && !card.revealed ? 'opacity-30 scale-95' : ''}
                    `}
                  >
                    <div
                      className={`
                        absolute inset-0
                        ${card.revealed 
                          ? 'bg-white border-2 border-gray-300' 
                          : 'bg-gradient-to-b from-blue-600 to-blue-800 border-2 border-blue-400'
                        }
                        rounded-lg
                        shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                        group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]
                        transition-all duration-300
                        flex items-center justify-center
                      `}
                    >
                      {card.revealed ? (
                        <div className="text-center">
                          <div className={`text-4xl font-bold ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>
                            {card.value}
                          </div>
                          <div className={`text-3xl ${card.color === 'red' ? 'text-red-600' : 'text-black'}`}>
                            {card.suit}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-2xl text-white font-bold mb-2">🎴</div>
                          <div className="text-sm text-blue-200">Click to reveal</div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-[#1A2634] rounded-xl border border-blue-500/20 p-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div className="flex items-center gap-2 sm:gap-3 bg-[#0B1622] px-3 sm:px-6 py-2 sm:py-3 rounded-xl border border-blue-500/10 shadow-lg">
                <span className="text-base sm:text-lg font-medium text-white">Bet:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrementBet}
                    disabled={isPlaying || bet <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 
                      hover:bg-blue-500/20 border border-blue-500/30 text-blue-400
                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={bet}
                    onChange={(e) => handleBetChange(Number(e.target.value))}
                    disabled={isPlaying}
                    min={1}
                    max={currentBalance}
                    className="w-24 bg-[#0B1622] rounded-lg px-3 py-1.5 
                      text-base sm:text-lg font-bold text-white text-center
                      border border-blue-500/30 focus:border-blue-500/50 focus:outline-none
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={incrementBet}
                    disabled={isPlaying || bet >= currentBalance}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 
                      hover:bg-blue-500/20 border border-blue-500/30 text-blue-400
                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button
                onClick={startGame}
                disabled={currentBalance < bet || isPlaying}
                className="w-full sm:w-auto bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 
                  hover:from-blue-500 hover:via-blue-600 hover:to-indigo-700
                  px-8 sm:px-12 py-2 sm:py-3 rounded-xl font-bold text-base sm:text-lg
                  disabled:opacity-50 transition-all duration-300 
                  shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                  disabled:hover:shadow-none border border-white/10
                  transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isPlaying ? 'Playing...' : 'Draw Card'}
              </button>
            </div>
          </div>

          {/* Recent Bets */}
          <div className="mt-8 bg-[#1A2634] rounded-xl p-6 border border-blue-500/20 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">Recent Bets</h2>
            {betHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-blue-500/10">
                      <th className="pb-2 font-medium">Time</th>
                      <th className="pb-2 font-medium">Bet</th>
                      <th className="pb-2 font-medium">Card</th>
                      <th className="pb-2 font-medium">Multiplier</th>
                      <th className="pb-2 font-medium">Payout</th>
                      <th className="pb-2 font-medium">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {betHistory.map((record) => {
                      const profit = record.winAmount - record.amount;
                      const isProfitable = profit >= 0;
                      
                      return (
                        <tr key={record.id} className="border-b border-blue-500/10 last:border-0">
                          <td className="py-3 text-sm">{formatTime(record.timestamp)}</td>
                          <td className="py-3 text-sm">₹{record.amount}</td>
                          <td className="py-3 text-sm">🎴</td>
                          <td className="py-3 text-sm">{record.multiplier}x</td>
                          <td className="py-3 text-sm">₹{record.winAmount}</td>
                          <td className={`py-3 text-sm font-medium ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                            {isProfitable ? '+' : ''}₹{profit}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No bets yet. Start playing to see your history!
              </div>
            )}
          </div>

          {/* Stats Summary */}
          <div className="mt-8 bg-[#1A2634] rounded-xl p-6 border border-blue-500/20 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0B1622] rounded-lg p-4 border border-blue-500/10">
                <div className="text-sm text-gray-400">Total Profit</div>
                <div className={`text-xl font-bold ${stats.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.totalProfit >= 0 ? '+' : ''}₹{stats.totalProfit}
                </div>
              </div>
              <div className="bg-[#0B1622] rounded-lg p-4 border border-blue-500/10">
                <div className="text-sm text-gray-400">Wins</div>
                <div className="text-xl font-bold text-green-500">{stats.totalWins}</div>
              </div>
              <div className="bg-[#0B1622] rounded-lg p-4 border border-blue-500/10">
                <div className="text-sm text-gray-400">Losses</div>
                <div className="text-xl font-bold text-red-500">{stats.totalLosses}</div>
              </div>
            </div>
          </div>

          {/* Game Info Section */}
          <div className="mt-8 bg-[#1A2634] rounded-xl p-6 border border-blue-500/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">How to Play Cosmic Cards</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0B1622] rounded-lg p-4 border border-blue-500/10">
                <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Place your bet amount</li>
                  <li>• Click any card to reveal it</li>
                  <li>• Each card has a random multiplier</li>
                  <li>• Win = Bet × Multiplier</li>
                  <li>• One card per round</li>
                </ul>
              </div>
              <div className="bg-[#0B1622] rounded-lg p-4 border border-blue-500/10">
                <h4 className="font-bold text-green-400 mb-2">Strategy Tips</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Start with smaller bets</li>
                  <li>• All cards are random</li>
                  <li>• No card counting advantage</li>
                  <li>• Trust your intuition</li>
                  <li>• Set win/loss limits</li>
                </ul>
              </div>
              <div className="bg-[#0B1622] rounded-lg p-4 border border-blue-500/10">
                <h4 className="font-bold text-purple-400 mb-2">Multipliers</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• 0.5x - Small loss</li>
                  <li>• 1x - Break even</li>
                  <li>• 1.5x - Small win</li>
                  <li>• 2x - Double win</li>
                  <li>• 2.5x - Great win</li>
                  <li>• 3x - Excellent win</li>
                  <li>• 4x - Amazing win</li>
                  <li>• 5x - Maximum win</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Game Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}