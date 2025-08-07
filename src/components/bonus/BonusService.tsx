import { supabase } from '../../lib/supabase';
import { TransactionService } from '../transactions/TransactionService';

export interface Bonus {
  id: string;
  name: string;
  type: 'signup' | 'deposit' | 'first_game';
  amount: number;
  conditions: any;
  is_active: boolean;
}

export class BonusService {
  static async checkAndActivateSignupBonus(userId: string): Promise<void> {
    try {
      // Check if user already has signup bonus
      const { data: existingBonus } = await supabase
        .from('user_bonuses')
        .select('id')
        .eq('user_id', userId)
        .eq('bonus_type', 'signup')
        .single();

      if (existingBonus) return;

      // Get signup bonus configuration
      const { data: signupBonus, error } = await supabase
        .from('bonuses')
        .select('*')
        .eq('type', 'signup')
        .eq('is_active', true)
        .single();

      if (error || !signupBonus) return;

      // Award signup bonus
      await this.awardBonus(userId, signupBonus.id, signupBonus.amount);
    } catch (error) {
      console.error('Error checking signup bonus:', error);
    }
  }

  static async checkAndActivateDepositBonus(userId: string, depositAmount: number): Promise<void> {
    try {
      // Check if this is the first deposit
      const { data: previousDeposits } = await supabase
        .from('transactions')
        .select('id')
        .eq('user_id', userId)
        .eq('type', 'deposit')
        .eq('status', 'completed');

      if (previousDeposits && previousDeposits.length > 1) return;

      // Get first deposit bonus
      const { data: depositBonus, error } = await supabase
        .from('bonuses')
        .select('*')
        .eq('type', 'deposit')
        .eq('is_active', true)
        .single();

      if (error || !depositBonus) return;

      // Calculate bonus amount (e.g., 100% of deposit up to max)
      const bonusAmount = Math.min(depositAmount, depositBonus.amount || 0);

      if (bonusAmount > 0) {
        await this.awardBonus(userId, depositBonus.id, bonusAmount);
      }
    } catch (error) {
      console.error('Error checking deposit bonus:', error);
    }
  }

  static async checkAndActivateFirstGameBonus(userId: string): Promise<void> {
    try {
      // Check if this is the first game
      const { data: previousGames } = await supabase
        .from('game_sessions')
        .select('id')
        .eq('user_id', userId);

      if (previousGames && previousGames.length > 1) return;

      // Get first game bonus
      const { data: gameBonus, error } = await supabase
        .from('bonuses')
        .select('*')
        .eq('type', 'first_game')
        .eq('is_active', true)
        .single();

      if (error || !gameBonus) return;

      await this.awardBonus(userId, gameBonus.id, gameBonus.amount);
    } catch (error) {
      console.error('Error checking first game bonus:', error);
    }
  }

  private static async awardBonus(userId: string, bonusId: string, amount: number): Promise<void> {
    try {
      // Add bonus to wallet
      await TransactionService.updateWalletBalance(userId, amount, 'bonus');
      
      // Create bonus transaction
      await TransactionService.createTransaction(
        userId,
        'bonus',
        amount,
        'bonus',
        { bonusId }
      );

      // Record bonus award
      await supabase
        .from('user_bonuses')
        .insert({
          user_id: userId,
          bonus_id: bonusId,
          amount,
          status: 'active'
        });
    } catch (error) {
      console.error('Error awarding bonus:', error);
      throw error;
    }
  }
}