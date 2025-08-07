import crypto from 'crypto';

export const generateSeed = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const generateNonce = (): number => {
  return Math.floor(Math.random() * 1000000);
};

export const verifyGameResult = (
  serverSeed: string,
  clientSeed: string,
  nonce: number
): number => {
  const hash = crypto
    .createHmac('sha256', serverSeed)
    .update(`${clientSeed}:${nonce}`)
    .digest('hex');
  
  // Convert first 8 characters to decimal
  const result = parseInt(hash.substring(0, 8), 16) / Math.pow(2, 32);
  return result;
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
};