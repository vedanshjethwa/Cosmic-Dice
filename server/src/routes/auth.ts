import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/database';
import { hashPassword, comparePassword, generateOTP } from '../utils/crypto';
import { sendEmail } from '../services/emailService';
import { logger } from '../utils/logger';

const router = express.Router();

// Register user
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('username').isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body('phone').optional().isMobilePhone('any'),
  body('referralCode').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username, phone, referralCode } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${email},username.eq.${username}${phone ? `,phone.eq.${phone}` : ''}`)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Handle referral
    let referredBy = null;
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('users')
        .select('id')
        .eq('referral_code', referralCode)
        .single();
      
      if (referrer) {
        referredBy = referrer.id;
      }
    }

    // Create user
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: passwordHash,
        username,
        phone,
        referred_by: referredBy
      })
      .select()
      .single();

    if (userError) {
      logger.error('User creation error:', userError);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Create referral relationship if applicable
    if (referredBy) {
      await supabase
        .from('referrals')
        .insert({
          referrer_id: referredBy,
          referred_id: newUser.id,
          level: 1
        });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: 'user' },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        referralCode: newUser.referral_code
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const ip = req.ip;

    // Get user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.is_active || user.is_banned) {
      return res.status(403).json({ error: 'Account is suspended or banned' });
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await supabase
      .from('users')
      .update({ 
        last_login: new Date().toISOString(),
        last_ip: ip
      })
      .eq('id', user.id);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: 'user' },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Create session
    await supabase
      .from('user_sessions')
      .insert({
        user_id: user.id,
        token_hash: crypto.createHash('sha256').update(token).digest('hex'),
        ip_address: ip,
        user_agent: req.get('User-Agent'),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        referralCode: user.referral_code
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send OTP
router.post('/send-otp', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    
    // Store OTP in cache/database (implement your preferred method)
    // For now, we'll use a simple in-memory store
    
    await sendEmail(email, 'Your OTP Code', `Your OTP code is: ${otp}`);
    
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    logger.error('OTP send error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', [
  body('email').isEmail().normalizeEmail(),
  body('otp').isLength({ min: 6, max: 6 })
], async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Verify OTP (implement your verification logic)
    // For demo purposes, we'll accept any 6-digit code
    
    await supabase
      .from('users')
      .update({ is_verified: true })
      .eq('email', email);
    
    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    logger.error('OTP verification error:', error);
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      await supabase
        .from('user_sessions')
        .update({ is_active: false })
        .eq('token_hash', tokenHash);
    }
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

export default router;