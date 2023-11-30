import { z } from 'zod';

export const loginUserSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Please provide a phone number, email or username')
    .max(50),
  password: z
    .string()
    .min(1, 'Please provide your password')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const signUpUserSchema = z.object({
  email: z
    .string()
    .min(1, 'Please provide an email')
    .max(50)
    .email('Please provide a valid email'),
  fullName: z.string().min(1, 'Please provide your Full Name').max(50),
  username: z.string().min(1, 'Please provide your username').max(20),
  password: z
    .string()
    .min(1, 'Please provide your password')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const emailVerificationSchema = z.object({
  verificationCode: z.string().min(1, 'Please provide an verification code'),
});
