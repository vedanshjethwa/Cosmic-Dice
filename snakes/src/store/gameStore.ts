import { create } from 'zustand';
import { GameState, GridCell, GameResult, RiskLevel } from '../types';

const TOTAL_TILES = 25;
const FIXED_SNAKE_POSITIONS = [2, 5, 8, 11, 14]; // Fixed snake positions (0-indexed)

// Enhanced multiplier calculation based on danger passed
const calculateMultiplier = (position: number, snakesPassed: number): number => {
  const baseMultiplier = 1 + (position * 0.1);
  const dangerBonus = snakesPassed * 2.5; // Higher bonus for passing snakes
  return Math.round((baseMultiplier + dangerBonus) * 100) / 100;
};

const getRiskLevel = (snakeCount: number): RiskLevel => {
  if (snakeCount <= 5) return { level: 'Low', color: 'green', range: `${snakeCount}/25 tiles` };
  if (snakeCount <= 15) return { level: 'Medium', color: 'yellow', range: `${snakeCount}/25 tiles` };
  return { level: 'High', color: 'red', range: `${snakeCount}/25 tiles` };
};

const createGrid = (snakeCount: number): GridCell[] => {
  const grid: GridCell[] = [];
  
  // Create 25 tiles in sequence
  for (let i = 0; i < TOTAL_TILES; i++) {
    grid.push({
      id: i,
      position: i + 1,
      multiplier: 1,
      isSnake: false,
      isRevealed: false,
      isActive: false,
      isPlayerPosition: false,
    });
  }
  
  // Use fixed snake positions for controlled risk
  const snakePositions = FIXED_SNAKE_POSITIONS.slice(0, Math.min(snakeCount, 5));
  
  // If more snakes needed, add random positions
  if (snakeCount > 5) {
    const additionalSnakes = snakeCount - 5;
    const availablePositions = Array.from({ length: TOTAL_TILES }, (_, i) => i)
      .filter(pos => pos > 0 && !snakePositions.includes(pos));
    
    for (let i = 0; i < additionalSnakes && availablePositions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      snakePositions.push(availablePositions.splice(randomIndex, 1)[0]);
    }
  }
  
  // Apply snake positions
  snakePositions.forEach(pos => {
    grid[pos].isSnake = true;
    grid[pos].multiplier = 0;
  });
  
  // Calculate multipliers for safe tiles
  grid.forEach((cell, index) => {
    if (!cell.isSnake) {
      const snakesPassed = snakePositions.filter(pos => pos < index).length;
      cell.multiplier = calculateMultiplier(index, snakesPassed);
    }
  });
  
  // Set starting position
  grid[0].isPlayerPosition = true;
  grid[0].isRevealed = true;
  
  return grid;
};

export const useGameStore = create<GameState & {
  startGame: (bet: number, snakeCount: number) => void;
  rollDice: () => void;
  cashOut: () => void;
  resetGame: () => void;
  setBet: (bet: number) => void;
  setSnakeCount: (count: number) => void;
  getRiskLevel: () => RiskLevel;
}>((set, get) => ({
  grid: createGrid(5),
  currentPosition: 0,
  gameStatus: 'idle',
  balance: 1000,
  currentBet: 10,
  totalMultiplier: 1,
  snakeCount: 5,
  gameHistory: [],
  diceValue: null,
  isRolling: false,

  setBet: (bet) => set({ currentBet: bet }),
  
  setSnakeCount: (count) => {
    set({ 
      snakeCount: count,
      grid: createGrid(count)
    });
  },

  getRiskLevel: () => getRiskLevel(get().snakeCount),

  startGame: (bet, snakeCount) => {
    const { balance } = get();
    if (bet <= balance && bet > 0) {
      const newGrid = createGrid(snakeCount);
      set({
        grid: newGrid,
        currentPosition: 0,
        gameStatus: 'playing',
        currentBet: bet,
        balance: balance - bet,
        totalMultiplier: newGrid[0].multiplier,
        snakeCount,
        diceValue: null,
        isRolling: false,
      });
    }
  },

  rollDice: () => {
    const { gameStatus, currentPosition, grid, currentBet, gameHistory } = get();
    
    if (gameStatus !== 'playing') return;

    // Start dice rolling animation
    set({ isRolling: true, gameStatus: 'rolling' });

    // Simulate dice roll after animation
    setTimeout(() => {
      const diceValue = Math.floor(Math.random() * 3) + 1; // 1-3
      const newPosition = Math.min(currentPosition + diceValue, TOTAL_TILES - 1);
      
      const newGrid = [...grid];
      
      // Clear previous position
      if (currentPosition >= 0) {
        newGrid[currentPosition].isPlayerPosition = false;
      }
      
      // Set new position
      newGrid[newPosition].isPlayerPosition = true;
      newGrid[newPosition].isRevealed = true;
      
      // Check if hit snake
      if (newGrid[newPosition].isSnake) {
        // Game over - hit snake
        const gameResult: GameResult = {
          id: Date.now().toString(),
          bet: currentBet,
          multiplier: 0,
          result: 'loss',
          payout: 0,
          timestamp: Date.now(),
          finalPosition: newPosition + 1,
        };
        
        set({
          grid: newGrid,
          currentPosition: newPosition,
          gameStatus: 'lost',
          diceValue,
          isRolling: false,
          gameHistory: [gameResult, ...gameHistory.slice(0, 9)],
        });
        return;
      }

      // Safe tile - check if reached end
      if (newPosition >= TOTAL_TILES - 1) {
        // Reached the end - auto win
        const finalPayout = currentBet * newGrid[newPosition].multiplier;
        const gameResult: GameResult = {
          id: Date.now().toString(),
          bet: currentBet,
          multiplier: newGrid[newPosition].multiplier,
          result: 'win',
          payout: finalPayout,
          timestamp: Date.now(),
          finalPosition: newPosition + 1,
        };
        
        set({
          grid: newGrid,
          currentPosition: newPosition,
          gameStatus: 'won',
          totalMultiplier: newGrid[newPosition].multiplier,
          balance: get().balance + finalPayout,
          diceValue,
          isRolling: false,
          gameHistory: [gameResult, ...gameHistory.slice(0, 9)],
        });
      } else {
        // Continue playing
        set({
          grid: newGrid,
          currentPosition: newPosition,
          gameStatus: 'playing',
          totalMultiplier: newGrid[newPosition].multiplier,
          diceValue,
          isRolling: false,
        });
      }
    }, 1500); // 1.5 second dice animation
  },

  cashOut: () => {
    const { currentBet, totalMultiplier, gameStatus, balance, gameHistory, currentPosition } = get();
    if (gameStatus === 'playing' && totalMultiplier > 1) {
      const winnings = currentBet * totalMultiplier;
      const gameResult: GameResult = {
        id: Date.now().toString(),
        bet: currentBet,
        multiplier: totalMultiplier,
        result: 'win',
        payout: winnings,
        timestamp: Date.now(),
        finalPosition: currentPosition + 1,
      };
      
      set({
        balance: balance + winnings,
        gameStatus: 'won',
        gameHistory: [gameResult, ...gameHistory.slice(0, 9)],
      });
    }
  },

  resetGame: () => {
    const { snakeCount } = get();
    set({
      grid: createGrid(snakeCount),
      currentPosition: 0,
      gameStatus: 'idle',
      totalMultiplier: 1,
      diceValue: null,
      isRolling: false,
    });
  },
}));