export interface GridCell {
  id: number;
  position: number; // 1-25 tile position
  multiplier: number;
  isSnake: boolean;
  isRevealed: boolean;
  isActive: boolean;
  isPlayerPosition: boolean;
}

export interface GameState {
  grid: GridCell[];
  currentPosition: number; // Current tile position (0-24)
  gameStatus: 'idle' | 'playing' | 'rolling' | 'won' | 'lost';
  balance: number;
  currentBet: number;
  totalMultiplier: number;
  snakeCount: number;
  gameHistory: GameResult[];
  diceValue: number | null;
  isRolling: boolean;
}

export interface GameResult {
  id: string;
  bet: number;
  multiplier: number;
  result: 'win' | 'loss';
  payout: number;
  timestamp: number;
  finalPosition: number;
}

export interface RiskLevel {
  level: 'Low' | 'Medium' | 'High';
  color: 'green' | 'yellow' | 'red';
  range: string;
}