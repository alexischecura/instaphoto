import { NextFunction, Request, Response } from 'express';
import { hashtagRegex } from '../utils/regexs';
import { createPost, getUsersPost } from '../services/postService';
import { CreatePostType } from '../schemas/postSchema';
import { InternalServerError } from '../utils/AppError';
import { findUserWithFollowers } from '../services/userService';

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

export const getFolloweesPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserWithFollowers({
      where: { id: res.locals.user?.id },
    });

    const followeesIds = user?.followees.map((follow) => follow.followerId);

    const page = req.query.page ? +req.query.page : 1;
    const limit = req.query.limit ? +req.query.limit : 5;
    const skip = (page - 1) * limit;

    const posts = await getUsersPost(followeesIds, limit, skip);

    if (posts.length == 0) return res.status(204).send();

    res.status(200).json(posts);
  } catch (error) {
    return next(
      new InternalServerError(
        'Something went wrong trying to get the followees posts'
      )
    );
  }
};
