import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { envVars } from '../configs/envConfig';
import { ConflictError, InternalServerError } from '../utils/AppError';
import Email from '../utils/Email';
import { CreateUserType } from '../schemas/userSchema';
import { createUser } from '../services/userService';

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const verifyCode = crypto.randomBytes(32).toString('hex');
    const verificationCode = crypto
      .createHash('sha256')
      .update(verifyCode)
      .digest('hex');

    // Create new user in DB
    const newUser = await createUser({
      fullName,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      verificationCode,
    });

    const verificationUrl = `${envVars.ORIGIN}/verification/${verifyCode}`;
    try {
      await new Email(newUser, verificationUrl).sendVerificationCode();
    } catch (error) {
      return new InternalServerError(
        'There was an error sending the verification email. Please try again later.'
      );
    }

    res.status(201).json({
      status: 'success',
      message: 'A verification link has been sent to your email account',
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      // Code'P2002' is when there are a conflict in a unique field in prisma.
      error.code === 'P2002'
    ) {
      return next(new ConflictError('Email already exists'));
    }
    console.error(error);
    next(new InternalServerError('Something went wrong when signing in'));
  }
};
