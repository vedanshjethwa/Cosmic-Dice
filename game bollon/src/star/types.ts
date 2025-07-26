export interface StarState {
  glowing: boolean;
  tapCount: number;
  showInput: boolean;
  showMessage: boolean;
  testMode: 'none' | 'high' | 'medium' | 'low';
}

export type TestCode = {
  code: string;
  winRate: number;
};

export const TEST_CODES: TestCode[] = [
  { code: 'vedansh111', winRate: 85 },
  { code: 'cosmic111', winRate: 65 },
  { code: 'cosmicwin777', winRate: 50 }
];