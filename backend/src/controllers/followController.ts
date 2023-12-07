import { NextFunction, Request, Response } from 'express';
import {
  findManyUsers,
  findUserWithFollowers,
  findUniqueUser,
} from '../services/userService';
import { createAFollow } from '../services/followService';
import { InternalServerError, ValidationError } from '../utils/AppError';

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
  const { followeeId, followerId } = req.body;

  try {
    const user = await findUserWithFollowers({
      where: { id: followeeId },
    });

    if (!user) {
      return next(
        new ValidationError(`Followee with the id "${followeeId}" not found`)
      );
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
          `The user ${user.username} is already following the user ${follower.username}`
        )
      );
    }

    const follow = createAFollow({
      followeeId,
      followerId,
    });

    if (!follow) {
      return next(new ValidationError('User not found'));
    }

    res.status(200).json({ follow });
  } catch (error) {
    return next({ error });
  }
};
