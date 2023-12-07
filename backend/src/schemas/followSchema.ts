import { z } from 'zod';

export const followUserSchema = z.object({
  followerId: z.string().cuid({ message: 'Follower Id must be an cuid' }),
});
