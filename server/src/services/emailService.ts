import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@cosmic777.com',
      to,
      subject,
      text,
      html: html || text
    };

    const result = await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully:', { to, subject, messageId: result.messageId });
    return result;
  } catch (error) {
    logger.error('Email send error:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email: string, username: string) => {
  const subject = 'Welcome to Cosmic777!';
  const html = `
    <h1>Welcome to Cosmic777, ${username}!</h1>
    <p>Thank you for joining our cosmic gaming community.</p>
    <p>Your account has been created successfully. You can now:</p>
    <ul>
      <li>Deposit funds to your wallet</li>
      <li>Play our exciting games</li>
      <li>Claim bonuses and rewards</li>
      <li>Refer friends and earn commissions</li>
    </ul>
    <p>Happy gaming!</p>
    <p>The Cosmic777 Team</p>
  `;
  
  return sendEmail(email, subject, '', html);
};

export const sendDepositConfirmation = async (email: string, amount: number) => {
  const subject = 'Deposit Confirmation';
  const html = `
    <h1>Deposit Successful!</h1>
    <p>Your deposit of ₹${amount} has been processed successfully.</p>
    <p>The funds have been added to your wallet and are ready to use.</p>
    <p>Happy gaming!</p>
  `;
  
  return sendEmail(email, subject, '', html);
};

export const sendWithdrawalConfirmation = async (email: string, amount: number) => {
  const subject = 'Withdrawal Processed';
  const html = `
    <h1>Withdrawal Successful!</h1>
    <p>Your withdrawal of ₹${amount} has been processed successfully.</p>
    <p>The funds will be transferred to your account within 24-48 hours.</p>
    <p>Thank you for playing with us!</p>
  `;
  
  return sendEmail(email, subject, '', html);
};