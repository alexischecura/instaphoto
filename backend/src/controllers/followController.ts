import { NextFunction, Request, Response } from 'express';
import {
  findManyUsers,
  findUserWithFollowers,
  findUniqueUser,
} from '../services/userService';
import { createAFollow, removeAFollow } from '../services/followService';
import {
  AuthenticationError,
  InternalServerError,
  ValidationError,
} from '../utils/AppError';

export const getSuggestedProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await findUserWithFollowers({
    where: { id: res.locals.user?.id },
  });

  if (!user)
    return next(
      new InternalServerError(
        'Logged user not found, please use this route only with authenticated users'
      )
    );

  const followeesIds = user.followees.map((follow) => follow.followerId);

  const profiles = await findManyUsers({
    excludedIds: [...followeesIds, user.id],
    select: {
      fullName: true,
      username: true,
      profilePhoto: true,
      id: true,
    },
    limit: 5,
  });
  res.status(200).json(profiles);
};

export const followAnUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { followerId } = req.body;

  try {
    const user = await findUserWithFollowers({
      where: { id: res.locals.user?.id },
    });

    if (!user) {
      return next(new AuthenticationError(`You are not logged in`));
    }
    const follower = await findUniqueUser({ where: { id: followerId } });

    if (!follower) {
      return next(
        new ValidationError(`Follower with the id "${followerId}" not found`)
      );
    }

    if (user.followees.some((follow) => follow.followerId === follower.id)) {
      return next(
        new ValidationError(
          `You are already following the user ${follower.username}`
        )
      );
    }

    const follow = await createAFollow({
      followeeId: user.id,
      followerId,
    });

    if (!follow) {
      return next(
        new ValidationError('Something went wrong trying to follow an user')
      );
    }

    res.status(201).json({
      status: 'success',
      message: `You start to following the user ${follower.username}`,
    });
  } catch (error) {
    if (error instanceof Error)
      return next(
        new InternalServerError(
          error?.message || 'Something went wrong trying to follow an user'
        )
      );
    return next(error);
  }
};

export const unfollowAnUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { followerId } = req.body;

  try {
    const user = await findUserWithFollowers({
      where: { id: res.locals.user?.id },
    });

    if (!user) {
      return next(new AuthenticationError(`You are not logged in`));
    }
    const follower = await findUniqueUser({ where: { id: followerId } });

    if (!follower) {
      return next(
        new ValidationError(`Follower with the id "${followerId}" not found`)
      );
    }

    if (!user.followees.some((follow) => follow.followerId === follower.id)) {
      return next(
        new ValidationError(
          `You are already not following the user ${follower.username}`
        )
      );
    }

    const follow = await removeAFollow({
      followeeId: user.id,
      followerId,
    });

    if (!follow) {
      return next(
        new ValidationError('Something went wrong trying to follow an user')
      );
    }

    res.status(201).json({
      status: 'success',
      message: `You unfollow the user ${follower.username}`,
    });
  } catch (error) {
    if (error instanceof Error)
      return next(
        new InternalServerError(
          error?.message || 'Something went wrong trying to unfollow an user'
        )
      );
    return next(error);
  }
};
