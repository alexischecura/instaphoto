import { z } from 'zod';

const positiveNumbersRegex = /^\d+$/;

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

export const postPaginationSchema = z.object({
  page: z
    .string()
    .regex(positiveNumbersRegex, {
      message: 'Page must be a positive number',
    })
    .optional(),
  limit: z
    .string()
    .regex(positiveNumbersRegex, {
      message: 'Limit must be a number',
    })
    .optional(),
});

export const postIdSchema = z.object({
  postId: z.string().cuid(),
});
export const commentSchema = z.object({
  comment: z.string(),
});

export type PostPaginationType = z.infer<typeof postPaginationSchema>;
