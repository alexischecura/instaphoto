import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { InternalServerError } from '../utils/AppError';

export const resizeProfilePhotoAndSave = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();
  const { id, profilePhoto } = res.locals.user;
  const filename = `user-${id}-${randomUUID()}.jpeg`;
  req.body.profilePhoto = filename;

  sharp(req.file.buffer)
    .resize(450, 450)
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .toFile(`${__dirname}/../../public/img/users/${filename}`);

  if (profilePhoto !== 'user-default.jpg') {
    fs.unlink(
      `${__dirname}/../../public/img/users/${profilePhoto}`,
      (error) => {
        if (error) {
          console.log(error);
          next(
            new InternalServerError(
              'Something went wrong when deleting the previous profile photo'
            )
          );
        }
      }
    );
  }

  next();
};
