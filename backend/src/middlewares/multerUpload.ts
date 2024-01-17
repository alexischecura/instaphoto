import { randomUUID } from 'crypto';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { ValidationError } from '../utils/AppError';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const multerStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    callback(null, `${__dirname}/../../public/img/users`);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    const ext = file.mimetype.split('/').at(1);
    const filename = `user-${randomUUID()}.${ext}`;
    req.body.profilePhoto = filename;
    callback(null, filename);
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new ValidationError('Wrong image type'));
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadProfilePhotoDisk = upload.single('profilePhoto');
