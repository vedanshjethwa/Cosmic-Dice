import { supabase } from '../../lib/supabase';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'bonus' | 'referral';
  amount: number;
  wallet_type: 'real' | 'bonus';
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  metadata?: any;
}

export class TransactionService {
  static async createTransaction(
    userId: string,
    type: Transaction['type'],
    amount: number,
    walletType: 'real' | 'bonus' = 'real',
    metadata?: any
  ): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type,
        amount,
        wallet_type: walletType,
        status: 'completed',
        metadata: metadata || {}
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserTransactions(userId: string, limit = 50): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  static async updateWalletBalance(
    userId: string,
    amount: number,
    walletType: 'real' | 'bonus' = 'real'
  ): Promise<void> {
    const balanceField = walletType === 'real' ? 'real_balance' : 'bonus_balance';
    
    const { data: currentWallet, error: fetchError } = await supabase
      .from('wallets')
      .select(balanceField)
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;

    const currentBalance = currentWallet[balanceField];
    const newBalance = Math.max(0, currentBalance + amount);

    const { error: updateError } = await supabase
      .from('wallets')
      .update({ [balanceField]: newBalance })
      .eq('user_id', userId);

    if (updateError) throw updateError;
  }

  static async processGameResult(
    userId: string,
    betAmount: number,
    winAmount: number,
    gameData: any
  ): Promise<void> {
    try {
      // Deduct bet amount
      await this.updateWalletBalance(userId, -betAmount, 'real');
      await this.createTransaction(userId, 'bet', -betAmount, 'real', gameData);

      // Add win amount if any
      if (winAmount > 0) {
        await this.updateWalletBalance(userId, winAmount, 'real');
        await this.createTransaction(userId, 'win', winAmount, 'real', gameData);
      }

      // Update wallet statistics
      const { error } = await supabase
        .from('wallets')
        .update({
          total_wagered: supabase.sql`total_wagered + ${betAmount}`,
          total_won: supabase.sql`total_won + ${winAmount}`
        })
        .eq('user_id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error processing game result:', error);
      throw error;
    }
  }
}