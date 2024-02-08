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
  const dir = `${__dirname}/../../public/img/users`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!req.file) return next();
  const { id, profilePhoto } = res.locals.user;
  const filename = `user-${id}-${randomUUID()}.jpeg`;
  req.body.profilePhoto = filename;

  sharp(req.file.buffer)
    .resize(450, 450)
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .toFile(`${dir}/${filename}`);

  if (profilePhoto !== 'user-default.jpg') {
    fs.unlink(`${dir}/${profilePhoto}`, (error) => {
      if (error) {
        console.log(error);
        next(
          new InternalServerError(
            'Something went wrong when deleting the previous profile photo'
          )
        );
      }
    });
  }

  next();
};
