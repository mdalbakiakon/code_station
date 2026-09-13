import rateLimit from 'express-rate-limit';

export const forgotPasswordLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: { message: "too many attempts, please try again later" },
    standardHeaders: true,
    legacyHeaders: false
});

export const resetPasswordLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    message: { message: "too many attempts, please try again later" },
    standardHeaders: true,
    legacyHeaders: false
});

export default { forgotPasswordLimiter, resetPasswordLimiter };