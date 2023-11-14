import { NextFunction, Request, Response, CookieOptions } from 'express';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { envVars } from '../configs/envConfig';
import {
  AuthenticationError,
  ConflictError,
  InternalServerError,
} from '../utils/AppError';
import Email from '../utils/Email';
import { CreateUserType } from '../schemas/userSchema';
import {
  createUser,
  findUser,
  findUserByEmailOrUsername,
  updateUser,
} from '../services/userService';
import { signJwt } from '../utils/jwtUtils';

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
    return next(
      new InternalServerError('Something went wrong when signing in')
    );
  }
};

export const verifyUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verificationCode = crypto
      .createHash('sha256')
      .update(req.params.code)
      .digest('hex');

    const user = await findUser({ verificationCode });

    if (!user) {
      return next(new AuthenticationError('Invalid verification code'));
    }

    await updateUser(
      {
        id: user.id,
      },
      { verified: true, verificationCode: null }
    );

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } catch (error) {
    return next(
      new InternalServerError('Something went wrong when verifying the email')
    );
  }
};

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1 - find a user with the provider email
    const user = await findUserByEmailOrUsername(req.body.userInput);

    // 2 - compare the password
    //   - If user doesn't exist or password doesn't match throw error
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return next(new AuthenticationError('Incorrect credentials'));
    }

    // 3 - Generate access token and refresh token
    //   - Set access token and refresh in cookies
    const token = signJwt(
      { id: user.id, email: user.email },
      { expiresIn: `${envVars.JWT_EXPIRES_IN}h` }
    );
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(
        Date.now() + envVars.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
      ),
    };
    res.cookie('token', token, cookieOptions);

    // 4 - Response user and token
    res.status(200).json({
      user: {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
      token,
    });
  } catch (error: any) {}
};
