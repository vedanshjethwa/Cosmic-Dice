import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest, adminMiddleware } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

// Get CMS content by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: content, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error || !content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json({ content });
  } catch (error) {
    logger.error('CMS content fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all CMS content (admin only)
router.get('/', adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const { data: content, error } = await supabase
      .from('cms_content')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('CMS content list error:', error);
      return res.status(500).json({ error: 'Failed to fetch content' });
    }

    res.json({ content });
  } catch (error) {
    logger.error('CMS content list error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create/update CMS content (admin only)
router.post('/', adminMiddleware, [
  body('slug').isString().isLength({ min: 1, max: 100 }),
  body('title').isString().isLength({ min: 1, max: 200 }),
  body('content').isString(),
  body('metaDescription').optional().isString().isLength({ max: 300 }),
  body('isPublished').optional().isBoolean()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { slug, title, content, metaDescription, isPublished } = req.body;

    // Check if content exists
    const { data: existing } = await supabase
      .from('cms_content')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      // Update existing content
      await supabase
        .from('cms_content')
        .update({
          title,
          content,
          meta_description: metaDescription,
          is_published: isPublished !== undefined ? isPublished : true
        })
        .eq('slug', slug);
    } else {
      // Create new content
      await supabase
        .from('cms_content')
        .insert({
          slug,
          title,
          content,
          meta_description: metaDescription,
          is_published: isPublished !== undefined ? isPublished : true,
          created_by: req.user!.id
        });
    }

    res.json({ message: 'Content saved successfully' });
  } catch (error) {
    logger.error('CMS content save error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete CMS content (admin only)
router.delete('/:slug', adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const { slug } = req.params;

    const { error } = await supabase
      .from('cms_content')
      .delete()
      .eq('slug', slug);

    if (error) {
      logger.error('CMS content delete error:', error);
      return res.status(500).json({ error: 'Failed to delete content' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    logger.error('CMS content delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;