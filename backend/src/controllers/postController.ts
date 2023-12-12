import { NextFunction, Request, Response } from 'express';
import { hashtagRegex } from '../utils/regexs';
import { createPost } from '../services/postService';
import { CreatePostType } from '../schemas/postSchema';
import { InternalServerError } from '../utils/AppError';

export const createPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { photoUrl, content } = req.body;
    const { id } = res.locals?.user;

    const tags = content.match(hashtagRegex);

    const post = await createPost({ photoUrl, content }, id, tags);
    res.status(201).json({ status: 'success', post });
  } catch (error) {
    return next(
      new InternalServerError('Something went wrong trying to create the post')
    );
  }
};
