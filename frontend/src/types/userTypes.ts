import { z } from 'zod';

export const loginUserSchema = z.object({
  user: z
    .string()
    .min(1, 'Please provide a phone number, email or username')
    .max(255),
  password: z
    .string()
    .min(1, 'Please provide your password')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});
export type LoginUserType = z.infer<typeof loginUserSchema>;
