import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

// Get available bonuses
router.get('/available', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const { data: bonuses, error } = await supabase
      .from('bonuses')
      .select('*')
      .eq('is_active', true)
      .or(`valid_until.is.null,valid_until.gt.${new Date().toISOString()}`);

    if (error) {
      logger.error('Bonuses fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch bonuses' });
    }

    // Check which bonuses user has already claimed
    const { data: userBonuses } = await supabase
      .from('user_bonuses')
      .select('bonus_id')
      .eq('user_id', userId);

    const claimedBonusIds = userBonuses?.map(ub => ub.bonus_id) || [];

    const availableBonuses = bonuses.filter(bonus => 
      !claimedBonusIds.includes(bonus.id) &&
      (bonus.max_claims === null || bonus.current_claims < bonus.max_claims)
    );

    res.json({ bonuses: availableBonuses });
  } catch (error) {
    logger.error('Available bonuses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Claim bonus
router.post('/claim', [
  body('bonusId').isUUID(),
  body('promoCode').optional().isString()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bonusId, promoCode } = req.body;
    const userId = req.user!.id;

    // Get bonus details
    const { data: bonus, error: bonusError } = await supabase
      .from('bonuses')
      .select('*')
      .eq('id', bonusId)
      .eq('is_active', true)
      .single();

    if (bonusError || !bonus) {
      return res.status(404).json({ error: 'Bonus not found' });
    }

    // Check if user already claimed this bonus
    const { data: existingClaim } = await supabase
      .from('user_bonuses')
      .select('id')
      .eq('user_id', userId)
      .eq('bonus_id', bonusId)
      .single();

    if (existingClaim) {
      return res.status(400).json({ error: 'Bonus already claimed' });
    }

    // Check bonus validity
    if (bonus.valid_until && new Date(bonus.valid_until) < new Date()) {
      return res.status(400).json({ error: 'Bonus has expired' });
    }

    if (bonus.max_claims && bonus.current_claims >= bonus.max_claims) {
      return res.status(400).json({ error: 'Bonus claim limit reached' });
    }

    // Calculate bonus amount
    let bonusAmount = bonus.amount || 0;
    if (bonus.type === 'deposit' && bonus.percentage) {
      // For deposit bonuses, calculate based on last deposit
      const { data: lastDeposit } = await supabase
        .from('transactions')
        .select('amount')
        .eq('user_id', userId)
        .eq('type', 'deposit')
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (lastDeposit) {
        bonusAmount = Math.min(
          parseFloat(lastDeposit.amount) * (bonus.percentage / 100),
          bonus.max_amount || bonusAmount
        );
      }
    }

    // Add bonus to user's bonus wallet
    const { data: wallet } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (wallet) {
      await supabase
        .from('wallets')
        .update({
          bonus_balance: parseFloat(wallet.bonus_balance) + bonusAmount
        })
        .eq('user_id', userId);
    }

    // Create user bonus record
    await supabase
      .from('user_bonuses')
      .insert({
        user_id: userId,
        bonus_id: bonusId,
        amount: bonusAmount,
        wagering_requirement: bonusAmount * bonus.wagering_requirement,
        expires_at: bonus.valid_until
      });

    // Update bonus claim count
    await supabase
      .from('bonuses')
      .update({
        current_claims: bonus.current_claims + 1
      })
      .eq('id', bonusId);

    // Create bonus transaction
    await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: 'bonus',
        amount: bonusAmount,
        wallet_type: 'bonus',
        status: 'completed',
        metadata: { bonusId, bonusType: bonus.type }
      });

    res.json({
      message: 'Bonus claimed successfully',
      amount: bonusAmount
    });
  } catch (error) {
    logger.error('Bonus claim error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user bonuses
router.get('/my-bonuses', async (req: AuthRequest, res) => {
  try {
    const { data: userBonuses, error } = await supabase
      .from('user_bonuses')
      .select(`
        *,
        bonuses(name, type, wagering_requirement)
      `)
      .eq('user_id', req.user!.id)
      .order('claimed_at', { ascending: false });

    if (error) {
      logger.error('User bonuses fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch user bonuses' });
    }

    res.json({ bonuses: userBonuses });
  } catch (error) {
    logger.error('User bonuses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Apply promo code
router.post('/promo-code', [
  body('code').isString().isLength({ min: 1 })
], async (req: AuthRequest, res) => {
  try {
    const { code } = req.body;
    const userId = req.user!.id;

    // Get promo code
    const { data: promoCode, error: promoError } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (promoError || !promoCode) {
      return res.status(404).json({ error: 'Invalid promo code' });
    }

    // Check validity
    if (promoCode.valid_until && new Date(promoCode.valid_until) < new Date()) {
      return res.status(400).json({ error: 'Promo code has expired' });
    }

    if (promoCode.max_uses && promoCode.current_uses >= promoCode.max_uses) {
      return res.status(400).json({ error: 'Promo code usage limit reached' });
    }

    // Check if user already used this code
    const { data: existingUse } = await supabase
      .from('transactions')
      .select('id')
      .eq('user_id', userId)
      .eq('metadata->promoCodeId', promoCode.id)
      .single();

    if (existingUse) {
      return res.status(400).json({ error: 'Promo code already used' });
    }

    // Calculate bonus amount
    let bonusAmount = promoCode.value;
    if (promoCode.type === 'percentage') {
      // For percentage codes, apply to last deposit
      const { data: lastDeposit } = await supabase
        .from('transactions')
        .select('amount')
        .eq('user_id', userId)
        .eq('type', 'deposit')
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (lastDeposit) {
        bonusAmount = Math.min(
          parseFloat(lastDeposit.amount) * (promoCode.value / 100),
          promoCode.max_amount || bonusAmount
        );
      }
    }

    // Add to bonus wallet
    const { data: wallet } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (wallet) {
      await supabase
        .from('wallets')
        .update({
          bonus_balance: parseFloat(wallet.bonus_balance) + bonusAmount
        })
        .eq('user_id', userId);
    }

    // Update promo code usage
    await supabase
      .from('promo_codes')
      .update({
        current_uses: promoCode.current_uses + 1
      })
      .eq('id', promoCode.id);

    // Create transaction
    await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: 'bonus',
        amount: bonusAmount,
        wallet_type: 'bonus',
        status: 'completed',
        metadata: { promoCodeId: promoCode.id, promoCode: code }
      });

    res.json({
      message: 'Promo code applied successfully',
      amount: bonusAmount
    });
  } catch (error) {
    logger.error('Promo code error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;