import { NextFunction, Request, Response, CookieOptions } from 'express';
import { Prisma } from '@prisma/client';
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
import { CreateUserType } from '../schemas/userSchema';
import {
  createUser,
  findUniqueUser,
  findUser,
  findUserByEmailOrUsername,
  updateUser,
} from '../services/userService';
import { signJwt } from '../utils/jwtUtils';

export const createUserHandler = async (
  req: Request,
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

    const user = await findUniqueUser({ verificationCode });

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

    if (!user.verified) {
      return next(new AuthorizationError('Please verify your email'));
    }

    // 3 - Generate token
    //   - Set token in cookies
    const token = signJwt(
      { id: user.id },
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

    // 4 - Response json with user's info and token
    res.status(200).json({
      user: {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
      token,
    });
  } catch (error: any) {
    return next(
      new InternalServerError('Something went wrong when logging in')
    );
  }
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
    const user = await findUniqueUser({ email: req.body.email.toLowerCase() });

    if (!user) {
      return next(
        new NotFoundError('There is no user with that email address.')
      );
    }

    if (!user.verified) {
      return next(new AuthorizationError('Please verify your email.'));
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
      passwordResetToken,
      passwordResetExpires: {
        gt: new Date(),
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
