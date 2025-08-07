import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest, adminMiddleware } from '../middleware/auth';
import { logger } from '../utils/logger';
import { io } from '../index';

const router = express.Router();

// Get user notifications
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .or(`user_id.eq.${req.user!.id},is_global.eq.true`)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      logger.error('Notifications fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch notifications' });
    }

    res.json({ notifications });
  } catch (error) {
    logger.error('Notifications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark notification as read
router.post('/:notificationId/read', async (req: AuthRequest, res) => {
  try {
    const { notificationId } = req.params;

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', req.user!.id);

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    logger.error('Mark notification read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark all notifications as read
router.post('/read-all', async (req: AuthRequest, res) => {
  try {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', req.user!.id)
      .eq('is_read', false);

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    logger.error('Mark all notifications read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send notification (admin only)
router.post('/send', adminMiddleware, [
  body('title').isString().isLength({ min: 1, max: 100 }),
  body('message').isString().isLength({ min: 1, max: 500 }),
  body('type').isIn(['info', 'success', 'warning', 'error', 'promotion']),
  body('userId').optional().isUUID(),
  body('isGlobal').optional().isBoolean()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, message, type, userId, isGlobal } = req.body;

    const notificationData = {
      title,
      message,
      type,
      user_id: isGlobal ? null : userId,
      is_global: isGlobal || false
    };

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert(notificationData)
      .select()
      .single();

    if (error) {
      logger.error('Notification creation error:', error);
      return res.status(500).json({ error: 'Failed to create notification' });
    }

    // Send real-time notification
    if (isGlobal) {
      io.emit('notification', notification);
    } else if (userId) {
      io.to(`user_${userId}`).emit('notification', notification);
    }

    res.json({ message: 'Notification sent successfully' });
  } catch (error) {
    logger.error('Send notification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;