import crypto from 'crypto';

export const hashCryptoCode = (code) => crypto.createHash('sha256').update(code).digest('hex');