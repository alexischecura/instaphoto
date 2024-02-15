import expressRateLimit from 'express-rate-limit';

export const rateLimit = expressRateLimit({
  windowMs: 1600 * 1000,
  max: 200,
  message: 'Too many request from this IP, please try again in an hour',
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
