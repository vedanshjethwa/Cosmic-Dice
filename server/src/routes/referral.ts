import express from 'express';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

// Get referral stats
router.get('/stats', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    // Get user's referral code
    const { data: user } = await supabase
      .from('users')
      .select('referral_code')
      .eq('id', userId)
      .single();

    // Get direct referrals (level 1)
    const { data: directReferrals, error: directError } = await supabase
      .from('referrals')
      .select(`
        *,
        users!referrals_referred_id_fkey(username, created_at, is_active)
      `)
      .eq('referrer_id', userId)
      .eq('level', 1);

    if (directError) {
      logger.error('Direct referrals error:', directError);
    }

    // Get indirect referrals (level 2)
    const { data: indirectReferrals, error: indirectError } = await supabase
      .from('referrals')
      .select(`
        *,
        users!referrals_referred_id_fkey(username, created_at, is_active)
      `)
      .eq('referrer_id', userId)
      .eq('level', 2);

    if (indirectError) {
      logger.error('Indirect referrals error:', indirectError);
    }

    // Calculate total earnings
    const totalEarnings = [...(directReferrals || []), ...(indirectReferrals || [])]
      .reduce((sum, ref) => sum + parseFloat(ref.total_earned), 0);

    res.json({
      referralCode: user?.referral_code,
      directReferrals: directReferrals?.length || 0,
      indirectReferrals: indirectReferrals?.length || 0,
      totalEarnings,
      referralTree: {
        level1: directReferrals || [],
        level2: indirectReferrals || []
      }
    });
  } catch (error) {
    logger.error('Referral stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get referral earnings
router.get('/earnings', async (req: AuthRequest, res) => {
  try {
    const { data: earnings, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user!.id)
      .eq('type', 'referral')
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Referral earnings error:', error);
      return res.status(500).json({ error: 'Failed to fetch referral earnings' });
    }

    const totalEarnings = earnings.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    res.json({
      earnings,
      totalEarnings
    });
  } catch (error) {
    logger.error('Referral earnings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Process referral commission (called internally when referred user bets)
export const processReferralCommission = async (userId: string, betAmount: number) => {
  try {
    // Get user's referrer
    const { data: user } = await supabase
      .from('users')
      .select('referred_by')
      .eq('id', userId)
      .single();

    if (!user?.referred_by) return;

    // Get referral relationship
    const { data: referral } = await supabase
      .from('referrals')
      .select('*')
      .eq('referred_id', userId)
      .eq('level', 1)
      .single();

    if (!referral) return;

    // Calculate commission
    const commission = betAmount * referral.commission_rate;

    // Add to referrer's wallet
    const { data: referrerWallet } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', referral.referrer_id)
      .single();

    if (referrerWallet) {
      await supabase
        .from('wallets')
        .update({
          real_balance: parseFloat(referrerWallet.real_balance) + commission
        })
        .eq('user_id', referral.referrer_id);

      // Update referral earnings
      await supabase
        .from('referrals')
        .update({
          total_earned: parseFloat(referral.total_earned) + commission
        })
        .eq('id', referral.id);

      // Create referral transaction
      await supabase
        .from('transactions')
        .insert({
          user_id: referral.referrer_id,
          type: 'referral',
          amount: commission,
          wallet_type: 'real',
          status: 'completed',
          metadata: { 
            referredUserId: userId,
            originalBetAmount: betAmount,
            commissionRate: referral.commission_rate
          }
        });
    }

    // Process level 2 referral if exists
    const { data: level1Referrer } = await supabase
      .from('users')
      .select('referred_by')
      .eq('id', referral.referrer_id)
      .single();

    if (level1Referrer?.referred_by) {
      const level2Commission = betAmount * 0.0005; // 0.05% for level 2

      const { data: level2Wallet } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', level1Referrer.referred_by)
        .single();

      if (level2Wallet) {
        await supabase
          .from('wallets')
          .update({
            real_balance: parseFloat(level2Wallet.real_balance) + level2Commission
          })
          .eq('user_id', level1Referrer.referred_by);

        // Create level 2 referral record if not exists
        const { data: existingLevel2 } = await supabase
          .from('referrals')
          .select('id')
          .eq('referrer_id', level1Referrer.referred_by)
          .eq('referred_id', userId)
          .eq('level', 2)
          .single();

        if (!existingLevel2) {
          await supabase
            .from('referrals')
            .insert({
              referrer_id: level1Referrer.referred_by,
              referred_id: userId,
              level: 2,
              commission_rate: 0.0005,
              total_earned: level2Commission
            });
        } else {
          await supabase
            .from('referrals')
            .update({
              total_earned: parseFloat(existingLevel2.total_earned) + level2Commission
            })
            .eq('id', existingLevel2.id);
        }

        // Create level 2 referral transaction
        await supabase
          .from('transactions')
          .insert({
            user_id: level1Referrer.referred_by,
            type: 'referral',
            amount: level2Commission,
            wallet_type: 'real',
            status: 'completed',
            metadata: { 
              referredUserId: userId,
              originalBetAmount: betAmount,
              commissionRate: 0.0005,
              level: 2
            }
          });
      }
    }
  } catch (error) {
    logger.error('Referral commission processing error:', error);
  }
};

export default router;