import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  createManyUsers,
  findProfile,
  updateUser,
} from '../services/userService';
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
} from '../utils/AppError';

export const getCurrentUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, username, email, profilePhoto, id } = res.locals.user;

  const user = {
    fullName,
    username,
    email,
    profilePhoto,
    id,
  };

  res.status(200).json({ user });
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findProfile(req.params.username);
    if (!user) {
      return next(
        new NotFoundError(
          `User with the username ${req.params.username} not found`
        )
      );
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return next(
      new InternalServerError(
        'Something went wrong when trying the get the user'
      )
    );
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateUser({ id: res.locals.user.id }, req.body);
    return res.status(201).json({
      status: 'susccess',
      updatedFields: req.body,
    });
  } catch (error) {
    console.log(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      // Code'P2002' is when there are a conflict in a unique field in prisma.
      error.code === 'P2002'
    ) {
      return next(new ConflictError('Other user already have that username'));
    }
    return next(
      new InternalServerError('Something went wrong when updating the user')
    );
  }
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
