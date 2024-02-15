import { NextFunction, Request, Response, CookieOptions } from 'express';
import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { envVars } from '../configs/envConfig';
import {
  AuthenticationError,
  AuthorizationError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from '../utils/AppError';
import Email from '../utils/Email';
import {
  createUser,
  findUniqueUser,
  findUser,
  findUserByEmailOrUsername,
  updateUser,
} from '../services/userService';
import { signJwt } from '../utils/jwtUtils';
import { CreateUserType } from '../schemas/userSchema';

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, username, email, password }: CreateUserType = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await createUser({
      fullName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    sendTokenResponse(newUser, res);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      // Code'P2002' is when there are a conflict in a unique field in prisma.
      error.code === 'P2002'
    ) {
      const field = error.meta?.target as string[];
      if (field) {
        return next(new ConflictError(`${field[0]} already exists`));
      }
      return next(
        new ConflictError(`There are some conflicts with some fields`)
      );
    }
    console.error(error);
    return next(
      new InternalServerError('Something went wrong when signing in')
    );
  }
};

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1 - find a user with the provided email or username
    const user = await findUserByEmailOrUsername(req.body.identifier);

    // 2 - compare the password

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return next(
        new AuthenticationError(
          'Sorry, your password was incorrect. Please double-check your password.'
        )
      );
    }
    sendTokenResponse(user, res);
  } catch (error: any) {
    return next(
      new InternalServerError('Something went wrong when logging in')
    );
  }
};

/**
 * Generates a JWT token saving the user ID, sets it in a cookie, and sends the response
 * with the user's information indicating that the user has successfully logged in.
 *
 * @param user The user object containing user information.
 * @param res The response object to send the HTTP response.
 */
const sendTokenResponse = (user: User, res: Response) => {
  // Generate token
  // Set token in cookies
  const token = signJwt(
    { id: user.id },
    { expiresIn: `${envVars.JWT_EXPIRES_IN}h` }
  );
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(
      Date.now() + envVars.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
  };
  res.cookie('token', token, cookieOptions);

  // Response json with user's info and token
  res.status(200).json({
    user: {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profilePhoto: user.profilePhoto,
      id: user.id,
    },
    token,
  });
};

export const logoutUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.cookie('token', '', { maxAge: -1 });

  res.status(200).json({
    status: 'success',
    message: 'User successfully logged out',
  });
};

// Send reset password link to user email
export const forgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUniqueUser({
      where: { email: req.body.email.toLowerCase() },
    });

    if (!user) {
      return next(
        new NotFoundError('There is no user with that email address.')
      );
    }

    if (user.provider) {
      return next(
        new AuthorizationError(
          `Please use your social account to login (${user.provider}).`
        )
      );
    }
    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    await updateUser(
      {
        id: user.id,
      },
      {
        passwordResetToken,
        passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000),
      }
    );
    try {
      const url = `${envVars.ORIGIN}/api/v1/users/resetPassword/${resetToken}`;

      await new Email(user, url).sendPasswordResetToken();

      res.status(200).json({
        status: 'success',
        message: 'You will receive an email to reset your password.',
      });
    } catch (error) {
      await updateUser(
        {
          id: user.id,
        },
        {
          passwordResetToken: null,
          passwordResetExpires: null,
        }
      );
      console.error(error);
      return next(
        new InternalServerError(
          'Something went wrong when sending the email to reset your password.'
        )
      );
    }
  } catch (error) {
    console.error(error);
    return next(
      new InternalServerError(
        'Something went wrong when handling the forgot password.'
      )
    );
  }
};

//Reset the password
export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await findUser({
      where: {
        passwordResetToken,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });
    if (!user)
      return next(new AuthorizationError('Token is invalid or has expired.'));

    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    await updateUser(
      { id: user.id },
      {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      }
    );

    res.status(202).json({
      status: 'success',
      message: 'Your password was successfully updated',
    });
  } catch (error) {
    console.error(error);
    return next(
      new InternalServerError(
        'Something went wrong when handling the reset password.'
      )
    );
  }
};
