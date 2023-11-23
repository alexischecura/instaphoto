import { Request, Response, NextFunction } from 'express';

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
