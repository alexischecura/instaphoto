import { z } from 'zod';

export const createPostSchema = z.object({
  image: z.any(),
  content: z.string().max(2048, 'Content must be less than 2048 characters'),
});
