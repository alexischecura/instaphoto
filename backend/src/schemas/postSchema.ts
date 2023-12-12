import { z } from 'zod';

export const createPostSchema = z.object({
  photoUrl: z.string({
    required_error: "Please provide the photo's url",
    invalid_type_error: 'postUrl must be a string',
  }),
  content: z.string({
    required_error: 'Please provide the content of the post',
    invalid_type_error: 'content must be a string',
  }),
});
export type CreatePostType = z.infer<typeof createPostSchema>;
