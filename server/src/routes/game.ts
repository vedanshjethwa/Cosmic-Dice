import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';
import { generateSeed, generateNonce, verifyGameResult } from '../utils/crypto';
import { logger } from '../utils/logger';
import { io } from '../index';

const router = express.Router();

// Get available games
router.get('/list', async (req: AuthRequest, res) => {
  try {
    const { data: games, error } = await supabase
      .from('games')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      logger.error('Games fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch games' });
    }

    res.json({ games });
  } catch (error) {
    logger.error('Games list error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Place bet
router.post('/bet', [
  body('gameId').isUUID(),
  body('betAmount').isFloat({ min: 0.01 }),
  body('gameData').isObject(),
  body('clientSeed').optional().isString()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gameId, betAmount, gameData, clientSeed } = req.body;
    const userId = req.user!.id;

    // Get game details
    const { data: game, error: gameError } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .eq('is_active', true)
      .single();

    if (gameError || !game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Validate bet amount
    if (betAmount < game.min_bet || betAmount > game.max_bet) {
      return res.status(400).json({ 
        error: `Bet amount must be between ${game.min_bet} and ${game.max_bet}` 
      });
    }

    // Get user wallet
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

    // Check sufficient balance
    const totalBalance = parseFloat(wallet.real_balance) + parseFloat(wallet.bonus_balance);
    if (totalBalance < betAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Generate provably fair seeds
    const serverSeed = generateSeed();
    const nonce = generateNonce();
    const finalClientSeed = clientSeed || generateSeed();

    // Calculate game result based on game type
    const gameResult = calculateGameResult(game.name, gameData, serverSeed, finalClientSeed, nonce);

    // Deduct bet amount from wallet
    let realDeduction = 0;
    let bonusDeduction = 0;
    
    if (parseFloat(wallet.real_balance) >= betAmount) {
      realDeduction = betAmount;
    } else {
      realDeduction = parseFloat(wallet.real_balance);
      bonusDeduction = betAmount - realDeduction;
    }

    const newRealBalance = parseFloat(wallet.real_balance) - realDeduction;
    const newBonusBalance = parseFloat(wallet.bonus_balance) - bonusDeduction;

    // Update wallet with bet deduction
    await supabase
      .from('wallets')
      .update({
        real_balance: newRealBalance,
        bonus_balance: newBonusBalance,
        total_wagered: parseFloat(wallet.total_wagered) + betAmount
      })
      .eq('user_id', userId);

    // Create bet transaction
    await supabase
      .from('transactions')
      .insert({
        user_id: userId,
        type: 'bet',
        amount: -betAmount,
        wallet_type: realDeduction > 0 ? 'real' : 'bonus',
        status: 'completed'
      });

    // Handle win
    if (gameResult.winAmount > 0) {
      const newTotalWon = parseFloat(wallet.total_won) + gameResult.winAmount;
      
      await supabase
        .from('wallets')
        .update({
          real_balance: newRealBalance + gameResult.winAmount,
          total_won: newTotalWon
        })
        .eq('user_id', userId);

      // Create win transaction
      await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          type: 'win',
          amount: gameResult.winAmount,
          wallet_type: 'real',
          status: 'completed'
        });
    }

    // Create game session record
    const { data: session, error: sessionError } = await supabase
      .from('game_sessions')
      .insert({
        user_id: userId,
        game_id: gameId,
        bet_amount: betAmount,
        win_amount: gameResult.winAmount,
        multiplier: gameResult.multiplier,
        game_data: gameData,
        result: gameResult.result,
        seed: serverSeed,
        client_seed: finalClientSeed,
        server_seed: serverSeed,
        nonce,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      })
      .select()
      .single();

    if (sessionError) {
      logger.error('Game session creation error:', sessionError);
    }

    // Emit real-time update
    io.to(`user_${userId}`).emit('game_result', {
      sessionId: session?.id,
      result: gameResult,
      newBalance: {
        real: newRealBalance + (gameResult.winAmount || 0),
        bonus: newBonusBalance
      }
    });

    res.json({
      sessionId: session?.id,
      result: gameResult,
      seeds: {
        server: serverSeed,
        client: finalClientSeed,
        nonce
      }
    });
  } catch (error) {
    logger.error('Bet placement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get game history
router.get('/history', async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const gameId = req.query.gameId as string;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('game_sessions')
      .select(`
        *,
        games(name, display_name)
      `)
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (gameId) {
      query = query.eq('game_id', gameId);
    }

    const { data: sessions, error } = await query;

    if (error) {
      logger.error('Game history error:', error);
      return res.status(500).json({ error: 'Failed to fetch game history' });
    }

    res.json({
      sessions,
      pagination: {
        page,
        limit,
        hasMore: sessions.length === limit
      }
    });
  } catch (error) {
    logger.error('Game history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Game result calculation function
function calculateGameResult(gameName: string, gameData: any, serverSeed: string, clientSeed: string, nonce: number) {
  const randomValue = verifyGameResult(serverSeed, clientSeed, nonce);
  
  switch (gameName) {
    case 'cosmic_dice':
      return calculateDiceResult(gameData, randomValue);
    case 'cosmic_rps':
      return calculateRPSResult(gameData, randomValue);
    case 'cosmic_limbo':
      return calculateLimboResult(gameData, randomValue);
    case 'cosmic_balloon':
      return calculateBalloonResult(gameData, randomValue);
    case 'cosmic_cards':
      return calculateCardsResult(gameData, randomValue);
    case 'cosmic_snakes':
      return calculateSnakesResult(gameData, randomValue);
    case 'cosmic_minesweeper':
      return calculateMinesweeperResult(gameData, randomValue);
    case 'cosmic_heads_tails':
      return calculateHeadsTailsResult(gameData, randomValue);
    case 'prediction_pulse':
      return calculatePredictionResult(gameData, randomValue);
    default:
      throw new Error('Unknown game type');
  }
}

// Game-specific result calculations
function calculateDiceResult(gameData: any, randomValue: number) {
  const { selectedNumber, betAmount } = gameData;
  const diceResult = Math.floor(randomValue * 6) + 1;
  const isWin = diceResult === selectedNumber;
  const multiplier = isWin ? 5.0 : 0;
  const winAmount = isWin ? betAmount * multiplier : 0;

  return {
    result: { diceValue: diceResult, selectedNumber, isWin },
    winAmount,
    multiplier
  };
}

function calculateRPSResult(gameData: any, randomValue: number) {
  const { playerChoice, betAmount } = gameData;
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(randomValue * 3)];
  
  let result = 'draw';
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'win';
  } else if (playerChoice !== computerChoice) {
    result = 'lose';
  }

  const multiplier = result === 'win' ? 2.0 : result === 'draw' ? 1.0 : 0;
  const winAmount = betAmount * multiplier;

  return {
    result: { playerChoice, computerChoice, outcome: result },
    winAmount,
    multiplier
  };
}

function calculateLimboResult(gameData: any, randomValue: number) {
  const { targetMultiplier, betAmount } = gameData;
  const crashPoint = 1 / (1 - randomValue);
  const isWin = crashPoint >= targetMultiplier;
  const winAmount = isWin ? betAmount * targetMultiplier : 0;

  return {
    result: { crashPoint, targetMultiplier, isWin },
    winAmount,
    multiplier: isWin ? targetMultiplier : 0
  };
}

function calculateBalloonResult(gameData: any, randomValue: number) {
  const { betAmount } = gameData;
  const multipliers = [0.2, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0];
  const selectedMultiplier = multipliers[Math.floor(randomValue * multipliers.length)];
  const winAmount = betAmount * selectedMultiplier;

  return {
    result: { multiplier: selectedMultiplier },
    winAmount,
    multiplier: selectedMultiplier
  };
}

function calculateCardsResult(gameData: any, randomValue: number) {
  const { betAmount, riskLevel } = gameData;
  const winChances = { low: 0.4, medium: 0.2, high: 0.1 };
  const multipliers = { low: 2.5, medium: 5.0, high: 10.0 };
  
  const isWin = randomValue < winChances[riskLevel as keyof typeof winChances];
  const multiplier = isWin ? multipliers[riskLevel as keyof typeof multipliers] : 0;
  const winAmount = betAmount * multiplier;

  return {
    result: { riskLevel, isWin },
    winAmount,
    multiplier
  };
}

function calculateSnakesResult(gameData: any, randomValue: number) {
  const { betAmount, snakeCount } = gameData;
  const totalTiles = 25;
  const winChance = (totalTiles - snakeCount) / totalTiles;
  const isWin = randomValue < winChance;
  const multiplier = isWin ? (1 + snakeCount * 0.5) : 0;
  const winAmount = betAmount * multiplier;

  return {
    result: { snakeCount, isWin },
    winAmount,
    multiplier
  };
}

function calculateMinesweeperResult(gameData: any, randomValue: number) {
  const { betAmount, difficulty } = gameData;
  const winChances = { low: 0.6, mid: 0.3, high: 0.15 };
  const multipliers = { low: 1.5, mid: 3.0, high: 6.0 };
  
  const isWin = randomValue < winChances[difficulty as keyof typeof winChances];
  const multiplier = isWin ? multipliers[difficulty as keyof typeof multipliers] : 0;
  const winAmount = betAmount * multiplier;

  return {
    result: { difficulty, isWin },
    winAmount,
    multiplier
  };
}

function calculateHeadsTailsResult(gameData: any, randomValue: number) {
  const { selectedSide, betAmount } = gameData;
  const result = randomValue < 0.5 ? 'heads' : 'tails';
  const isWin = result === selectedSide;
  const multiplier = isWin ? 2.0 : 0;
  const winAmount = betAmount * multiplier;

  return {
    result: { selectedSide, actualResult: result, isWin },
    winAmount,
    multiplier
  };
}

function calculatePredictionResult(gameData: any, randomValue: number) {
  const { betAmount, difficulty } = gameData;
  const winChances = { low: 0.4, mid: 0.2, high: 0.1 };
  const multipliers = { low: 2.0, mid: 5.0, high: 10.0 };
  
  const isWin = randomValue < winChances[difficulty as keyof typeof winChances];
  const multiplier = isWin ? multipliers[difficulty as keyof typeof multipliers] : 0;
  const winAmount = betAmount * multiplier;

  return {
    result: { difficulty, isWin },
    winAmount,
    multiplier
  };
}

export default router;