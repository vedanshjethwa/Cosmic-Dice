import express from 'express';
import { body, validationResult } from 'express-validator';
import Razorpay from 'razorpay';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

// Create deposit order
router.post('/deposit/create-order', [
  body('amount').isFloat({ min: 100 }),
  body('paymentMethod').isString()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, paymentMethod } = req.body;
    const userId = req.user!.id;

    // Get payment method details
    const { data: method, error: methodError } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('name', paymentMethod)
      .eq('is_active', true)
      .single();

    if (methodError || !method) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    // Validate amount
    if (amount < method.min_amount || amount > method.max_amount) {
      return res.status(400).json({ 
        error: `Amount must be between ${method.min_amount} and ${method.max_amount}` 
      });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `deposit_${userId}_${Date.now()}`,
      notes: {
        userId,
        paymentMethod
      }
    });

    // Create pending transaction
    await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: 'deposit',
        amount,
        wallet_type: 'real',
        status: 'pending',
        payment_method: paymentMethod,
        payment_gateway: 'razorpay',
        gateway_transaction_id: order.id,
        metadata: { orderId: order.id }
      });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    logger.error('Deposit order creation error:', error);
    res.status(500).json({ error: 'Failed to create deposit order' });
  }
});

// Verify deposit payment
router.post('/deposit/verify', [
  body('orderId').isString(),
  body('paymentId').isString(),
  body('signature').isString()
], async (req: AuthRequest, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    const userId = req.user!.id;

    // Verify payment signature
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Get transaction
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .select('*')
      .eq('gateway_transaction_id', orderId)
      .eq('user_id', userId)
      .single();

    if (txError || !transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Update transaction status
    await supabase
      .from('transactions')
      .update({
        status: 'completed',
        gateway_response: { paymentId, signature }
      })
      .eq('id', transaction.id);

    // Update wallet balance
    const { data: wallet } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (wallet) {
      await supabase
        .from('wallets')
        .update({
          real_balance: parseFloat(wallet.real_balance) + parseFloat(transaction.amount),
          total_deposited: parseFloat(wallet.total_deposited) + parseFloat(transaction.amount)
        })
        .eq('user_id', userId);
    }

    res.json({ message: 'Payment verified successfully' });
  } catch (error) {
    logger.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Create withdrawal request
router.post('/withdraw/request', [
  body('amount').isFloat({ min: 1000 }),
  body('paymentMethod').isString(),
  body('paymentDetails').isObject()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, paymentMethod, paymentDetails } = req.body;
    const userId = req.user!.id;

    // Check wallet balance
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (walletError || !wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    if (wallet.is_frozen) {
      return res.status(403).json({ error: 'Wallet is frozen' });
    }

    if (parseFloat(wallet.real_balance) < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Create withdrawal request
    const { data: request, error: requestError } = await supabase
      .from('withdrawal_requests')
      .insert({
        user_id: userId,
        amount,
        payment_method: paymentMethod,
        payment_details: paymentDetails,
        status: 'pending'
      })
      .select()
      .single();

    if (requestError) {
      logger.error('Withdrawal request error:', requestError);
      return res.status(500).json({ error: 'Failed to create withdrawal request' });
    }

    res.json({
      message: 'Withdrawal request created successfully',
      requestId: request.id
    });
  } catch (error) {
    logger.error('Withdrawal request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get withdrawal requests
router.get('/withdraw/requests', async (req: AuthRequest, res) => {
  try {
    const { data: requests, error } = await supabase
      .from('withdrawal_requests')
      .select('*')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Withdrawal requests fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch withdrawal requests' });
    }

    res.json({ requests });
  } catch (error) {
    logger.error('Withdrawal requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;