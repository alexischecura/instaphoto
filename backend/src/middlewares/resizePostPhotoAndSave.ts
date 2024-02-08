import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { ValidationError } from '../utils/AppError';

export const resizePostPhotoAndSave = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dir = `${__dirname}/../../public/img/posts`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!req.file)
    return next(new ValidationError('The post must have an image'));
  const filename = `post-${randomUUID()}.jpeg`;
  req.body.postPhoto = filename;

  sharp(req.file.buffer)
    .resize(936, 1170)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${dir}/${filename}`);

  next();
};
