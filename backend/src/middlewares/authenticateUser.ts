import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../utils/AppError';
import { verifyJwt } from '../utils/jwtUtils';
import { findUniqueUser } from '../services/userService';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ').at(1);
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token)
    return next(new AuthenticationError('Please, login to have access'));

  const decoded = verifyJwt<{
    id: string;
  }>(token);
  if (!decoded)
    return next(
      new AuthenticationError("Invalid token or user doesn't exist.")
    );
  const user = await findUniqueUser({ where: { id: decoded.id } });

  if (!user)
    return next(new AuthenticationError('Invalid token or session expired.'));

  res.locals.user = user;
  next();
};
