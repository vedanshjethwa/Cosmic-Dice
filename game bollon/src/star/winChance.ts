import { TEST_CODES } from './types';

interface BetTier {
  amount: number;
  winChance: number;
}

export const BET_TIERS: BetTier[] = [
  { amount: 1, winChance: 50 },
  { amount: 10, winChance: 40 },
  { amount: 20, winChance: 30 },
  { amount: 40, winChance: 25 },
  { amount: 80, winChance: 20 },
  { amount: 160, winChance: 15 },
  { amount: 320, winChance: 12 },
  { amount: 640, winChance: 10 },
  { amount: 1280, winChance: 8 },
  { amount: 2560, winChance: 6 },
  { amount: 5120, winChance: 5 },
  { amount: 10240, winChance: 4 },
  { amount: 20480, winChance: 3 },
  { amount: 40960, winChance: 2.5 },
  { amount: 81920, winChance: 0.82 },
  { amount: 100000, winChance: 0.1 }
];

export function calculateWinChance(betAmount: number, testWinRate: number | null = null): number {
  if (testWinRate !== null) {
    return testWinRate;
  }
  
  const tier = BET_TIERS.find((t, i) => 
    betAmount <= t.amount || i === BET_TIERS.length - 1
  );
  return (tier?.winChance || 0.01) / 100;
}