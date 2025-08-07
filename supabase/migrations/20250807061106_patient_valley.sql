/*
  # Complete Gambling Website Database Schema

  1. New Tables
    - `users` - User accounts with authentication
    - `wallets` - Real money and bonus wallets
    - `transactions` - All financial transactions
    - `games` - Game definitions and settings
    - `game_sessions` - Individual game plays
    - `bonuses` - Bonus definitions and rules
    - `user_bonuses` - User bonus claims and status
    - `referrals` - Referral system tracking
    - `notifications` - User notifications
    - `admin_logs` - Admin activity tracking
    - `cms_content` - Editable content management
    - `promo_codes` - Promotional codes
    - `payment_methods` - Supported payment options
    - `withdrawal_requests` - Withdrawal approval system
    - `user_sessions` - Session management
    - `ip_blocks` - IP blocking system
    - `audit_logs` - Complete audit trail

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for user access
    - Admin-only access for sensitive operations
    - Audit logging for all critical operations

  3. Features
    - Complete user management system
    - Dual wallet system (real + bonus)
    - Comprehensive transaction tracking
    - Game logic and history
    - Bonus and referral systems
    - Admin panel functionality
    - Security and audit logging
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table with comprehensive user management
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text UNIQUE,
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  first_name text,
  last_name text,
  date_of_birth date,
  country text DEFAULT 'IN',
  currency text DEFAULT 'INR',
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  is_banned boolean DEFAULT false,
  ban_reason text,
  last_login timestamptz,
  last_ip inet,
  referral_code text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(6), 'base64'),
  referred_by uuid REFERENCES users(id),
  kyc_status text DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
  kyc_documents jsonb DEFAULT '{}',
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Wallets table for dual wallet system
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  real_balance decimal(15,2) DEFAULT 0.00 CHECK (real_balance >= 0),
  bonus_balance decimal(15,2) DEFAULT 0.00 CHECK (bonus_balance >= 0),
  locked_balance decimal(15,2) DEFAULT 0.00 CHECK (locked_balance >= 0),
  total_deposited decimal(15,2) DEFAULT 0.00,
  total_withdrawn decimal(15,2) DEFAULT 0.00,
  total_wagered decimal(15,2) DEFAULT 0.00,
  total_won decimal(15,2) DEFAULT 0.00,
  is_frozen boolean DEFAULT false,
  freeze_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Transactions table for complete financial tracking
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'bet', 'win', 'bonus', 'referral', 'manual_credit', 'manual_debit')),
  amount decimal(15,2) NOT NULL,
  wallet_type text NOT NULL CHECK (wallet_type IN ('real', 'bonus')) DEFAULT 'real',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method text,
  payment_gateway text,
  gateway_transaction_id text,
  gateway_response jsonb,
  admin_id uuid REFERENCES users(id),
  admin_notes text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Games table for game definitions
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  description text,
  category text NOT NULL,
  min_bet decimal(10,2) DEFAULT 1.00,
  max_bet decimal(10,2) DEFAULT 100000.00,
  house_edge decimal(5,4) DEFAULT 0.02,
  rtp decimal(5,4) DEFAULT 0.98,
  is_active boolean DEFAULT true,
  game_config jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Game sessions for individual game plays
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id uuid NOT NULL REFERENCES games(id),
  bet_amount decimal(15,2) NOT NULL CHECK (bet_amount > 0),
  win_amount decimal(15,2) DEFAULT 0.00 CHECK (win_amount >= 0),
  multiplier decimal(10,4) DEFAULT 0.00,
  game_data jsonb NOT NULL DEFAULT '{}',
  result jsonb NOT NULL DEFAULT '{}',
  seed text,
  client_seed text,
  server_seed text,
  nonce integer,
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'cancelled')),
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Bonuses table for bonus definitions
CREATE TABLE IF NOT EXISTS bonuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('signup', 'deposit', 'daily_login', 'referral', 'cashback', 'promo_code')),
  amount decimal(15,2),
  percentage decimal(5,2),
  max_amount decimal(15,2),
  min_deposit decimal(15,2),
  wagering_requirement decimal(5,2) DEFAULT 1.00,
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  max_claims integer,
  current_claims integer DEFAULT 0,
  is_active boolean DEFAULT true,
  conditions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User bonuses for tracking bonus claims
CREATE TABLE IF NOT EXISTS user_bonuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bonus_id uuid NOT NULL REFERENCES bonuses(id),
  amount decimal(15,2) NOT NULL,
  wagering_requirement decimal(15,2) DEFAULT 0.00,
  wagered_amount decimal(15,2) DEFAULT 0.00,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired', 'cancelled')),
  expires_at timestamptz,
  claimed_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Referrals table for referral system
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referred_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level integer NOT NULL DEFAULT 1 CHECK (level IN (1, 2)),
  commission_rate decimal(5,4) DEFAULT 0.001,
  total_earned decimal(15,2) DEFAULT 0.00,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(referrer_id, referred_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'promotion')),
  is_read boolean DEFAULT false,
  is_global boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Admin logs for admin activity tracking
CREATE TABLE IF NOT EXISTS admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL REFERENCES users(id),
  action text NOT NULL,
  target_user_id uuid REFERENCES users(id),
  details jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- CMS content for editable pages
CREATE TABLE IF NOT EXISTS cms_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  content text NOT NULL,
  meta_description text,
  is_published boolean DEFAULT true,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Promo codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('fixed', 'percentage')),
  value decimal(15,2) NOT NULL,
  max_amount decimal(15,2),
  min_deposit decimal(15,2),
  max_uses integer,
  current_uses integer DEFAULT 0,
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('upi', 'netbanking', 'wallet', 'crypto')),
  provider text NOT NULL,
  min_amount decimal(10,2) DEFAULT 100.00,
  max_amount decimal(10,2) DEFAULT 100000.00,
  processing_fee decimal(5,2) DEFAULT 0.00,
  is_active boolean DEFAULT true,
  config jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Withdrawal requests for approval system
CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount decimal(15,2) NOT NULL CHECK (amount > 0),
  payment_method text NOT NULL,
  payment_details jsonb NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'processing', 'completed')),
  admin_id uuid REFERENCES users(id),
  admin_notes text,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- User sessions for session management
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text NOT NULL,
  ip_address inet NOT NULL,
  user_agent text,
  device_info jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- IP blocks for security
CREATE TABLE IF NOT EXISTS ip_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  reason text NOT NULL,
  blocked_by uuid REFERENCES users(id),
  is_active boolean DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Audit logs for complete audit trail
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  action text NOT NULL,
  table_name text,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Insert default games
INSERT INTO games (name, display_name, description, category, min_bet, max_bet, house_edge, rtp) VALUES
('cosmic_dice', 'Cosmic Dice', 'Roll the cosmic dice and win big', 'luck', 1.00, 100000.00, 0.02, 0.98),
('cosmic_rps', 'Cosmic RPS', 'Rock Paper Scissors with cosmic twists', 'strategy', 1.00, 100000.00, 0.02, 0.98),
('cosmic_limbo', 'Cosmic Limbo', 'How low can you go?', 'risk', 1.00, 100000.00, 0.02, 0.98),
('cosmic_balloon', 'Cosmic Balloon', 'Pop balloons for cosmic rewards', 'luck', 1.00, 100000.00, 0.02, 0.98),
('cosmic_cards', 'Cosmic Cards', 'Pick your fortune card', 'luck', 1.00, 100000.00, 0.02, 0.98),
('cosmic_snakes', 'Cosmic Snakes', 'Navigate through the cosmic maze', 'adventure', 1.00, 100000.00, 0.02, 0.98),
('cosmic_minesweeper', 'Cosmic Minesweeper', 'Navigate the cosmic minefield', 'strategy', 1.00, 100000.00, 0.02, 0.98),
('cosmic_heads_tails', 'Cosmic Heads & Tails', 'Classic coin flip with cosmic rewards', 'luck', 1.00, 100000.00, 0.02, 0.98),
('prediction_pulse', 'Prediction Pulse', 'Time your predictions perfectly', 'timing', 1.00, 100000.00, 0.02, 0.98)
ON CONFLICT (name) DO NOTHING;

-- Insert default bonuses
INSERT INTO bonuses (name, type, amount, percentage, max_amount, wagering_requirement, is_active) VALUES
('Welcome Bonus', 'signup', 100.00, NULL, 100.00, 1.00, true),
('First Deposit Bonus', 'deposit', NULL, 100.00, 5000.00, 35.00, true),
('Daily Login Bonus', 'daily_login', 10.00, NULL, 10.00, 1.00, true),
('Referral Bonus', 'referral', 50.00, NULL, 50.00, 1.00, true)
ON CONFLICT DO NOTHING;

-- Insert default payment methods
INSERT INTO payment_methods (name, type, provider, min_amount, max_amount, is_active) VALUES
('UPI', 'upi', 'razorpay', 100.00, 100000.00, true),
('Net Banking', 'netbanking', 'razorpay', 500.00, 200000.00, true),
('Paytm Wallet', 'wallet', 'razorpay', 100.00, 50000.00, true),
('PhonePe', 'upi', 'razorpay', 100.00, 100000.00, true),
('Google Pay', 'upi', 'razorpay', 100.00, 100000.00, true)
ON CONFLICT DO NOTHING;

-- Insert default CMS content
INSERT INTO cms_content (slug, title, content, is_published) VALUES
('terms-of-service', 'Terms of Service', 'Terms of Service content goes here...', true),
('privacy-policy', 'Privacy Policy', 'Privacy Policy content goes here...', true),
('about-us', 'About Us', 'About Us content goes here...', true),
('faq', 'Frequently Asked Questions', 'FAQ content goes here...', true),
('responsible-gaming', 'Responsible Gaming', 'Responsible Gaming content goes here...', true)
ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bonuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bonuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ip_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for Wallets
CREATE POLICY "Users can read own wallet" ON wallets
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for Transactions
CREATE POLICY "Users can read own transactions" ON transactions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for Game Sessions
CREATE POLICY "Users can read own game sessions" ON game_sessions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own game sessions" ON game_sessions
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for Games (public read)
CREATE POLICY "Anyone can read active games" ON games
  FOR SELECT TO authenticated
  USING (is_active = true);

-- RLS Policies for Bonuses (public read)
CREATE POLICY "Anyone can read active bonuses" ON bonuses
  FOR SELECT TO authenticated
  USING (is_active = true);

-- RLS Policies for User Bonuses
CREATE POLICY "Users can read own bonuses" ON user_bonuses
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for Referrals
CREATE POLICY "Users can read own referrals" ON referrals
  FOR SELECT TO authenticated
  USING (referrer_id = auth.uid() OR referred_id = auth.uid());

-- RLS Policies for Notifications
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR is_global = true);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for CMS Content (public read)
CREATE POLICY "Anyone can read published content" ON cms_content
  FOR SELECT TO authenticated
  USING (is_published = true);

-- RLS Policies for Payment Methods (public read)
CREATE POLICY "Anyone can read active payment methods" ON payment_methods
  FOR SELECT TO authenticated
  USING (is_active = true);

-- RLS Policies for Withdrawal Requests
CREATE POLICY "Users can read own withdrawal requests" ON withdrawal_requests
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own withdrawal requests" ON withdrawal_requests
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_users_referred_by ON users(referred_by);
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_id ON game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_game_id ON game_sessions(game_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_created_at ON game_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_user_bonuses_user_id ON user_bonuses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bonuses_status ON user_bonuses(status);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_global ON notifications(is_global);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token_hash ON user_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_ip_blocks_ip_address ON ip_blocks(ip_address);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Create functions for automatic wallet creation
CREATE OR REPLACE FUNCTION create_user_wallet()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wallets (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic wallet creation
DROP TRIGGER IF EXISTS create_wallet_on_user_insert ON users;
CREATE TRIGGER create_wallet_on_user_insert
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_wallet();

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_wallets_updated_at ON wallets;
CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON wallets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function for audit logging
CREATE OR REPLACE FUNCTION log_audit_trail()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (action, table_name, record_id, new_values)
    VALUES (TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (action, table_name, record_id, old_values, new_values)
    VALUES (TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (action, table_name, record_id, old_values)
    VALUES (TG_OP, TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create audit triggers for critical tables
DROP TRIGGER IF EXISTS audit_users ON users;
CREATE TRIGGER audit_users
  AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW
  EXECUTE FUNCTION log_audit_trail();

DROP TRIGGER IF EXISTS audit_wallets ON wallets;
CREATE TRIGGER audit_wallets
  AFTER INSERT OR UPDATE OR DELETE ON wallets
  FOR EACH ROW
  EXECUTE FUNCTION log_audit_trail();

DROP TRIGGER IF EXISTS audit_transactions ON transactions;
CREATE TRIGGER audit_transactions
  AFTER INSERT OR UPDATE OR DELETE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION log_audit_trail();