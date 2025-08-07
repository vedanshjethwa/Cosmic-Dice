import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest, adminMiddleware } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

// Apply admin middleware to all routes
router.use(adminMiddleware);

// Get dashboard stats
router.get('/dashboard', async (req: AuthRequest, res) => {
  try {
    // Get user stats
    const { data: userStats } = await supabase
      .from('users')
      .select('id, is_active, is_banned, created_at');

    // Get transaction stats
    const { data: transactionStats } = await supabase
      .from('transactions')
      .select('type, amount, status, created_at');

    // Get game stats
    const { data: gameStats } = await supabase
      .from('game_sessions')
      .select('bet_amount, win_amount, created_at');

    // Calculate metrics
    const totalUsers = userStats?.length || 0;
    const activeUsers = userStats?.filter(u => u.is_active).length || 0;
    const bannedUsers = userStats?.filter(u => u.is_banned).length || 0;

    const totalDeposits = transactionStats
      ?.filter(t => t.type === 'deposit' && t.status === 'completed')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0) || 0;

    const totalWithdrawals = transactionStats
      ?.filter(t => t.type === 'withdrawal' && t.status === 'completed')
      .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0) || 0;

    const totalWagered = gameStats
      ?.reduce((sum, g) => sum + parseFloat(g.bet_amount), 0) || 0;

    const totalWon = gameStats
      ?.reduce((sum, g) => sum + parseFloat(g.win_amount), 0) || 0;

    const houseProfit = totalWagered - totalWon;

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        banned: bannedUsers
      },
      financials: {
        totalDeposits,
        totalWithdrawals,
        totalWagered,
        totalWon,
        houseProfit,
        netRevenue: totalDeposits - totalWithdrawals
      },
      games: {
        totalSessions: gameStats?.length || 0,
        averageBet: totalWagered / (gameStats?.length || 1),
        houseEdge: ((totalWagered - totalWon) / totalWagered * 100) || 0
      }
    });
  } catch (error) {
    logger.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
router.get('/users', async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const search = req.query.search as string;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('users')
      .select(`
        *,
        wallets(real_balance, bonus_balance, total_deposited, total_withdrawn)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(`email.ilike.%${search}%,username.ilike.%${search}%`);
    }

    const { data: users, error } = await query;

    if (error) {
      logger.error('Users fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    res.json({ users });
  } catch (error) {
    logger.error('Admin users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ban/unban user
router.post('/users/:userId/ban', [
  body('banned').isBoolean(),
  body('reason').optional().isString()
], async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params;
    const { banned, reason } = req.body;

    await supabase
      .from('users')
      .update({
        is_banned: banned,
        ban_reason: banned ? reason : null
      })
      .eq('id', userId);

    // Log admin action
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: req.user!.id,
        action: banned ? 'ban_user' : 'unban_user',
        target_user_id: userId,
        details: { reason },
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });

    res.json({ message: `User ${banned ? 'banned' : 'unbanned'} successfully` });
  } catch (error) {
    logger.error('User ban error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get withdrawal requests for approval
router.get('/withdrawals', async (req: AuthRequest, res) => {
  try {
    const status = req.query.status as string || 'pending';

    const { data: requests, error } = await supabase
      .from('withdrawal_requests')
      .select(`
        *,
        users(username, email)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Withdrawal requests fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch withdrawal requests' });
    }

    res.json({ requests });
  } catch (error) {
    logger.error('Admin withdrawals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve/reject withdrawal
router.post('/withdrawals/:requestId/process', [
  body('action').isIn(['approve', 'reject']),
  body('notes').optional().isString()
], async (req: AuthRequest, res) => {
  try {
    const { requestId } = req.params;
    const { action, notes } = req.body;

    const { data: request, error: requestError } = await supabase
      .from('withdrawal_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (requestError || !request) {
      return res.status(404).json({ error: 'Withdrawal request not found' });
    }

    if (action === 'approve') {
      // Deduct from wallet
      const { data: wallet } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', request.user_id)
        .single();

      if (wallet && parseFloat(wallet.real_balance) >= parseFloat(request.amount)) {
        await supabase
          .from('wallets')
          .update({
            real_balance: parseFloat(wallet.real_balance) - parseFloat(request.amount),
            total_withdrawn: parseFloat(wallet.total_withdrawn) + parseFloat(request.amount)
          })
          .eq('user_id', request.user_id);

        // Create withdrawal transaction
        await supabase
          .from('transactions')
          .insert({
            user_id: request.user_id,
            type: 'withdrawal',
            amount: -parseFloat(request.amount),
            wallet_type: 'real',
            status: 'completed',
            admin_id: req.user!.id,
            admin_notes: notes
          });
      }
    }

    // Update withdrawal request
    await supabase
      .from('withdrawal_requests')
      .update({
        status: action === 'approve' ? 'approved' : 'rejected',
        admin_id: req.user!.id,
        admin_notes: notes,
        processed_at: new Date().toISOString()
      })
      .eq('id', requestId);

    // Log admin action
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: req.user!.id,
        action: `${action}_withdrawal`,
        details: { requestId, amount: request.amount, notes },
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });

    res.json({ message: `Withdrawal ${action}d successfully` });
  } catch (error) {
    logger.error('Withdrawal processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get game statistics
router.get('/games/stats', async (req: AuthRequest, res) => {
  try {
    const { data: gameStats, error } = await supabase
      .from('game_sessions')
      .select(`
        game_id,
        bet_amount,
        win_amount,
        games(name, display_name)
      `);

    if (error) {
      logger.error('Game stats error:', error);
      return res.status(500).json({ error: 'Failed to fetch game stats' });
    }

    // Group by game
    const statsByGame = gameStats.reduce((acc: any, session: any) => {
      const gameId = session.game_id;
      if (!acc[gameId]) {
        acc[gameId] = {
          name: session.games.display_name,
          totalSessions: 0,
          totalWagered: 0,
          totalWon: 0,
          houseProfit: 0
        };
      }
      
      acc[gameId].totalSessions++;
      acc[gameId].totalWagered += parseFloat(session.bet_amount);
      acc[gameId].totalWon += parseFloat(session.win_amount);
      acc[gameId].houseProfit = acc[gameId].totalWagered - acc[gameId].totalWon;
      
      return acc;
    }, {});

    res.json({ gameStats: Object.values(statsByGame) });
  } catch (error) {
    logger.error('Game stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Control game status
router.post('/games/:gameId/toggle', async (req: AuthRequest, res) => {
  try {
    const { gameId } = req.params;
    const { isActive } = req.body;

    await supabase
      .from('games')
      .update({ is_active: isActive })
      .eq('id', gameId);

    // Log admin action
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: req.user!.id,
        action: isActive ? 'enable_game' : 'disable_game',
        details: { gameId },
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });

    res.json({ message: `Game ${isActive ? 'enabled' : 'disabled'} successfully` });
  } catch (error) {
    logger.error('Game toggle error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;