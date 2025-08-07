import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { hashPassword } from '../utils/crypto';
import { logger } from '../utils/logger';

const router = express.Router();

// Get user profile
router.get('/profile', async (req: AuthRequest, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        id, email, username, first_name, last_name, 
        phone, country, currency, is_verified, 
        referral_code, created_at,
        wallets(real_balance, bonus_balance, total_deposited, total_withdrawn, total_wagered, total_won)
      `)
      .eq('id', req.user!.id)
      .single();

    if (error) {
      logger.error('Profile fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch profile' });
    }

    res.json({ user });
  } catch (error) {
    logger.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', [
  body('firstName').optional().isString().isLength({ min: 1, max: 50 }),
  body('lastName').optional().isString().isLength({ min: 1, max: 50 }),
  body('phone').optional().isMobilePhone('any'),
  body('country').optional().isString().isLength({ min: 2, max: 2 }),
  body('currency').optional().isIn(['INR', 'USD', 'EUR'])
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, phone, country, currency } = req.body;
    const updateData: any = {};

    if (firstName !== undefined) updateData.first_name = firstName;
    if (lastName !== undefined) updateData.last_name = lastName;
    if (phone !== undefined) updateData.phone = phone;
    if (country !== undefined) updateData.country = country;
    if (currency !== undefined) updateData.currency = currency;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const { error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', req.user!.id);

    if (error) {
      logger.error('Profile update error:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    logger.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Change password
router.post('/change-password', [
  body('currentPassword').isString(),
  body('newPassword').isLength({ min: 8 })
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    // Get current user
    const { data: user, error } = await supabase
      .from('users')
      .select('password_hash')
      .eq('id', req.user!.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const bcrypt = await import('bcryptjs');
    const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password
    await supabase
      .from('users')
      .update({ password_hash: newPasswordHash })
      .eq('id', req.user!.id);

    // Invalidate all user sessions
    await supabase
      .from('user_sessions')
      .update({ is_active: false })
      .eq('user_id', req.user!.id);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    logger.error('Password change error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user statistics
router.get('/stats', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    // Get game statistics
    const { data: gameSessions } = await supabase
      .from('game_sessions')
      .select('bet_amount, win_amount, created_at, games(display_name)')
      .eq('user_id', userId);

    // Calculate stats
    const totalGames = gameSessions?.length || 0;
    const totalWagered = gameSessions?.reduce((sum, s) => sum + parseFloat(s.bet_amount), 0) || 0;
    const totalWon = gameSessions?.reduce((sum, s) => sum + parseFloat(s.win_amount), 0) || 0;
    const netProfit = totalWon - totalWagered;
    const winRate = totalGames > 0 ? (gameSessions?.filter(s => parseFloat(s.win_amount) > 0).length / totalGames * 100) : 0;

    // Get favorite game
    const gameFrequency = gameSessions?.reduce((acc: any, session: any) => {
      const gameName = session.games.display_name;
      acc[gameName] = (acc[gameName] || 0) + 1;
      return acc;
    }, {});

    const favoriteGame = gameFrequency ? 
      Object.keys(gameFrequency).reduce((a, b) => gameFrequency[a] > gameFrequency[b] ? a : b) : 
      null;

    res.json({
      totalGames,
      totalWagered,
      totalWon,
      netProfit,
      winRate: Math.round(winRate * 100) / 100,
      favoriteGame,
      gamesPlayed: Object.keys(gameFrequency || {}).length
    });
  } catch (error) {
    logger.error('User stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;