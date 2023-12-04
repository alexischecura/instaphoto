import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createManyUsers } from '../services/userService';
import { InternalServerError } from '../utils/AppError';
import { profile } from 'console';

export const getCurrentUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, username, email, profilePhoto } = res.locals.user;

  const user = {
    fullName,
    username,
    email,
    profilePhoto,
  };

  res.status(200).json({ user });
};

export const createManyUsersHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: Prisma.UserCreateManyInput[] = req.body.users;

    const usersToInsert = users.map((user) => {
      const hashedPassword = bcrypt.hashSync(user.password, 12);

      return { ...user, password: hashedPassword };
    });

    createManyUsers(usersToInsert);

    res.status(201).json({
      status: 'success',
      message: 'Users created successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return next(
      new InternalServerError('Something went wrong when creating the users')
    );
  }
};
