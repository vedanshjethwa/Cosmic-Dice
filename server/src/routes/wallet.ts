import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

// Get wallet balance
router.get('/balance', async (req: AuthRequest, res) => {
  try {
    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', req.user!.id)
      .single();

    if (error) {
      logger.error('Wallet fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch wallet' });
    }

    res.json({
      realBalance: wallet.real_balance,
      bonusBalance: wallet.bonus_balance,
      lockedBalance: wallet.locked_balance,
      totalDeposited: wallet.total_deposited,
      totalWithdrawn: wallet.total_withdrawn,
      totalWagered: wallet.total_wagered,
      totalWon: wallet.total_won
    });
  } catch (error) {
    logger.error('Wallet balance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get transaction history
router.get('/transactions', async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const type = req.query.type as string;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type) {
      query = query.eq('type', type);
    }

    const { data: transactions, error } = await query;

    if (error) {
      logger.error('Transaction history error:', error);
      return res.status(500).json({ error: 'Failed to fetch transactions' });
    }

    res.json({
      transactions,
      pagination: {
        page,
        limit,
        hasMore: transactions.length === limit
      }
    });
  } catch (error) {
    logger.error('Transaction history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Manual credit/debit (admin only)
router.post('/manual-transaction', [
  body('userId').isUUID(),
  body('amount').isFloat({ min: 0.01 }),
  body('type').isIn(['credit', 'debit']),
  body('walletType').isIn(['real', 'bonus']),
  body('reason').isString()
], async (req: AuthRequest, res) => {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, amount, type, walletType, reason } = req.body;

    // Start transaction
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (walletError || !wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const currentBalance = walletType === 'real' ? wallet.real_balance : wallet.bonus_balance;
    
    if (type === 'debit' && currentBalance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    const newBalance = type === 'credit' 
      ? parseFloat(currentBalance) + parseFloat(amount)
      : parseFloat(currentBalance) - parseFloat(amount);

    // Update wallet
    const updateField = walletType === 'real' ? 'real_balance' : 'bonus_balance';
    await supabase
      .from('wallets')
      .update({ [updateField]: newBalance })
      .eq('user_id', userId);

    // Create transaction record
    await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: type === 'credit' ? 'manual_credit' : 'manual_debit',
        amount: type === 'credit' ? amount : -amount,
        wallet_type: walletType,
        status: 'completed',
        admin_id: req.user!.id,
        admin_notes: reason
      });

    res.json({ message: 'Transaction completed successfully' });
  } catch (error) {
    logger.error('Manual transaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Freeze/unfreeze wallet
router.post('/freeze', [
  body('userId').isUUID(),
  body('freeze').isBoolean(),
  body('reason').optional().isString()
], async (req: AuthRequest, res) => {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { userId, freeze, reason } = req.body;

    await supabase
      .from('wallets')
      .update({ 
        is_frozen: freeze,
        freeze_reason: freeze ? reason : null
      })
      .eq('user_id', userId);

    res.json({ message: `Wallet ${freeze ? 'frozen' : 'unfrozen'} successfully` });
  } catch (error) {
    logger.error('Wallet freeze error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;