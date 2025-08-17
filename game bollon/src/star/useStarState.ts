import { useState, useCallback } from 'react';
import { StarState } from './types';

interface UseStarStateProps {
  onActivate: (winRate: number) => void;
}

const INITIAL_STATE: StarState = {
  glowing: false,
  tapCount: 0,
  showInput: false,
  showMessage: false,
  testMode: 'none'
};

export function useStarState({ onActivate }: UseStarStateProps) {
  const [state, setState] = useState<StarState>(INITIAL_STATE);

  const handleTap = useCallback(() => {
    setState(prev => {
      const newTapCount = prev.tapCount + 1;
      return {
        ...prev,
        glowing: true,
        tapCount: newTapCount,
        showInput: newTapCount >= 7
      };
    });
  }, []);

  const handleSubmit = useCallback((winRate: number) => {
    onActivate(winRate);
    setState(prev => ({
      ...prev,
      showInput: false,
      showMessage: true,
      testMode: winRate > 0.8 ? 'high' : 'medium'
    }));
    setTimeout(() => {
      setState(prev => ({ ...prev, showMessage: false }));
    }, 3000);
  }, [onActivate]);

  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    handleTap,
    handleSubmit,
    resetState
  };
}